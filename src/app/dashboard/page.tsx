'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Header from '@/components/Header';

// Mock ad data - in a real app, this would come from an API
const mockAds = [
  {
    id: 1,
    title: 'Product Demo',
    duration: 30,
    reward: 0.10,
    videoUrl: 'https://example.com/video1.mp4',
  },
  {
    id: 2,
    title: 'Brand Promotion',
    duration: 45,
    reward: 0.15,
    videoUrl: 'https://example.com/video2.mp4',
  },
  // Add more mock ads as needed
];

export default function Dashboard() {
  const { user } = useUser();
  const [balance, setBalance] = useState(0);
  const [currentAd, setCurrentAd] = useState<typeof mockAds[0] | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // In a real app, fetch user's balance from your backend
    setBalance(5.00); // Mock balance
  }, []);

  const startWatching = (ad: typeof mockAds[0]) => {
    setCurrentAd(ad);
    setIsWatching(true);
    setTimeLeft(ad.duration);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWatching && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isWatching) {
      // Ad completed
      setBalance((prev) => prev + (currentAd?.reward || 0));
      setIsWatching(false);
      setCurrentAd(null);
    }
    return () => clearInterval(timer);
  }, [isWatching, timeLeft, currentAd]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header balance={balance} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isWatching ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Watching: {currentAd?.title}</h2>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(timeLeft / (currentAd?.duration || 1)) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2">Time left: {timeLeft} seconds</p>
            </div>
            <p className="text-lg">
              You'll earn ${currentAd?.reward.toFixed(2)} when this ad completes
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Duration: {ad.duration} seconds
                </p>
                <p className="text-green-500 font-semibold mb-4">
                  Reward: ${ad.reward.toFixed(2)}
                </p>
                <button
                  onClick={() => startWatching(ad)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                >
                  Watch Ad
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 