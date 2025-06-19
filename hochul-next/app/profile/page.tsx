'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { getUser, logout } from '../utils/auth';
import type { User as UserType } from '../types';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action: () => void;
  color: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      router.push('/login');
    }
  };

  const menuItems: MenuItem[] = [
    {
      icon: <User size={20} />,
      title: '개인정보 수정',
      description: '이름, 연락처 등 수정',
      action: () => alert('개인정보 수정 기능은 준비 중입니다.'),
      color: 'text-blue-500'
    },
    {
      icon: <CreditCard size={20} />,
      title: '결제 수단 관리',
      description: '카드, 계좌 등록',
      action: () => alert('결제 수단 관리 기능은 준비 중입니다.'),
      color: 'text-green-500'
    },
    {
      icon: <Bell size={20} />,
      title: '알림 설정',
      description: '푸시, 문자 알림',
      action: () => alert('알림 설정 기능은 준비 중입니다.'),
      color: 'text-yellow-500'
    },
    {
      icon: <Shield size={20} />,
      title: '개인정보 처리방침',
      action: () => alert('개인정보 처리방침 페이지로 이동합니다.'),
      color: 'text-purple-500'
    },
    {
      icon: <HelpCircle size={20} />,
      title: '고객센터',
      description: '1588-0000',
      action: () => window.location.href = 'tel:15880000',
      color: 'text-orange-500'
    },
    {
      icon: <LogOut size={20} />,
      title: '로그아웃',
      action: handleLogout,
      color: 'text-red-500'
    }
  ];

  if (!user) {
    return (
      <AppLayout title="프로필">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="프로필">
      <div className="p-4">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name || '사용자'}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Phone size={14} />
                {user.phone || '전화번호 없음'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} />
                {user.email || '이메일 없음'}
              </div>
            </div>
          </div>
          
          {/* 회원 유형 배지 */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              user.type === 'customer' 
                ? 'bg-blue-100 text-blue-800'
                : user.type === 'driver'
                ? 'bg-green-100 text-green-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              {user.type === 'customer' ? '일반 회원' : user.type === 'driver' ? '기사 회원' : '관리자'}
            </span>
            <span className="text-xs text-gray-500">
              가입일: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 이용 통계 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-red-500">0</div>
            <div className="text-xs text-gray-600 mt-1">이용 횟수</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-500">0</div>
            <div className="text-xs text-gray-600 mt-1">예약 건수</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-green-500">0</div>
            <div className="text-xs text-gray-600 mt-1">쿠폰/포인트</div>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`${item.color}`}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500">{item.description}</div>
                  )}
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* 버전 정보 */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>호출 v1.0.0</p>
          <p>© 2024 민간구급차 플랫폼</p>
        </div>
      </div>
    </AppLayout>
  );
}