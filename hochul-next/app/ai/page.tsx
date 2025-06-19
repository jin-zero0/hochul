'use client';

import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import AppLayout from '../components/AppLayout';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 민간구급차 AI 상담사입니다. 무엇을 도와드릴까요?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('예약')) {
      return '예약을 원하시는군요! 예약하기 메뉴에서 날짜와 시간을 선택하실 수 있습니다. 예약은 최소 2시간 전에 해주셔야 합니다.';
    } else if (lowerQuestion.includes('요금') || lowerQuestion.includes('가격')) {
      return '요금은 거리와 시간에 따라 다르지만, 기본요금은 25,000원부터 시작합니다. 정확한 요금은 예약 시 확인하실 수 있습니다.';
    } else if (lowerQuestion.includes('긴급') || lowerQuestion.includes('응급')) {
      return '긴급 상황이신가요? 즉시 홈 화면의 "긴급호출" 버튼을 눌러주세요. 생명이 위급한 경우 119로 먼저 연락하시기 바랍니다.';
    } else if (lowerQuestion.includes('취소')) {
      return '예약 취소는 예정 시간 1시간 전까지 가능합니다. "이용내역" 메뉴에서 예약을 확인하고 취소하실 수 있습니다.';
    } else {
      return '네, 이해했습니다. 더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다. 예약, 요금, 이용방법 등에 대해 물어보세요!';
    }
  };

  return (
    <AppLayout title="AI 상담">
      <div className="flex flex-col h-full">
        {/* 채팅 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  {message.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 입력 영역 */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                input.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* 빠른 질문 버튼들 */}
          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={() => setInput('예약하고 싶어요')}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              예약 방법
            </button>
            <button
              onClick={() => setInput('요금이 얼마인가요?')}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              요금 문의
            </button>
            <button
              onClick={() => setInput('예약 취소하려면?')}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              예약 취소
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}