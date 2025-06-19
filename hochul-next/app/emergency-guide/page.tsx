'use client';

import { useRouter } from 'next/navigation';
import { Activity, Droplet, Flame, Wind, Bone, Sun, Phone } from 'lucide-react';
import AppLayout from '../components/AppLayout';

interface EmergencyItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  route: string;
}

export default function EmergencyGuidePage() {
  const router = useRouter();
  
  const emergencyItems: EmergencyItem[] = [
    {
      id: 'cpr',
      title: '심폐소생술 (CPR)',
      description: '의식이 없고 호흡이 없을 때',
      icon: <Activity size={28} />,
      bgColor: 'bg-red-500',
      route: '/emergency/cpr'
    },
    {
      id: 'bleeding',
      title: '출혈/지혈',
      description: '심한 출혈이 발생했을 때',
      icon: <Droplet size={28} />,
      bgColor: 'bg-pink-500',
      route: '/emergency/bleeding'
    },
    {
      id: 'burn',
      title: '화상',
      description: '화상을 입었을 때',
      icon: <Flame size={28} />,
      bgColor: 'bg-orange-500',
      route: '/emergency/burn'
    },
    {
      id: 'choking',
      title: '기도 폐쇄',
      description: '음식물 등으로 숨을 못 쉴 때',
      icon: <Wind size={28} />,
      bgColor: 'bg-blue-500',
      route: '/emergency/choking'
    },
    {
      id: 'fracture',
      title: '골절',
      description: '뼈가 부러졌을 때',
      icon: <Bone size={28} />,
      bgColor: 'bg-purple-500',
      route: '/emergency/fracture'
    },
    {
      id: 'heat',
      title: '온열질환',
      description: '열사병, 일사병 등',
      icon: <Sun size={28} />,
      bgColor: 'bg-yellow-500',
      route: '/emergency/heat'
    }
  ];

  const handleEmergencySelect = (route: string) => {
    router.push(route);
  };

  const handleEmergencyCall = () => {
    if (confirm('119에 전화하시겠습니까?')) {
      window.location.href = 'tel:119';
    }
  };

  return (
    <AppLayout title="응급처치 가이드">
      <div className="p-4">
        {/* 긴급 연락 버튼 */}
        <div className="mb-4">
          <button
            onClick={handleEmergencyCall}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Phone size={24} />
            119 긴급전화
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
            생명이 위급한 상황에서는 즉시 119에 신고하세요
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
    </AppLayout>
  );
}