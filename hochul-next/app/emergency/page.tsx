'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, MessageCircle, MapPin, AlertCircle, Shield } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Script from 'next/script';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  isEmergency?: boolean;
}

interface KakaoMaps {
  Map: any;
  LatLng: any;
  Marker: any;
  load: (callback: () => void) => void;
}

interface KakaoWindow extends Window {
  kakao: {
    maps: KakaoMaps;
  };
}

export default function EmergencyPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string>('emergency');
  const [currentLocation, setCurrentLocation] = useState({
    name: '현재 위치 확인 중...',
    address: '주소를 가져오는 중입니다...'
  });
  const [eta] = useState('5-10분');

  const serviceOptions: ServiceOption[] = [
    {
      id: 'emergency',
      name: '긴급 이송',
      description: '응급 상황 발생 시 즉시 출동',
      price: '기본요금 + 거리요금',
      icon: <AlertCircle size={24} />,
      isEmergency: true
    },
    {
      id: 'general',
      name: '일반 이송',
      description: '병원 이송, 퇴원 등',
      price: '50,000원~',
      icon: <Shield size={24} />
    },
    {
      id: 'long-distance',
      name: '장거리 이송',
      description: '시외 병원 이송',
      price: '협의',
      icon: <MapPin size={24} />
    }
  ];

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // 실제로는 역지오코딩 API를 사용해야 함
          setCurrentLocation({
            name: '서울특별시 강남구 테헤란로',
            address: '서울특별시 강남구 테헤란로 123'
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  const initializeMap = () => {
    const kakaoWindow = window as unknown as KakaoWindow;
    if (kakaoWindow.kakao && kakaoWindow.kakao.maps) {
      const container = document.getElementById('emergency-map');
      const options = {
        center: new kakaoWindow.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };
      
      const mapInstance = new kakaoWindow.kakao.maps.Map(container, options);
      
      // 현재 위치로 지도 중심 이동
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new kakaoWindow.kakao.maps.LatLng(lat, lng);
          
          mapInstance.setCenter(locPosition);
          
          // 현재 위치 마커
          new kakaoWindow.kakao.maps.Marker({
            position: locPosition,
            map: mapInstance
          });
        });
      }
    }
  };

  const handleEmergencyCall = () => {
    if (confirm('민간구급차를 호출하시겠습니까?\n예상 도착시간: ' + eta)) {
      alert('구급차가 출동했습니다. 곧 연락드리겠습니다.');
      // 실제로는 서버에 요청을 보내야 함
    }
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:1577-1234'; // 민간구급차 대표번호
  };

  const handleKakaoChat = () => {
    alert('카카오톡 상담 기능은 준비 중입니다.');
  };

  return (
    <>
      <Script
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ae9cce23e8367af0be888d1657d525e7&autoload=false"
        strategy="afterInteractive"
        onLoad={() => {
          const kakaoWindow = window as unknown as KakaoWindow;
          kakaoWindow.kakao.maps.load(() => {
            initializeMap();
          });
        }}
      />
      
      <AppLayout title="응급 호출" showBack={true}>
        {/* 상단 정보 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <MapPin size={16} />
            <span className="font-medium">{currentLocation.name}</span>
            <span className="text-gray-500">→</span>
            <span className="font-medium">가까운 병원</span>
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold ml-2">
              {eta}
            </span>
          </div>
        </div>

        {/* 지도 영역 */}
        <div className="relative h-64 bg-gray-100">
          <div id="emergency-map" className="w-full h-full" />
          
          {/* 상태 오버레이 */}
          <div className="absolute top-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse">
                <AlertCircle size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">구급차 호출 대기중</h3>
                <p className="text-sm text-gray-600">서비스를 선택하고 호출해주세요</p>
              </div>
            </div>
            
            {/* 간단한 경로 표시 */}
            <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-red-500"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600 ml-2">약 2.5km</span>
            </div>
          </div>
        </div>

        {/* 하단 패널 */}
        <div className="bg-white rounded-t-3xl shadow-lg -mt-6 relative">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-5"></div>
          
          {/* 서비스 옵션 */}
          <div className="px-4 pb-4">
            <h3 className="font-bold text-lg mb-4">서비스 선택</h3>
            
            <div className="space-y-3">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                    selectedService === service.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    service.isEmergency ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-800">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${service.isEmergency ? 'text-red-500' : 'text-gray-800'}`}>
                      {service.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* 법령 안내 */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-700 font-semibold mb-2">
                <AlertCircle size={18} />
                <span>이용 안내</span>
              </div>
              <div className="text-sm text-amber-800 space-y-1">
                <p>• 민간구급차는 응급환자 이송 전문 서비스입니다</p>
                <p>• 전문 응급구조사가 탑승하여 안전한 이송을 도와드립니다</p>
                <p>• 119 구급차가 필요한 응급상황은 119로 신고해주세요</p>
              </div>
            </div>

            {/* 현재 위치 정보 */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin size={18} />
                픽업 위치
              </h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                    <MapPin size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{currentLocation.name}</p>
                    <p className="text-sm text-gray-600">{currentLocation.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 호출 버튼들 */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleEmergencyCall}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Phone size={24} />
                민간구급차 호출하기
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePhoneCall}
                  className="py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  전화 상담
                </button>
                <button
                  onClick={handleKakaoChat}
                  className="py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  카톡 상담
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

// Window 타입 확장
declare global {
  interface Window {
    kakao: any;
  }
}