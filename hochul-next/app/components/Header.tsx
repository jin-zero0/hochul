'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showHelp?: boolean;
  onHelp?: () => void;
}

export default function Header({ title, showBack = true, showHelp = true, onHelp }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    } else {
      // 기본 도움말 동작
      alert('도움이 필요하신가요? 고객센터: 1588-0000');
    }
  };

  return (
    <header className="bg-gradient-to-r from-red-500 to-red-400 text-white px-4 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        <h1 className="flex-1 text-center text-lg font-semibold">
          {title}
        </h1>
        
        {showHelp && (
          <button
            onClick={handleHelp}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <HelpCircle size={18} />
          </button>
        )}
        
        {!showHelp && <div className="w-9" />}
      </div>
    </header>
  );
}