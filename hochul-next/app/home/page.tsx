'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Calendar, Heart, MapPin, Navigation, X } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { getUser } from '../utils/auth';
import Script from 'next/script';

interface User {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
}

interface SearchResult {
  name: string;
  address: string;
}

interface KakaoMaps {
  Map: any;
  LatLng: any;
  load: (callback: () => void) => void;
}

interface KakaoWindow extends Window {
  kakao: {
    maps: KakaoMaps;
  };
}

export default function HomePage() {
  const router = useRouter();
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showStartResults, setShowStartResults] = useState(false);
  const [showEndResults, setShowEndResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const ads = [
    {
      icon: '🚨',
      iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
      title: '긴급 이송 서비스',
      description: '24시간 긴급 출동 가능',
      buttonText: '바로 호출',
      buttonBg: 'bg-gradient-to-r from-red-500 to-red-600',
      action: () => router.push('/emergency')
    },
    {
      icon: '📅',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      title: '예약 할인 이벤트',
      description: '사전 예약 시 20% 할인',
      buttonText: '예약하기',
      buttonBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => router.push('/reservation')
    },
    {
      icon: '💳',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      title: '첫 이용 혜택',
      description: '신규 가입 시 1만원 쿠폰',
      buttonText: '혜택받기',
      buttonBg: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => alert('쿠폰이 발급되었습니다!')
    }
  ];

  // 예시 검색 결과 데이터
  const mockSearchResults: SearchResult[] = [
    { name: '서울역', address: '서울특별시 중구 한강대로 405' },
    { name: '강남역', address: '서울특별시 강남구 강남대로 396' },
    { name: '서울대학교병원', address: '서울특별시 종로구 대학로 101' },
    { name: '삼성서울병원', address: '서울특별시 강남구 일원로 81' },
  ];

  useEffect(() => {
    const userData = getUser() as User | null;
    if (!userData) {
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
    const kakaoWindow = window as unknown as KakaoWindow;
    if (kakaoWindow.kakao && kakaoWindow.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new kakaoWindow.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };
      
      const mapInstance = new kakaoWindow.kakao.maps.Map(container, options);
      
      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new kakaoWindow.kakao.maps.LatLng(lat, lng);
          
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

  const handleStartLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartLocation(value);
    if (value) {
      setShowStartResults(true);
      setSearchResults(mockSearchResults.filter(item => 
        item.name.includes(value) || item.address.includes(value)
      ));
    } else {
      setShowStartResults(false);
    }
  };

  const handleEndLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndLocation(value);
    if (value) {
      setShowEndResults(true);
      setSearchResults(mockSearchResults.filter(item => 
        item.name.includes(value) || item.address.includes(value)
      ));
    } else {
      setShowEndResults(false);
    }
  };

  const selectLocation = (location: SearchResult, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartLocation(location.name);
      setShowStartResults(false);
    } else {
      setEndLocation(location.name);
      setShowEndResults(false);
    }
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
      
      <AppLayout title="민간구급차 호출" showBack={false}>
        <div className="space-y-3 p-3">
          {/* 지도 영역 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-40 relative">
            <div id="map" className="w-full h-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin 
                size={32} 
                className="text-red-500 drop-shadow-lg" 
                fill="currentColor"
              />
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3">
            <div className="flex gap-3">
              <button
                onClick={handleEmergencyCall}
                className="flex-1 bg-gradient-to-br from-red-500 via-red-500 to-red-600 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Phone size={18} />
                긴급호출
              </button>
              
              <button
                onClick={handleReservation}
                className="flex-1 bg-gradient-to-br from-blue-500 via-blue-500 to-blue-600 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Calendar size={18} />
                예약하기
              </button>
              
              <button
                onClick={handleNearbyHospital}
                className="flex-1 bg-gradient-to-br from-green-500 via-green-500 to-green-600 text-white py-4 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Heart size={18} />
                주변병원
              </button>
            </div>
          </div>

          {/* 위치 검색 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
            <div className="space-y-3">
              {/* 출발지 입력 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  출
                </div>
                <div className="flex-1 relative">
                  <input
                    ref={startInputRef}
                    type="text"
                    value={startLocation}
                    onChange={handleStartLocationChange}
                    onFocus={() => startLocation && setShowStartResults(true)}
                    onBlur={() => setTimeout(() => setShowStartResults(false), 200)}
                    placeholder="출발지를 입력하세요"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-50 transition-all font-medium"
                  />
                  {startLocation && (
                    <button
                      onClick={() => {
                        setStartLocation('');
                        setShowStartResults(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                  
                  {/* 검색 결과 */}
                  {showStartResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 max-h-48 overflow-y-auto z-10">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => selectLocation(result, 'start')}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                        >
                          <div className="font-semibold text-gray-800 text-sm">{result.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{result.address}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 위치 교환 버튼 */}
              <div className="flex items-center justify-center relative">
                <div className="absolute left-[18px] w-0.5 h-5 bg-gradient-to-b from-green-500 to-red-500"></div>
                <button
                  onClick={swapLocations}
                  className="w-9 h-9 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all duration-300 transform hover:rotate-180"
                >
                  <Navigation size={16} className="text-gray-600" />
                </button>
              </div>

              {/* 도착지 입력 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  도
                </div>
                <div className="flex-1 relative">
                  <input
                    ref={endInputRef}
                    type="text"
                    value={endLocation}
                    onChange={handleEndLocationChange}
                    onFocus={() => endLocation && setShowEndResults(true)}
                    onBlur={() => setTimeout(() => setShowEndResults(false), 200)}
                    placeholder="도착지를 입력하세요"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-50 transition-all font-medium"
                  />
                  {endLocation && (
                    <button
                      onClick={() => {
                        setEndLocation('');
                        setShowEndResults(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                  
                  {/* 검색 결과 */}
                  {showEndResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 max-h-48 overflow-y-auto z-10">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => selectLocation(result, 'end')}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                        >
                          <div className="font-semibold text-gray-800 text-sm">{result.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{result.address}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 광고 배너 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3">
            <div className="relative h-[70px] overflow-hidden">
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
                  <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl p-3 flex items-center h-[70px]">
                    <div className={`w-10 h-10 ${ad.iconBg} rounded-xl flex items-center justify-center text-white text-lg mr-3 shrink-0`}>
                      {ad.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-[15px]">{ad.title}</h4>
                      <p className="text-xs text-gray-600">{ad.description}</p>
                    </div>
                    <button
                      onClick={ad.action}
                      className={`${ad.buttonBg} text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:shadow-lg transition-all whitespace-nowrap`}
                    >
                      {ad.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 인디케이터 */}
            <div className="flex justify-center gap-1.5 mt-2.5">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentAdIndex
                      ? 'bg-red-500 w-4'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
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
    kakao: any;
  }
}