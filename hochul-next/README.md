# 호출 - 민간구급차 플랫폼

Next.js 기반의 민간구급차 실시간 배차/호출 플랫폼입니다.

## 🚀 주요 기능

### 일반 사용자
- **긴급호출**: 가장 가까운 구급차를 즉시 호출
- **예약하기**: 날짜와 시간을 지정하여 구급차 예약
- **응급처치 가이드**: 다양한 응급상황에 대한 단계별 가이드
- **이용내역**: 과거 이용 기록 및 예약 관리
- **프로필 관리**: 개인정보 및 설정 관리

### 응급처치 가이드
- 심폐소생술 (CPR)
- 출혈/지혈
- 화상 처치
- 기도 폐쇄
- 골절 응급처치
- 온열질환 대처

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Kakao Maps API
- **Auth**: Kakao Login

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
hochul-next/
├── app/
│   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── AppLayout.tsx
│   │   ├── BottomNav.tsx
│   │   └── Header.tsx
│   ├── emergency/        # 응급처치 페이지들
│   │   ├── page.tsx
│   │   └── cpr/
│   │       └── page.tsx
│   ├── history/          # 이용내역 페이지
│   │   └── page.tsx
│   ├── home/            # 홈 페이지
│   │   └── page.tsx
│   ├── login/           # 로그인 페이지
│   │   └── page.tsx
│   ├── profile/         # 프로필 페이지
│   │   └── page.tsx
│   ├── reservation/     # 예약 페이지
│   │   └── page.tsx
│   ├── types/           # TypeScript 타입 정의
│   │   └── index.ts
│   ├── utils/           # 유틸리티 함수
│   │   └── auth.ts
│   ├── globals.css      # 전역 스타일
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 시작 페이지
├── public/              # 정적 파일
├── package.json
└── README.md
```

## 🔑 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Kakao API Keys
NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_app_key
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_key
```

## 📱 반응형 디자인

- 모바일 우선 디자인 (Mobile First)
- Android 표준 화면 크기 최적화 (360x640, 411x731)
- 데스크톱에서는 모바일 뷰로 중앙 정렬

## 🎨 디자인 시스템

- **Primary Color**: Red (#EF4444)
- **Secondary Colors**: Blue, Green, Purple
- **Border Radius**: 12px ~ 20px
- **Shadow**: Subtle shadows for depth

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
