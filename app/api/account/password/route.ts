import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, isStrongPassword, verifyPassword } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, currentPassword, newPassword } = body ?? {};

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!isStrongPassword(newPassword)) {
      return NextResponse.json(
        { error: 'Password does not meet strength requirements.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user || !verifyPassword(currentPassword, user.passwordHash)) {
      return NextResponse.json(
        { error: 'Current password is incorrect.' },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashPassword(newPassword) },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Account password error:', error);
    return NextResponse.json(
      { error: 'Failed to update password.' },
      { status: 500 }
    );
  }
}
