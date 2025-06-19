'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Settings, User } from 'lucide-react';
import { login } from '../utils/auth';
import Script from 'next/script';

type AppType = 'customer' | 'driver' | 'admin' | null;

interface KakaoAuthResponse {
  access_token: string;
}

interface KakaoUserResponse {
  id: number;
  properties?: {
    nickname?: string;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [selectedApp, setSelectedApp] = useState<AppType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAppSelect = (appType: AppType) => {
    setSelectedApp(appType);
    
    // 관리자는 바로 로그인 처리
    if (appType === 'admin') {
      handleAdminLogin();
    }
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    
    const adminInfo = {
      id: 'admin_001',
      name: '관리자',
      phone: '010-0000-0000',
      type: 'admin' as const
    };
    
    login(adminInfo);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('관리자님, 환영합니다!');
      router.push('/admin');
    }, 1000);
  };

  const handleKakaoLogin = () => {
    if (!selectedApp || selectedApp === 'admin') {
      alert('먼저 서비스를 선택해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    // 카카오 SDK가 로드되었는지 확인
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('ae9cce23e8367af0be888d1657d525e7');
    }
    
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.login({
        success: function(authObj: KakaoAuthResponse) {
          console.log('카카오 로그인 성공:', authObj);
          
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res: KakaoUserResponse) {
              console.log('사용자 정보:', res);
              
              const userInfo = {
                id: String(res.id),
                name: res.properties?.nickname || '사용자',
                phone: '010-0000-0000', // 실제로는 추가 정보 입력 필요
                type: selectedApp as 'customer' | 'driver'
              };
              
              login(userInfo, authObj.access_token);
              
              setTimeout(() => {
                setIsLoading(false);
                alert(`${userInfo.name}님, 환영합니다!`);
                
                if (selectedApp === 'customer') {
                  router.push('/home');
                } else if (selectedApp === 'driver') {
                  router.push('/driver');
                }
              }, 1000);
            },
            fail: function(error: Error) {
              console.error('사용자 정보 가져오기 실패:', error);
              setIsLoading(false);
              alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
          });
        },
        fail: function(err: Error) {
          console.error('카카오 로그인 실패:', err);
          setIsLoading(false);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      });
    } else {
      setIsLoading(false);
      alert('카카오 SDK 로딩에 실패했습니다. 페이지를 새로고침해주세요.');
    }
  };

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('ae9cce23e8367af0be888d1657d525e7');
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-5">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
          <div className="bg-gradient-to-r from-red-500 to-red-400 text-white px-8 py-10 text-center">
            <Truck size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">민간구급차</h1>
            <p className="text-white/90">안전하고 빠른 응급의료 서비스</p>
          </div>
          
          <div className="p-8">
            {!isLoading ? (
              <>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-center mb-5 text-gray-800">
                    서비스 선택
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleAppSelect('customer')}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        selectedApp === 'customer'
                          ? 'border-red-500 bg-red-500 text-white shadow-lg transform -translate-y-1'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-red-300'
                      }`}
                    >
                      <User size={24} className="mx-auto mb-2" />
                      <span className="text-sm font-semibold">고객용</span>
                    </button>
                    
                    <button
                      onClick={() => handleAppSelect('driver')}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        selectedApp === 'driver'
                          ? 'border-blue-500 bg-blue-500 text-white shadow-lg transform -translate-y-1'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <Truck size={24} className="mx-auto mb-2" />
                      <span className="text-sm font-semibold">기사용</span>
                    </button>
                    
                    <button
                      onClick={() => handleAppSelect('admin')}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        selectedApp === 'admin'
                          ? 'border-green-500 bg-green-500 text-white shadow-lg transform -translate-y-1'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                      }`}
                    >
                      <Settings size={24} className="mx-auto mb-2" />
                      <span className="text-sm font-semibold">운영자</span>
                    </button>
                  </div>
                </div>
                
                {selectedApp && selectedApp !== 'admin' && (
                  <div className="animate-fadeIn">
                    <button
                      onClick={handleKakaoLogin}
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-3"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 2C5.02944 2 1 5.13401 1 8.88889C1 11.1778 2.23529 13.2222 4.11765 14.4444L3.29412 17.7778C3.23529 18 3.47059 18.2222 3.76471 18.1111L7.64706 16.3333C8.41176 16.5 9.23529 16.5556 10 16.5556C14.9706 16.5556 19 13.4216 19 9.66667C19 5.91111 14.9706 2 10 2Z"
                          fill="#000"
                        />
                      </svg>
                      카카오로 간편 로그인
                    </button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">또는</span>
                      </div>
                    </div>
                    
                    <p className="text-center text-sm text-gray-600">
                      로그인 시{' '}
                      <a href="#" className="text-red-500 hover:underline">
                        이용약관
                      </a>{' '}
                      및{' '}
                      <a href="#" className="text-red-500 hover:underline">
                        개인정보처리방침
                      </a>
                      에 동의하게 됩니다.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">로그인 중...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Window 타입 확장
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (settings: {
          success: (response: KakaoAuthResponse) => void;
          fail: (error: Error) => void;
        }) => void;
      };
      API: {
        request: (settings: {
          url: string;
          success: (response: KakaoUserResponse) => void;
          fail: (error: Error) => void;
        }) => void;
      };
    };
  }
}