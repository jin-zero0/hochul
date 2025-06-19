'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Calendar, Heart, MapPin, Navigation } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { getUser } from '../utils/auth';
import Script from 'next/script';

// Kakao Maps 타입 정의
interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMap {
  setCenter(position: KakaoLatLng): void;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

export default function HomePage() {
  const router = useRouter();
  const [, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [, setMap] = useState<KakaoMap | null>(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const ads = [
    {
      icon: '🚨',
      iconBg: 'bg-red-500',
      title: '긴급 이송 서비스',
      description: '24시간 긴급 출동 가능',
      buttonText: '바로 호출',
      buttonBg: 'bg-red-500',
      action: () => router.push('/emergency')
    },
    {
      icon: '📅',
      iconBg: 'bg-blue-500',
      title: '예약 할인 이벤트',
      description: '사전 예약 시 20% 할인',
      buttonText: '예약하기',
      buttonBg: 'bg-blue-500',
      action: () => router.push('/reservation')
    },
    {
      icon: '💳',
      iconBg: 'bg-green-500',
      title: '첫 이용 혜택',
      description: '신규 가입 시 1만원 쿠폰',
      buttonText: '혜택받기',
      buttonBg: 'bg-green-500',
      action: () => alert('쿠폰이 발급되었습니다!')
    }
  ];

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // 광고 슬라이더 자동 전환
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const initializeMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options: KakaoMapOptions = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };
      
      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);
      
      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);
          
          mapInstance.setCenter(locPosition);
        });
      }
    }
  };

  const handleEmergencyCall = () => {
    if (confirm('긴급 호출하시겠습니까? 가장 가까운 구급차가 즉시 출동합니다.')) {
      router.push('/emergency');
    }
  };

  const handleReservation = () => {
    router.push('/reservation');
  };

  const handleNearbyHospital = () => {
    alert('주변 병원 검색 기능은 준비 중입니다.');
  };

  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  return (
    <>
      <Script
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ae9cce23e8367af0be888d1657d525e7&autoload=false"
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        }}
      />
      
      <AppLayout title="민간구급차 호출" showBack={false}>
        <div className="space-y-3 p-3">
          {/* 지도 영역 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-40 relative">
            <div id="map" className="w-full h-full" />
            <MapPin 
              size={32} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 drop-shadow-lg" 
            />
          </div>

          {/* 액션 버튼들 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
            <div className="flex gap-3">
              <button
                onClick={handleEmergencyCall}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-400 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Phone size={18} />
                긴급호출
              </button>
              
              <button
                onClick={handleReservation}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Calendar size={18} />
                예약하기
              </button>
              
              <button
                onClick={handleNearbyHospital}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-400 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Heart size={18} />
                주변병원
              </button>
            </div>
          </div>

          {/* 위치 검색 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  출
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="출발지를 입력하세요"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                  />
                  {startLocation && (
                    <button
                      onClick={() => setStartLocation('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={swapLocations}
                  className="w-9 h-9 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-red-400 transition-all transform hover:rotate-180"
                >
                  <Navigation size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  도
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    placeholder="도착지를 입력하세요"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                  />
                  {endLocation && (
                    <button
                      onClick={() => setEndLocation('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 광고 배너 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
            <div className="relative h-20 overflow-hidden">
              {ads.map((ad, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-500 ${
                    index === currentAdIndex
                      ? 'opacity-100 transform translate-x-0'
                      : index < currentAdIndex
                      ? 'opacity-0 transform -translate-x-full'
                      : 'opacity-0 transform translate-x-full'
                  }`}
                >
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center">
                    <div className={`w-12 h-12 ${ad.iconBg} rounded-xl flex items-center justify-center text-white text-xl mr-3`}>
                      {ad.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{ad.title}</h4>
                      <p className="text-sm text-gray-600">{ad.description}</p>
                    </div>
                    <button
                      onClick={ad.action}
                      className={`${ad.buttonBg} text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all`}
                    >
                      {ad.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 인디케이터 */}
            <div className="flex justify-center gap-1.5 mt-3">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentAdIndex
                      ? 'bg-red-500 w-4'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
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
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement | null, options: KakaoMapOptions) => KakaoMap;
      };
    };
  }
}