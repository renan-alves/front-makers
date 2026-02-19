import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    const { title, content, authorName, authorEmail } = body;
    
    if (!title || !content || !authorName || !authorEmail) {
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

    // Create submission
    const submission = await prisma.articleSubmission.create({
      data: {
        title,
        content,
        authorName,
        authorEmail,
        category: body.category || null,
        tags: body.tags || [],
        locale: body.locale || 'en',
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Article submitted successfully! We will review it shortly.',
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
    const status = searchParams.get('status') as 'PENDING' | 'APPROVED' | 'REJECTED' | null;

    const submissions = await prisma.articleSubmission.findMany({
      where: status ? { status } : undefined,
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
