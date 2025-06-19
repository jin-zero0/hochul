'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Truck, Shield, Activity, Stethoscope } from 'lucide-react';
import AppLayout from '../components/AppLayout';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function ReservationPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string>('standard');
  
  // 특수구급차 추가 정보
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [startType, setStartType] = useState('hospital');
  const [startHospital, setStartHospital] = useState('');
  const [startFloor, setStartFloor] = useState('');
  const [endType, setEndType] = useState('hospital');
  const [endHospital, setEndHospital] = useState('');
  const [endFloor, setEndFloor] = useState('');
  const [medicalEquipment, setMedicalEquipment] = useState<string[]>([]);
  const [specialRequest, setSpecialRequest] = useState('');

  const serviceTypes: ServiceType[] = [
    {
      id: 'standard',
      name: '일반 구급차',
      description: '일반 환자 이송 (보호자 동승 가능)',
      icon: <Truck size={24} />,
      iconBg: 'bg-blue-500'
    },
    {
      id: 'special',
      name: '특수 구급차',
      description: '중환자 이송 (의료진 동승)',
      icon: <Shield size={24} />,
      iconBg: 'bg-green-500'
    }
  ];

  const medicalEquipmentOptions = [
    { id: 'oxygen', label: '산소호흡기' },
    { id: 'monitor', label: '환자감시장치' },
    { id: 'suction', label: '석션기' },
    { id: 'infusion', label: '수액펌프' },
    { id: 'ventilator', label: '인공호흡기' },
    { id: 'defibrillator', label: '제세동기' }
  ];

  const toggleEquipment = (equipmentId: string) => {
    setMedicalEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !startLocation || !endLocation) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (selectedService === 'special' && (!patientName || !patientCondition)) {
      alert('환자 정보를 모두 입력해주세요.');
      return;
    }

    const reservationData = {
      date: selectedDate,
      time: selectedTime,
      startLocation,
      endLocation,
      serviceType: selectedService,
      // 특수구급차 추가 정보
      ...(selectedService === 'special' && {
        patientInfo: {
          name: patientName,
          age: patientAge,
          condition: patientCondition
        },
        startDetails: {
          type: startType,
          hospital: startHospital,
          floor: startFloor
        },
        endDetails: {
          type: endType,
          hospital: endHospital,
          floor: endFloor
        },
        medicalEquipment,
        specialRequest
      })
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
    <AppLayout title="예약 호출">
      {/* 상단 정보 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-gray-700">
          <MapPin size={16} />
          <span className="font-medium">예약 이송 서비스</span>
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold ml-2">
            예약
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 날짜/시간 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-blue-500" />
            <h3 className="font-semibold text-gray-800">예약 일시</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* 서비스 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-blue-500" />
            <h3 className="font-semibold text-gray-800">서비스 선택</h3>
          </div>
          <div className="space-y-3">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                  selectedService === service.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center text-white mr-4`}>
                  {service.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 특수구급차 선택시 추가 정보 */}
        {selectedService === 'special' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-4 animate-fadeIn">
            <h4 className="font-semibold text-blue-900 flex items-center gap-2">
              <Stethoscope size={18} />
              환자 정보
            </h4>
            
            <div className="space-y-3">
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="환자명"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-blue-400 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="나이"
                  className="px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={patientCondition}
                  onChange={(e) => setPatientCondition(e.target.value)}
                  placeholder="증상/진단명"
                  className="px-4 py-3 border-2 border-blue-200 rounded-xl bg-white focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* 의료장비 선택 */}
            <div>
              <h5 className="font-medium text-blue-900 mb-3">필요한 의료장비</h5>
              <div className="bg-white rounded-xl p-3 border border-blue-200">
                <div className="grid grid-cols-2 gap-3">
                  {medicalEquipmentOptions.map((equipment) => (
                    <label key={equipment.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={medicalEquipment.includes(equipment.id)}
                        onChange={() => toggleEquipment(equipment.id)}
                        className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{equipment.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-2">* 선택하신 장비는 구급차에 탑재됩니다</p>
            </div>
          </div>
        )}

        {/* 위치 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-green-500" />
            <h3 className="font-semibold text-gray-800">이송 위치</h3>
          </div>
          
          <div className="space-y-4">
            {/* 출발지 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">출발지</label>
              {selectedService === 'special' ? (
                <div className="space-y-2">
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="hospital"
                        checked={startType === 'hospital'}
                        onChange={(e) => setStartType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">병원</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="home"
                        checked={startType === 'home'}
                        onChange={(e) => setStartType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">자택</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="other"
                        checked={startType === 'other'}
                        onChange={(e) => setStartType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">기타</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="출발지 주소"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                  {startType === 'hospital' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={startHospital}
                        onChange={(e) => setStartHospital(e.target.value)}
                        placeholder="병원명"
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={startFloor}
                        onChange={(e) => setStartFloor(e.target.value)}
                        placeholder="병동/층"
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="출발지를 입력하세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                />
              )}
            </div>

            {/* 도착지 */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">도착지</label>
              {selectedService === 'special' ? (
                <div className="space-y-2">
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="hospital"
                        checked={endType === 'hospital'}
                        onChange={(e) => setEndType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">병원</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="home"
                        checked={endType === 'home'}
                        onChange={(e) => setEndType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">자택</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="other"
                        checked={endType === 'other'}
                        onChange={(e) => setEndType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">기타</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    placeholder="도착지 주소"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                  {endType === 'hospital' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={endHospital}
                        onChange={(e) => setEndHospital(e.target.value)}
                        placeholder="병원명"
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={endFloor}
                        onChange={(e) => setEndFloor(e.target.value)}
                        placeholder="병동/층"
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  placeholder="도착지를 입력하세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                />
              )}
            </div>
          </div>
        </div>

        {/* 추가 요청사항 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">추가 요청사항</h3>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="특별한 요청사항이 있으시면 입력해주세요"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
          />
        </div>

        {/* 예약 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          예약하기
        </button>

        {/* 안내 문구 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="font-semibold text-amber-800 mb-2">예약 안내</p>
          <ul className="space-y-1 text-sm text-amber-700">
            <li>• 예약은 최소 2시간 전에 해주세요</li>
            <li>• 예약 취소는 1시간 전까지 가능합니다</li>
            <li>• 특수구급차는 전문 의료진이 동승합니다</li>
            <li>• 긴급한 경우 긴급호출을 이용해주세요</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}

// 애니메이션 스타일 추가
const style = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}