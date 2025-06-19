'use client';

import { useState } from 'react';
import { Bone, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function FractureGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '안전 확보',
      description: '환자를 안전한 곳으로 이동시키고, 불필요한 움직임을 최소화하세요.',
      warning: '척추 손상이 의심되면 절대 움직이지 마세요'
    },
    {
      number: 2,
      title: '골절 부위 확인',
      description: '변형, 부종, 통증, 기능 상실 등을 확인하세요. 개방성 골절인지 확인합니다.',
      warning: '골절 부위를 직접 만지지 마세요'
    },
    {
      number: 3,
      title: '움직임 제한',
      description: '골절 부위의 위아래 관절을 포함하여 움직이지 않도록 고정하세요.',
      warning: '무리하게 펴거나 맞추려 하지 마세요'
    },
    {
      number: 4,
      title: '부목 고정',
      description: '단단한 물체(신문지, 나무판자 등)를 이용해 부목을 대고 붕대로 고정하세요.',
      warning: '혈액순환을 방해할 정도로 꽉 묶지 마세요'
    },
    {
      number: 5,
      title: '냉찜질',
      description: '부종과 통증 완화를 위해 얼음주머니를 수건에 싸서 15-20분간 대어주세요.',
      warning: '얼음을 직접 피부에 대지 마세요'
    },
    {
      number: 6,
      title: '병원 이송',
      description: '가능한 빨리 병원으로 이송하세요. 개방성 골절이나 대퇴골 골절은 119를 부르세요.',
      warning: '쇼크 증상을 관찰하세요'
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
    <AppLayout title="골절">
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
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-purple-900 mb-1">골절 주의사항!</h4>
              <p className="text-sm text-purple-800">
                잘못된 처치는 신경, 혈관 손상을 일으킬 수 있습니다. 
                절대 골절 부위를 맞추려 하지 마세요.
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
                index <= currentStep ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                : 'bg-purple-500 text-white hover:bg-purple-600'
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
            <li>• 골절 부위를 움직이지 마세요</li>
            <li>• 변형된 부위를 맞추려 하지 마세요</li>
            <li>• 부목은 관절 위아래를 포함해 고정</li>
            <li>• 손가락, 발가락 색깔과 감각 확인</li>
            <li>• 개방성 골절은 상처를 덮어주세요</li>
          </ul>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Bone size={20} className="inline mr-2" />
          골절 응급처치 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}