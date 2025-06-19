'use client';

import { useState } from 'react';
import { Wind, Phone, AlertCircle, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/AppLayout';

interface Step {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export default function ChokingGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: '기도 폐쇄 확인',
      description: '"목이 막혔나요?" 라고 물어보고, 말을 못하거나 기침을 못하면 완전 폐쇄입니다.',
      warning: '부분 폐쇄면 기침을 유도하세요'
    },
    {
      number: 2,
      title: '119 신고 요청',
      description: '주변 사람에게 119 신고를 요청하세요. 혼자라면 먼저 응급처치를 시행합니다.',
      warning: '의식이 없으면 즉시 119 신고'
    },
    {
      number: 3,
      title: '하임리히법 자세',
      description: '환자의 뒤에서 양팔로 환자의 허리를 감싸 안으세요.',
      warning: '임산부나 비만인은 가슴 부위 압박'
    },
    {
      number: 4,
      title: '주먹 위치',
      description: '한 손을 주먹 쥐고 엄지를 배꼽과 명치 사이에 대세요. 다른 손으로 주먹을 감싸세요.'
    },
    {
      number: 5,
      title: '복부 압박',
      description: '빠르게 위쪽으로 밀쳐 올리듯 5회 압박하세요. 이물질이 나올 때까지 반복합니다.',
      warning: '너무 세게 하면 내장 손상 위험'
    },
    {
      number: 6,
      title: '의식 없을 때',
      description: '의식을 잃으면 바로 심폐소생술을 시작하세요. 가슴압박 시 입안을 확인하고 이물질이 보이면 제거하세요.',
      warning: '보이지 않는 이물질을 억지로 빼려 하지 마세요'
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
    <AppLayout title="기도 폐쇄">
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
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 mb-1">질식 응급상황!</h4>
              <p className="text-sm text-blue-800">
                완전 기도 폐쇄는 4-6분 내에 뇌손상이 시작됩니다. 
                신속한 응급처치가 생명을 구합니다.
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
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 현재 단계 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            다음 단계
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 bg-green-50 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 mb-2">💡 기억하세요</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• 성인: 복부 압박 (하임리히법)</li>
            <li>• 임산부/비만: 가슴 압박</li>
            <li>• 영아(1세 미만): 등 두드리기와 가슴 압박</li>
            <li>• 의식 없으면 심폐소생술</li>
            <li>• 혼자 있을 때는 테이블 모서리 이용</li>
          </ul>
        </div>

        {/* 영상 링크 */}
        <button className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          <Wind size={20} className="inline mr-2" />
          하임리히법 교육 영상 보기
        </button>
      </div>
    </AppLayout>
  );
}