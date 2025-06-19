'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Clock, User, HeartHandshake, Bot } from 'lucide-react';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: '/home',
    icon: <Home size={20} />,
    label: '홈'
  },
  {
    href: '/reservation',
    icon: <Calendar size={20} />,
    label: '예약'
  },
  {
    href: '/emergency',
    icon: <HeartHandshake size={20} />,
    label: '응급'
  },
  {
    href: '/history',
    icon: <Clock size={20} />,
    label: '이력'
  },
  {
    href: '/ai',
    icon: <Bot size={20} />,
    label: 'AI'
  },
  {
    href: '/profile',
    icon: <User size={20} />,
    label: '프로필'
  }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-safe">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${
                isActive
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700'
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