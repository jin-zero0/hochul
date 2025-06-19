'use client';

import Header from './Header';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
}

export default function AppLayout({ children, title, showBack = true }: AppLayoutProps) {
  return (
    <div className="app-container">
      <Header title={title} showBack={showBack} />
      <main className="relative h-[calc(100%-60px-80px)] overflow-y-auto bg-gray-50">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}