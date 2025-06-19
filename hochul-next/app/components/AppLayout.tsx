'use client';

import BottomNav from './BottomNav';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  showHeader?: boolean;
  showBack?: boolean;
  showHelp?: boolean;
  showBottomNav?: boolean;
  onHelp?: () => void;
}

export default function AppLayout({
  children,
  title,
  showHeader = true,
  showBack = true,
  showHelp = true,
  showBottomNav = true,
  onHelp
}: AppLayoutProps) {
  return (
    <div className="app-container relative flex flex-col">
      {showHeader && (
        <Header
          title={title}
          showBack={showBack}
          showHelp={showHelp}
          onHelp={onHelp}
        />
      )}
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-20">
        {children}
      </div>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
}