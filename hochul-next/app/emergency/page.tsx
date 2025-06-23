'use client';

import { useRouter } from 'next/navigation';
import { Activity, Droplet, Flame, Wind, Bone, Sun, Phone } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import { EMERGENCY_TYPES, APP_CONFIG } from '../constants';

// 아이콘 매핑
const iconMap = {
  red: Activity,
  pink: Droplet,
  orange: Flame,
  blue: Wind,
  purple: Bone,
  yellow: Sun,
} as const;

// 색상 매핑
const colorMap = {
  red: 'bg-red-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500',
} as const;

interface EmergencyItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  route: string;
}

export default function EmergencyPage() {
  const router = useRouter();
  
  // 상수를 사용하여 응급상황 아이템 생성
  const emergencyItems: EmergencyItem[] = EMERGENCY_TYPES.map(item => {
    const IconComponent = iconMap[item.color as keyof typeof iconMap];
    return {
      ...item,
      icon: <IconComponent size={28} />,
      bgColor: colorMap[item.color as keyof typeof colorMap],
    };
  });

  const handleEmergencySelect = (route: string) => {
    router.push(route);
  };

  const handleEmergencyCall = () => {
    if (confirm(`${APP_CONFIG.EMERGENCY_PHONE}에 전화하시겠습니까?`)) {
      window.location.href = `tel:${APP_CONFIG.EMERGENCY_PHONE}`;
    }
  };

  return (
    <AppLayout title="응급처치 가이드">
      <ErrorBoundary>
        <div className="p-4">
        {/* 긴급 연락 버튼 */}
        <div className="mb-4">
          <button
            onClick={handleEmergencyCall}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Phone size={24} />
{APP_CONFIG.EMERGENCY_PHONE} 긴급전화
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
생명이 위급한 상황에서는 즉시 {APP_CONFIG.EMERGENCY_PHONE}에 신고하세요
          </p>
        </div>

        {/* 응급상황 카테고리 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {emergencyItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleEmergencySelect(item.route)}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center text-white mx-auto mb-3`}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-tight">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        {/* 안내 문구 */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Activity size={20} />
            응급처치 안내
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 침착하게 상황을 파악하세요</li>
            <li>• 환자의 의식과 호흡을 확인하세요</li>
            <li>• 필요시 즉시 119에 신고하세요</li>
            <li>• 지시에 따라 응급처치를 시행하세요</li>
          </ul>
        </div>
        </div>
      </ErrorBoundary>
    </AppLayout>
  );
}