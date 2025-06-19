'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AppLayout from '../components/AppLayout';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  startLocation: string;
  endLocation: string;
  status: 'completed' | 'cancelled' | 'pending';
  price?: number;
  driverName?: string;
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reservation' | 'emergency'>('all');

  // 임시 데이터
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      startLocation: '서울대학교병원',
      endLocation: '강남구 삼성동',
      status: 'completed',
      price: 35000,
      driverName: '김기사'
    },
    {
      id: '2',
      date: '2024-01-10',
      time: '09:00',
      startLocation: '연세대학교 세브란스병원',
      endLocation: '마포구 상암동',
      status: 'completed',
      price: 28000,
      driverName: '이기사'
    },
    {
      id: '3',
      date: '2024-01-20',
      time: '15:00',
      startLocation: '서초구 반포동',
      endLocation: '삼성서울병원',
      status: 'pending',
      price: 25000
    },
    {
      id: '4',
      date: '2024-01-08',
      time: '11:00',
      startLocation: '송파구 잠실동',
      endLocation: '아산병원',
      status: 'cancelled'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'cancelled':
        return <XCircle size={18} className="text-red-500" />;
      case 'pending':
        return <AlertCircle size={18} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소됨';
      case 'pending':
        return '예약됨';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return '';
    }
  };

  const filteredItems = historyItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reservation') return item.status === 'pending';
    if (activeTab === 'emergency') return item.status === 'completed';
    return true;
  });

  return (
    <AppLayout title="이용 내역">
      <div className="p-4">
        {/* 탭 메뉴 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab('reservation')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'reservation'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            예약
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'emergency'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            이용완료
          </button>
        </div>

        {/* 이력 목록 */}
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                {/* 상태 및 날짜 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-800">
                      {item.date}
                    </span>
                    <Clock size={16} className="text-gray-500 ml-2" />
                    <span className="text-sm text-gray-600">{item.time}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {getStatusText(item.status)}
                  </div>
                </div>

                {/* 위치 정보 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">출발</p>
                      <p className="font-medium text-gray-800">{item.startLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">도착</p>
                      <p className="font-medium text-gray-800">{item.endLocation}</p>
                    </div>
                  </div>
                </div>

                {/* 추가 정보 */}
                {(item.price || item.driverName) && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    {item.driverName && (
                      <span className="text-sm text-gray-600">
                        기사: <span className="font-semibold text-gray-800">{item.driverName}</span>
                      </span>
                    )}
                    {item.price && (
                      <span className="text-sm font-semibold text-gray-800">
                        {item.price.toLocaleString()}원
                      </span>
                    )}
                  </div>
                )}

                {/* 액션 버튼 */}
                {item.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                      예약 변경
                    </button>
                    <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                      예약 취소
                    </button>
                  </div>
                )}
                
                {item.status === 'completed' && (
                  <button className="w-full mt-3 py-2 px-4 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                    영수증 보기
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">이용 내역이 없습니다</p>
            </div>
          )}
        </div>

        {/* 통계 요약 */}
        {filteredItems.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">이용 통계</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {historyItems.filter(item => item.status === 'completed').length}
                </div>
                <div className="text-xs text-gray-600">완료</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {historyItems.filter(item => item.status === 'pending').length}
                </div>
                <div className="text-xs text-gray-600">예약</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">
                  {historyItems.filter(item => item.status === 'cancelled').length}
                </div>
                <div className="text-xs text-gray-600">취소</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}