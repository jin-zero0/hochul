'use client';

import { useState } from 'react';
import { Activity, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function CPRGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '의식 확인',
      description: '어깨를 가볍게 두드리며 "괜찮으세요?" 라고 큰 소리로 물어보세요.',
      warning: '환자를 심하게 흔들지 마세요'
    },
    {
      number: 2,
      title: '119 신고',
      description: '주변 사람에게 119 신고를 요청하고 자동제세동기(AED)를 가져오도록 하세요.',
      warning: '혼자라면 스피커폰으로 신고하면서 심폐소생술 시행'
    },
    {
      number: 3,
      title: '호흡 확인',
      description: '10초 이내로 호흡을 확인하세요. 정상적인 호흡이 없거나 심정지 호흡이면 즉시 가슴압박을 시작하세요.'
    },
    {
      number: 4,
      title: '가슴압박 위치',
      description: '양쪽 젖꼭지를 잇는 선의 중앙에 한 손바닥을 올리고 그 위에 다른 손을 겹쳐 깍지를 끼세요.'
    },
    {
      number: 5,
      title: '가슴압박 시행',
      description: '분당 100-120회 속도로, 최소 5cm 깊이로 30회 압박하세요. "하나, 둘, 셋..." 소리내어 세세요.',
      warning: '압박 후 가슴이 완전히 이완되도록 하세요'
    },
    {
      number: 6,
      title: '인공호흡',
      description: '머리를 뒤로 젖히고 턱을 들어 기도를 열고, 코를 막은 후 1초간 2회 인공호흡을 시행하세요.',
      warning: '인공호흡이 어려우면 가슴압박만 계속하세요'
    },
    {
      number: 7,
      title: '반복 시행',
      description: '30회 압박과 2회 인공호흡을 119 구급대가 도착할 때까지 반복하세요.',
      warning: '지치면 2분마다 다른 사람과 교대하세요'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AppLayout title="심폐소생술 (CPR)">
      <div className="p-4">
        {/* 긴급 전화 버튼 */}
        <button
          onClick={() => window.location.href = 'tel:119'}
          className="w-full bg-red-600 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg mb-4"
        >
          <Phone size={24} />
          119 즉시 신고
        </button>

        {/* 중요 경고 */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-1">생명이 위급합니다!</h4>
              <p className="text-sm text-red-800">
                심정지 환자는 4분 이내에 심폐소생술을 시작해야 합니다. 
                즉시 119에 신고하고 아래 단계를 따라주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 진행 상태 표시 */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 mx-0.5 rounded-full transition-all ${
                index <= currentStep ? 'bg-red-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {steps[currentStep].number}
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {steps[currentStep].title}
            </h3>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {steps[currentStep].description}
          </p>
          
          {steps[currentStep].warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 font-medium flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                {steps[currentStep].warning}
              </p>
            </div>
          )}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            이전 단계
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStep === steps.length - 1
                ? 'bg-gray-100 text-gray-400'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            다음 단계
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 기억하세요</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 가슴압박은 강하고, 빠르고, 중단없이</li>
            <li>• 압박 깊이: 성인 약 5cm</li>
            <li>• 압박 속도: 분당 100-120회</li>
            <li>• 압박과 이완 시간을 같게</li>
            <li>• 가능하면 2분마다 교대</li>
          </ul>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Activity size={20} className="inline mr-2" />
          CPR 교육 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}