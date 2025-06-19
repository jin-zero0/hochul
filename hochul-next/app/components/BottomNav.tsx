'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Activity, User } from 'lucide-react';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: '/home',
    icon: <Home size={22} />,
    label: '홈'
  },
  {
    href: '/history',
    icon: <Clock size={22} />,
    label: '이용내역'
  },
  {
    href: '/emergency',
    icon: <Activity size={22} />,
    label: '응급처치'
  },
  {
    href: '/profile',
    icon: <User size={22} />,
    label: '프로필'
  }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 px-2">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href === '/emergency' && pathname.startsWith('/emergency/'));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-[60px] transition-all ${
                isActive
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}