import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { adId, amount } = await req.json();

    // Find the user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create a transaction and update user balance
    const [transaction, updatedUser] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: user.id,
          amount,
          type: 'earn',
          status: 'completed',
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          balance: { increment: amount },
          totalEarnings: { increment: amount },
        },
      }),
    ]);

    return NextResponse.json({
      transaction,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error processing earnings:', error);
    return NextResponse.json(
      { error: 'Failed to process earnings' },
      { status: 500 }
    );
  }
} 