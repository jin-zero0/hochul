'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck } from 'lucide-react';
import { isAuthenticated, getUserType } from './utils/auth';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      const userType = getUserType();

      setTimeout(() => {
        if (loggedIn && userType) {
          if (userType === 'customer') {
            router.push('/home');
          } else if (userType === 'driver') {
            router.push('/driver');
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      }, 2000);
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-5">
      <div className="text-center text-white">
        <div className="mb-5 animate-pulse">
          <Truck size={80} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-2">민간구급차 플랫폼</h1>
        <p className="text-white/80 mb-8">안전하고 빠른 응급의료 서비스</p>
        <div className="inline-block">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}