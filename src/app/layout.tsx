'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import PayPalProvider from '@/components/PayPalProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <PayPalProvider>
            {children}
          </PayPalProvider>
        </ClerkProvider>
      </body>
    </html>
  );
} 