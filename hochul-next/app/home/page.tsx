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
        <div style={{ height: 'calc(100% - 60px - 80px)', overflowY: 'auto' }}>
          {/* 지도 영역 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            margin: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            height: '160px',
            position: 'relative'
          }}>
            <div id="map" className="w-full h-full" />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#ff3b30',
              fontSize: '32px',
              zIndex: 2,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}>
              <MapPin size={32} fill="currentColor" />
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '12px',
            margin: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <div className="flex gap-3">
              <button
                onClick={handleEmergencyCall}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #ff3b30, #ff6b5a)',
                  color: 'white',
                  padding: '16px 18px',
                  borderRadius: '15px',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                <Phone size={18} />
                긴급호출
              </button>
              
              <button
                onClick={handleReservation}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #007aff, #4da6ff)',
                  color: 'white',
                  padding: '16px 18px',
                  borderRadius: '15px',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                <Calendar size={18} />
                예약하기
              </button>
              
              <button
                onClick={handleNearbyHospital}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #34c759, #5ed75e)',
                  color: 'white',
                  padding: '16px 18px',
                  borderRadius: '15px',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                <Heart size={18} />
                주변병원
              </button>
            </div>
          </div>

          {/* 위치 검색 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '16px',
            margin: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <div className="space-y-3">
              {/* 출발지 입력 */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '14px'
              }}>
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  flexShrink: 0,
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
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
                    style={{
                      width: '100%',
                      padding: '14px 36px 14px 16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      color: '#333',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  />
                  {startLocation && (
                    <button
                      onClick={() => {
                        setStartLocation('');
                        setShowStartResults(false);
                      }}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        fontSize: '14px',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                  
                  {/* 검색 결과 */}
                  {showStartResults && searchResults.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      backgroundColor: '#fff',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                      zIndex: 20,
                      border: '1px solid #f0f0f0',
                      borderTop: 'none'
                    }}>
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => selectLocation(result, 'start')}
                          style={{
                            padding: '12px 15px',
                            borderBottom: '1px solid #f5f5f5',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div style={{
                            fontWeight: '600',
                            marginBottom: '3px',
                            color: '#333',
                            fontSize: '14px'
                          }}>{result.name}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>{result.address}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 위치 교환 버튼 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                margin: '10px 0',
                paddingLeft: '45px'
              }}>
                <div style={{
                  width: '2px',
                  height: '20px',
                  background: 'linear-gradient(to bottom, #4caf50, #f44336)',
                  marginRight: '15px'
                }}></div>
                <button
                  onClick={swapLocations}
                  style={{
                    backgroundColor: '#fff',
                    border: '2px solid #f0f0f0',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: '#666'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff3b30';
                    e.currentTarget.style.color = '#ff3b30';
                    e.currentTarget.style.transform = 'rotate(180deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.color = '#666';
                    e.currentTarget.style.transform = 'rotate(0deg)';
                  }}
                >
                  <Navigation size={16} />
                </button>
              </div>

              {/* 도착지 입력 */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: '#f44336',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  flexShrink: 0,
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
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
                    style={{
                      width: '100%',
                      padding: '14px 36px 14px 16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      color: '#333',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  />
                  {endLocation && (
                    <button
                      onClick={() => {
                        setEndLocation('');
                        setShowEndResults(false);
                      }}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        fontSize: '14px',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                  
                  {/* 검색 결과 */}
                  {showEndResults && searchResults.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      backgroundColor: '#fff',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                      zIndex: 20,
                      border: '1px solid #f0f0f0',
                      borderTop: 'none'
                    }}>
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => selectLocation(result, 'end')}
                          style={{
                            padding: '12px 15px',
                            borderBottom: '1px solid #f5f5f5',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div style={{
                            fontWeight: '600',
                            marginBottom: '3px',
                            color: '#333',
                            fontSize: '14px'
                          }}>{result.name}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>{result.address}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 광고 배너 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '12px',
            margin: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
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
                  <div style={{
                    background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #f0f0f0',
                    height: '70px'
                  }}>
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
                  style={{
                    width: index === currentAdIndex ? '16px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: index === currentAdIndex ? '#ff3b30' : '#ddd',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
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