'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Clock, User, HeartHandshake } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

// 아이콘 매핑
const iconMap = {
  Home: Home,
  Calendar: Calendar,
  HeartHandshake: HeartHandshake,
  Clock: Clock,
  User: User,
} as const;

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// 상수를 사용하여 네비게이션 아이템 생성
const navItems: NavItem[] = NAV_ITEMS.map(item => {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
  return {
    href: item.href,
    icon: <IconComponent size={20} />,
    label: item.label,
  };
});

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
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
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