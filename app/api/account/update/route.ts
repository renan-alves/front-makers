import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      displayName,
      profession,
      email,
      state,
      country,
      newsletterOptIn,
      avatarDataUrl,
    } = body ?? {};

    if (!userId || !displayName || !email || !state || !country) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: displayName,
        profession: profession || null,
        email,
        state,
        country,
        newsletterOptIn: Boolean(newsletterOptIn),
        avatar: avatarDataUrl || null,
      },
      select: {
        id: true,
        name: true,
        profession: true,
        email: true,
        avatar: true,
        state: true,
        country: true,
        newsletterOptIn: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Account update error:', error);
    return NextResponse.json(
      { error: 'Failed to update account.' },
      { status: 500 }
    );
  }
}
