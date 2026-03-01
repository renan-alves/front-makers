import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, isStrongPassword } from '@/lib/auth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { displayName, profession, email, state, country, newsletterOptIn, password } = body ?? {};

    if (!displayName || !email || !state || !country || !password) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: 'Password does not meet strength requirements.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: displayName,
        profession: profession || null,
        email,
        avatar: null,
        state,
        country,
        newsletterOptIn: Boolean(newsletterOptIn),
        passwordHash: hashPassword(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Auth register error:', error);
    return NextResponse.json(
      { error: 'Failed to create account.' },
      { status: 500 }
    );
  }
}
