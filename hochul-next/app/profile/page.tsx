'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Bell, CreditCard, Heart, Hospital, HelpCircle, Phone as PhoneIcon, FileText, Shield, Info, ChevronRight, Edit2 } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { getUser, logout } from '../utils/auth';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  type?: 'customer' | 'driver' | 'admin';
}

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  value?: string;
  iconColor: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  action?: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      logout();
      router.push('/login');
    }
  };

  const menuSections: MenuSection[] = [
    {
      title: '계정 설정',
      items: [
        {
          icon: <User size={16} />,
          title: '개인정보 관리',
          iconColor: 'bg-blue-100 text-blue-600',
          action: () => alert('개인정보 관리 페이지로 이동합니다.')
        },
        {
          icon: <Bell size={16} />,
          title: '알림 설정',
          iconColor: 'bg-green-100 text-green-600',
          hasToggle: true,
          toggleValue: notificationEnabled
        },
        {
          icon: <CreditCard size={16} />,
          title: '결제 수단 관리',
          iconColor: 'bg-purple-100 text-purple-600',
          action: () => alert('결제 수단 관리 페이지로 이동합니다.')
        }
      ]
    },
    {
      title: '의료 정보',
      items: [
        {
          icon: <Heart size={16} />,
          title: '기본 의료 정보',
          iconColor: 'bg-red-100 text-red-600',
          action: () => alert('기본 의료 정보 페이지로 이동합니다.')
        },
        {
          icon: <Hospital size={16} />,
          title: '자주 가는 병원',
          value: '2개 등록됨',
          iconColor: 'bg-orange-100 text-orange-600',
          action: () => alert('자주 가는 병원 페이지로 이동합니다.')
        }
      ]
    },
    {
      title: '고객지원',
      items: [
        {
          icon: <HelpCircle size={16} />,
          title: '자주 묻는 질문',
          iconColor: 'bg-blue-100 text-blue-600',
          action: () => alert('자주 묻는 질문 페이지로 이동합니다.')
        },
        {
          icon: <PhoneIcon size={16} />,
          title: '고객센터',
          value: '1588-1234',
          iconColor: 'bg-blue-100 text-blue-600',
          action: () => window.location.href = 'tel:15881234'
        },
        {
          icon: <FileText size={16} />,
          title: '이용약관',
          iconColor: 'bg-blue-100 text-blue-600',
          action: () => alert('이용약관 페이지로 이동합니다.')
        },
        {
          icon: <Shield size={16} />,
          title: '개인정보 처리방침',
          iconColor: 'bg-blue-100 text-blue-600',
          action: () => alert('개인정보 처리방침 페이지로 이동합니다.')
        }
      ]
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
      <div className="bg-gray-50 min-h-screen">
        {/* 프로필 섹션 */}
        <div className="bg-white p-5 mb-4">
          <div className="flex items-center">
            <div className="w-[70px] h-[70px] bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <User size={36} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{user.name || '홍길동'}</h2>
              <p className="text-sm text-gray-500">{user.phone || '010-1234-5678'}</p>
            </div>
            <button
              onClick={() => alert('프로필 수정 페이지로 이동합니다.')}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              <Edit2 size={14} />
              수정
            </button>
          </div>
        </div>

        {/* 메뉴 섹션들 */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white mb-4">
            <h3 className="px-5 pt-4 pb-3 text-sm font-medium text-gray-700">{section.title}</h3>
            <div>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={item.action}
                  className={`flex items-center px-5 py-4 ${
                    itemIndex < section.items.length - 1 ? 'border-b border-gray-100' : ''
                  } ${item.action ? 'cursor-pointer active:bg-gray-50' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-gray-800">{item.title}</span>
                    {item.hasToggle ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationEnabled}
                          onChange={(e) => {
                            e.stopPropagation();
                            setNotificationEnabled(!notificationEnabled);
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    ) : item.value ? (
                      <span className="text-sm text-gray-500">{item.value}</span>
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 앱 정보 */}
        <div className="bg-white mb-4">
          <div className="flex items-center px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <Info size={16} />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-gray-800">앱 버전</span>
              <span className="text-sm text-gray-500">1.0.0</span>
            </div>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="bg-white">
          <button
            onClick={handleLogout}
            className="w-full py-4 text-red-500 font-medium text-center"
          >
            로그아웃
          </button>
        </div>
      </div>
    </AppLayout>
  );
}