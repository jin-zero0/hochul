'use client';

import { useState } from 'react';
import { Sun, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function HeatGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '서늘한 곳으로 이동',
      description: '즉시 환자를 시원하고 그늘진 곳으로 옮기세요. 에어컨이 있는 실내가 가장 좋습니다.',
      warning: '의식이 없으면 즉시 119 신고'
    },
    {
      number: 2,
      title: '옷 풀기',
      description: '꽉 끼는 옷을 풀거나 벗겨 체온 발산을 돕습니다.',
      warning: '의식이 없는 환자는 기도 확보 우선'
    },
    {
      number: 3,
      title: '체온 낮추기',
      description: '찬물로 온몸을 적시고 부채질을 하거나 선풍기를 틀어 체온을 낮춰주세요.',
      warning: '너무 차가운 물은 오히려 위험'
    },
    {
      number: 4,
      title: '수분 공급',
      description: '의식이 있다면 시원한 물이나 이온음료를 조금씩 자주 마시게 하세요.',
      warning: '의식이 없으면 절대 먹이지 마세요'
    },
    {
      number: 5,
      title: '냉찜질',
      description: '목, 겨드랑이, 사타구니에 얼음주머니나 찬 수건을 대어주세요.',
      warning: '직접 얼음을 대지 마세요'
    },
    {
      number: 6,
      title: '상태 관찰',
      description: '체온, 의식, 호흡을 지속적으로 확인하고 악화되면 즉시 119에 신고하세요.',
      warning: '열사병은 생명을 위협할 수 있습니다'
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
    <AppLayout title="온열질환">
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
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-1">열사병 위험!</h4>
              <p className="text-sm text-yellow-800">
                체온이 40도 이상, 의식 저하, 발작 등이 있으면 열사병입니다. 
                즉시 119에 신고하고 체온을 낮춰주세요.
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
                index <= currentStep ? 'bg-yellow-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium flex items-start gap-2">
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
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            다음 단계
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 열사병 vs 일사병</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <div>
              <span className="font-semibold">열사병:</span> 체온 40°C 이상, 의식 저하, 땀 없음, 생명 위험
            </div>
            <div>
              <span className="font-semibold">일사병:</span> 체온 37-40°C, 두통, 어지러움, 땀 많음, 치료 가능
            </div>
          </div>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Sun size={20} className="inline mr-2" />
          온열질환 예방 교육 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}