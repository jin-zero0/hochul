'use client';

import { useState } from 'react';
import { Flame, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function BurnGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '화상 원인 제거',
      description: '즉시 열원에서 벗어나게 하고, 불이 붙었다면 물로 끄거나 담요로 덮어 진화하세요.',
      warning: '화학물질 화상은 물로 씻기 전 물질 확인 필요'
    },
    {
      number: 2,
      title: '옷과 장신구 제거',
      description: '화상 부위의 옷을 조심스럽게 제거하세요. 피부에 달라붙었다면 무리하게 떼지 마세요.',
      warning: '달라붙은 옷은 가위로 주변만 잘라내세요'
    },
    {
      number: 3,
      title: '찬물로 냉각',
      description: '흐르는 찬물(15-25도)로 10-20분간 화상 부위를 식혀주세요.',
      warning: '얼음을 직접 대지 마세요'
    },
    {
      number: 4,
      title: '화상 정도 확인',
      description: '1도(발적), 2도(물집), 3도(백색/검은색) 화상을 구분하고 범위를 확인하세요.',
      warning: '2도 이상이거나 넓은 범위는 병원 치료 필요'
    },
    {
      number: 5,
      title: '상처 보호',
      description: '깨끗한 거즈나 천으로 느슨하게 덮어주세요. 물집은 터뜨리지 마세요.',
      warning: '연고나 민간요법 사용 금지'
    },
    {
      number: 6,
      title: '병원 이송',
      description: '2도 이상 화상, 얼굴/손/발/생식기 화상, 전기/화학 화상은 즉시 병원으로 이송하세요.'
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
    <AppLayout title="화상">
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
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-orange-900 mb-1">심한 화상 주의!</h4>
              <p className="text-sm text-orange-800">
                넓은 범위의 화상이나 3도 화상은 생명을 위협할 수 있습니다. 
                즉시 119에 신고하고 적절한 응급처치를 시행하세요.
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
                index <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                : 'bg-orange-500 text-white hover:bg-orange-600'
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
            <li>• 찬물로 충분히 식히는 것이 가장 중요</li>
            <li>• 얼음이나 얼음물은 사용하지 마세요</li>
            <li>• 물집은 절대 터뜨리지 마세요</li>
            <li>• 버터, 된장 등 민간요법 금지</li>
            <li>• 화상 연고는 의사 처방 후 사용</li>
          </ul>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Flame size={20} className="inline mr-2" />
          화상 응급처치 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}