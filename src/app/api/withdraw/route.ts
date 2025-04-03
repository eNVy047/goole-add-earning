import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

const MIN_WITHDRAWAL_AMOUNT = 10;

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { amount } = await req.json();

    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      return NextResponse.json(
        { error: `Minimum withdrawal amount is $${MIN_WITHDRAWAL_AMOUNT}` },
        { status: 400 }
      );
    }

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

    if (user.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create a transaction and update user balance
    const [transaction, updatedUser] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: user.id,
          amount: -amount, // Negative amount for withdrawals
          type: 'withdraw',
          status: 'completed',
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          balance: { decrement: amount },
        },
      }),
    ]);

    return NextResponse.json({
      transaction,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
} 