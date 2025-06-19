'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Truck } from 'lucide-react';
import AppLayout from '../components/AppLayout';

interface HistoryItem {
  id: string;
  type: 'emergency' | 'reservation';
  date: string;
  time: string;
  startLocation: string;
  endLocation: string;
  status: 'completed' | 'cancelled' | 'in-progress';
  patientName: string;
  distance?: string;
  duration?: string;
  price?: number;
  driverName?: string;
  cancelReason?: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'emergency' | 'reservation'>('all');

  // 임시 데이터
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'emergency',
      date: '2023년 8월 15일',
      time: '오후 2:30',
      startLocation: '서울특별시 강남구 테헤란로 123',
      endLocation: '서울특별시 서초구 서초대로 456 서울대학교병원',
      status: 'completed',
      patientName: '김*수',
      distance: '8.5km',
      duration: '25분',
      price: 85000,
      driverName: '김기사'
    },
    {
      id: '2',
      type: 'reservation',
      date: '2023년 8월 20일',
      time: '오전 10:00',
      startLocation: '서울특별시 강남구 역삼동 123-456',
      endLocation: '서울특별시 종로구 대학로 101 서울대학교병원',
      status: 'in-progress',
      patientName: '박영*',
      distance: '12.3km',
      duration: '35분'
    },
    {
      id: '3',
      type: 'reservation',
      date: '2023년 7월 5일',
      time: '오후 3:00',
      startLocation: '서울특별시 마포구 합정동 123-456',
      endLocation: '서울특별시 서대문구 신촌동 연세대학교병원',
      status: 'cancelled',
      patientName: '이*수',
      cancelReason: '개인 사정'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소됨';
      case 'in-progress':
        return '진행중';
      default:
        return '';
    }
  };

  const filteredItems = historyItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handleReCall = (item: HistoryItem) => {
    router.push('/emergency');
  };

  const handleReBook = (item: HistoryItem) => {
    router.push('/reservation');
  };

  const handleViewDetail = (item: HistoryItem) => {
    alert('상세 내역 페이지로 이동합니다.');
  };

  const handleCancelReservation = (item: HistoryItem) => {
    if (confirm('예약을 취소하시겠습니까?')) {
      alert('예약이 취소되었습니다.');
    }
  };

  return (
    <AppLayout title="이용내역">
      {/* 탭 메뉴 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-all relative ${
              activeTab === 'all'
                ? 'text-red-500'
                : 'text-gray-500'
            }`}
          >
            전체
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-all relative ${
              activeTab === 'emergency'
                ? 'text-red-500'
                : 'text-gray-500'
            }`}
          >
            긴급 호출
            {activeTab === 'emergency' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('reservation')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-all relative ${
              activeTab === 'reservation'
                ? 'text-red-500'
                : 'text-gray-500'
            }`}
          >
            예약
            {activeTab === 'reservation' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* 이력 목록 */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
              >
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 font-semibold ${
                    item.type === 'emergency' ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    <Truck size={16} />
                    {item.type === 'emergency' ? '긴급 호출' : '예약'}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>

                {/* 날짜 */}
                <div className="text-xs text-gray-500 mb-3">
                  {item.date} {item.time}
                  {item.status === 'in-progress' && ' (예약)'}
                </div>

                {/* 경로 */}
                <div className="relative mb-4">
                  <div className="absolute left-2.5 top-6 bottom-6 w-px bg-gray-300"></div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.startLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.endLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 정보 */}
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                  <div className="flex-1">
                    <span className="text-xs text-gray-500">환자명</span>
                    <p className="font-semibold text-gray-800">{item.patientName}</p>
                  </div>
                  
                  {item.status === 'cancelled' && item.cancelReason ? (
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500">취소 사유</span>
                      <p className="font-semibold text-gray-800">{item.cancelReason}</p>
                    </div>
                  ) : (
                    <>
                      {item.distance && (
                        <div className="flex-1 text-center">
                          <span className="text-xs text-gray-500">
                            {item.status === 'in-progress' ? '예상 거리' : '이송 거리'}
                          </span>
                          <p className="font-semibold text-gray-800">{item.distance}</p>
                        </div>
                      )}
                      
                      {item.duration && (
                        <div className="flex-1 text-center">
                          <span className="text-xs text-gray-500">
                            {item.status === 'in-progress' ? '예상 시간' : '소요 시간'}
                          </span>
                          <p className="font-semibold text-gray-800">{item.duration}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {item.price && (
                    <div className="flex-1 text-right">
                      <span className="text-xs text-gray-500">이용 요금</span>
                      <p className="font-semibold text-red-500">{item.price.toLocaleString()}원</p>
                    </div>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleViewDetail(item)}
                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    상세 내역
                  </button>
                  
                  {item.status === 'completed' && (
                    <button
                      onClick={() => item.type === 'emergency' ? handleReCall(item) : handleReBook(item)}
                      className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      {item.type === 'emergency' ? '재호출' : '재예약'}
                    </button>
                  )}
                  
                  {item.status === 'in-progress' && (
                    <button
                      onClick={() => handleCancelReservation(item)}
                      className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      예약 취소
                    </button>
                  )}
                  
                  {item.status === 'cancelled' && (
                    <button
                      onClick={() => handleReBook(item)}
                      className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      재예약
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Calendar size={48} className="mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">이용내역이 없습니다</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                아직 구급차 호출 또는 예약 내역이 없습니다.<br />
                지금 바로 서비스를 이용해보세요.
              </p>
              <button
                onClick={() => router.push('/home')}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                홈으로 이동
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}