'use client';

import { useState } from 'react';
import { Droplet, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function BleedingGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '안전 확보',
      description: '환자와 자신의 안전을 확보하고, 가능하면 의료용 장갑을 착용하세요.',
      warning: '혈액을 통한 감염에 주의하세요'
    },
    {
      number: 2,
      title: '출혈 부위 확인',
      description: '출혈 부위를 확인하고 상처의 크기와 깊이를 파악하세요.',
      warning: '이물질이 박혀있다면 제거하지 마세요'
    },
    {
      number: 3,
      title: '직접 압박',
      description: '깨끗한 천이나 거즈로 출혈 부위를 직접 압박하세요. 10-15분간 지속적으로 압박합니다.',
      warning: '압박을 풀어 확인하지 마세요'
    },
    {
      number: 4,
      title: '거상',
      description: '가능하다면 출혈 부위를 심장보다 높게 올려주세요.',
      warning: '골절이 의심되면 거상하지 마세요'
    },
    {
      number: 5,
      title: '압박붕대',
      description: '지혈이 되면 압박붕대로 고정하세요. 너무 꽉 조이지 않도록 주의합니다.',
      warning: '혈액순환을 확인하세요'
    },
    {
      number: 6,
      title: '119 신고',
      description: '다량 출혈, 지혈이 안 되는 경우, 의식이 흐려지는 경우 즉시 119에 신고하세요.'
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
    <AppLayout title="출혈/지혈">
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
        <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-pink-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-pink-900 mb-1">심한 출혈 주의!</h4>
              <p className="text-sm text-pink-800">
                대량 출혈은 생명을 위협할 수 있습니다. 
                지혈이 되지 않거나 의식이 흐려지면 즉시 119에 신고하세요.
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
                index <= currentStep ? 'bg-pink-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                : 'bg-pink-500 text-white hover:bg-pink-600'
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
            <li>• 직접 압박이 가장 효과적입니다</li>
            <li>• 지혈제나 지혈대는 최후의 수단입니다</li>
            <li>• 쇼크 증상을 관찰하세요</li>
            <li>• 출혈 부위를 심장보다 높게</li>
            <li>• 압박은 지속적으로 유지</li>
          </ul>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Droplet size={20} className="inline mr-2" />
          지혈법 교육 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}