import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        profession: true,
        email: true,
        passwordHash: true,
        avatar: true,
        state: true,
        country: true,
        newsletterOptIn: true,
      },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          profession: user.profession,
          email: user.email,
          avatar: user.avatar,
          state: user.state,
          country: user.country,
          newsletterOptIn: user.newsletterOptIn,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth login error:', error);
    return NextResponse.json(
      { error: 'Failed to sign in.' },
      { status: 500 }
    );
  }
}
