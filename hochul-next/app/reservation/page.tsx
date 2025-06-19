'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, FileText, ChevronRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';

export default function ReservationPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [note, setNote] = useState('');

  const purposes = [
    '병원 방문',
    '퇴원',
    '검진',
    '응급 이송',
    '기타'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !startLocation || !endLocation || !purpose) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const reservationData = {
      date: selectedDate,
      time: selectedTime,
      startLocation,
      endLocation,
      purpose,
      note
    };

    console.log('예약 정보:', reservationData);
    
    if (confirm('예약하시겠습니까?')) {
      alert('예약이 완료되었습니다. 예약 내역은 "이력" 메뉴에서 확인하실 수 있습니다.');
      router.push('/history');
    }
  };

  // 오늘 날짜를 최소값으로 설정
  const today = new Date().toISOString().split('T')[0];

  return (
    <AppLayout title="예약하기">
      <div className="p-4 space-y-4">
        {/* 날짜 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={20} className="text-red-500" />
            <h3 className="font-semibold text-gray-800">날짜 선택</h3>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
          />
        </div>

        {/* 시간 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Clock size={20} className="text-blue-500" />
            <h3 className="font-semibold text-gray-800">시간 선택</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* 위치 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-800">위치 정보</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">출발지</label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="출발 위치를 입력하세요"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">도착지</label>
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="도착 위치를 입력하세요"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 이용 목적 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <FileText size={20} className="text-purple-500" />
            <h3 className="font-semibold text-gray-800">이용 목적</h3>
          </div>
          <div className="space-y-2">
            {purposes.map((item) => (
              <button
                key={item}
                onClick={() => setPurpose(item)}
                className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-all ${
                  purpose === item
                    ? 'bg-purple-50 border-2 border-purple-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="font-medium text-gray-800">{item}</span>
                {purpose === item && (
                  <ChevronRight size={18} className="text-purple-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 추가 요청사항 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">추가 요청사항</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="특별한 요청사항이 있으시면 입력해주세요"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* 예약 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-red-500 to-red-400 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          예약하기
        </button>

        {/* 안내 문구 */}
        <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
          <p className="font-semibold mb-1">예약 안내</p>
          <ul className="space-y-1 text-xs">
            <li>• 예약은 최소 2시간 전에 해주세요</li>
            <li>• 예약 취소는 1시간 전까지 가능합니다</li>
            <li>• 긴급한 경우 긴급호출을 이용해주세요</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}