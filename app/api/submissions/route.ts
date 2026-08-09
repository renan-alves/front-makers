import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function buildSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'article';
}

async function buildUniqueSlug(title: string) {
  const baseSlug = buildSlug(title);
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

async function ensureAuthor(authorName: string, authorEmail: string) {
  let author = await prisma.user.findUnique({
    where: { email: authorEmail },
  });

  if (!author) {
    author = await prisma.user.create({
      data: {
        name: authorName,
        email: authorEmail,
        passwordHash: hashPassword('frontmakers-temp-password'),
        state: 'Unknown',
        country: 'Unknown',
      },
    });
  }

  return author;
}

async function createSubmissionArticle(input: {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  category: string | null;
  tags: string[];
  locale: string;
}) {
  const slug = await buildUniqueSlug(input.title);
  const author = await ensureAuthor(input.authorName, input.authorEmail);

  const excerpt = input.content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);

  const readTime = Math.max(3, Math.ceil(input.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200));

  return prisma.article.create({
    data: {
      title: input.title,
      slug,
      content: input.content,
      excerpt: excerpt || 'Article submitted by the community.',
      category: input.category || 'General',
      readTime,
      tags: input.tags || [],
      authorId: author.id,
      authorName: input.authorName,
      authorEmail: input.authorEmail,
      locale: input.locale || 'en',
      status: 'PENDENT',
      publishedAt: null,
    },
  });
}

async function updateSubmissionArticle(articleId: string, status: 'PENDENT' | 'APPROVED' | 'REJECTED', notes?: string) {
  const updateData: {
    status: 'PENDENT' | 'APPROVED' | 'REJECTED';
    notes?: string | null;
    reviewedAt: Date;
    publishedAt?: Date | null;
  } = {
    status,
    notes: notes ?? null,
    reviewedAt: new Date(),
  };

  if (status === 'APPROVED') {
    updateData.publishedAt = new Date();
  } else {
    updateData.publishedAt = null;
  }

  return prisma.article.update({
    where: { id: articleId },
    data: updateData,
  });
}

/**
 * POST /api/submissions
 * 
 * Submit a new article for review
 * 
 * Body:
 * - title: string (required)
 * - content: string (required)
 * - authorName: string (required)
 * - authorEmail: string (required)
 * - category: string (optional)
 * - tags: string[] (optional)
 * - locale: string (optional, default: 'en')
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, content, authorName, authorEmail, category } = body;
    
    if (!title || !content || !authorName || !authorEmail || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, authorName, authorEmail' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate content length (at least 100 characters)
    if (content.length < 100) {
      return NextResponse.json(
        { error: 'Content must be at least 100 characters long' },
        { status: 400 }
      );
    }

    const submission = await createSubmissionArticle({
      title,
      content,
      authorName,
      authorEmail,
      category: body.category || null,
      tags: body.tags || [],
      locale: body.locale || 'en',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Article submitted successfully! We will review it shortly.',
        articleId: submission.id,
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit article. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/submissions
 * 
 * Get all submissions (for admin/review purposes)
 * This will need authentication in the future
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'PENDENT' | 'APPROVED' | 'REJECTED' | null;

    const submissions = await prisma.article.findMany({
      where: status
        ? { status }
        : { status: { in: ['PENDENT', 'APPROVED', 'REJECTED'] } },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { submissionId, status, notes } = body as {
      submissionId?: string;
      status?: 'PENDENT' | 'APPROVED' | 'REJECTED';
      notes?: string;
    };

    if (!submissionId || !status) {
      return NextResponse.json({ error: 'Missing submissionId or status' }, { status: 400 });
    }

    const updatedSubmission = await updateSubmissionArticle(submissionId, status, notes);

    return NextResponse.json(updatedSubmission, { status: 200 });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
