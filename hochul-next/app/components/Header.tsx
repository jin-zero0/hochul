'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showHelp?: boolean;
  onHelp?: () => void;
}

export default function Header({ title, showBack = true, showHelp = false, onHelp }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-4 h-[60px] flex items-center justify-between shadow-md">
      {showBack ? (
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="w-8" />
      )}
      
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
        {title}
      </h1>
      
      {showHelp ? (
        <button
          onClick={onHelp}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <HelpCircle size={20} />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </header>
  );
}