'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Wallet from './Wallet';

export default function Header({ balance }: { balance: number }) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Ad Revenue
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Wallet balance={balance} />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
} 