// 앱 상수 정의
export const APP_CONFIG = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '민간구급차 플랫폼',
  EMERGENCY_PHONE: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '119',
  
  // 맵 설정
  MAP: {
    DEFAULT_LAT: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || '37.5665'),
    DEFAULT_LNG: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LNG || '126.9780'),
    DEFAULT_ZOOM: parseInt(process.env.NEXT_PUBLIC_DEFAULT_ZOOM_LEVEL || '3'),
  },
  
  // API 키
  KAKAO: {
    APP_KEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '',
    MAP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '',
  },
  
  // 로컬 스토리지 키
  STORAGE_KEYS: {
    AUTH: 'hochul_auth',
    USER_SETTINGS: 'hochul_user_settings',
  },
  
  // 애니메이션 설정
  ANIMATION: {
    AD_SLIDE_INTERVAL: 3000, // 3초
    TRANSITION_DURATION: 500, // 0.5초
  },
} as const;

// 응급 상황 타입 상수
export const EMERGENCY_TYPES = [
  {
    id: 'cpr',
    title: '심폐소생술 (CPR)',
    description: '의식이 없고 호흡이 없을 때',
    route: '/emergency/cpr',
    color: 'red',
  },
  {
    id: 'bleeding',
    title: '출혈/지혈',
    description: '심한 출혈이 발생했을 때',
    route: '/emergency/bleeding',
    color: 'pink',
  },
  {
    id: 'burn',
    title: '화상',
    description: '화상을 입었을 때',
    route: '/emergency/burn',
    color: 'orange',
  },
  {
    id: 'choking',
    title: '기도 폐쇄',
    description: '음식물 등으로 숨을 못 쉴 때',
    route: '/emergency/choking',
    color: 'blue',
  },
  {
    id: 'fracture',
    title: '골절',
    description: '뼈가 부러졌을 때',
    route: '/emergency/fracture',
    color: 'purple',
  },
  {
    id: 'heat',
    title: '온열질환',
    description: '열사병, 일사병 등',
    route: '/emergency/heat',
    color: 'yellow',
  },
] as const;

// 네비게이션 메뉴 상수
export const NAV_ITEMS = [
  {
    href: '/home',
    label: '홈',
    icon: 'Home',
  },
  {
    href: '/reservation',
    label: '예약',
    icon: 'Calendar',
  },
  {
    href: '/emergency',
    label: '응급',
    icon: 'HeartHandshake',
  },
  {
    href: '/history',
    label: '이력',
    icon: 'Clock',
  },
  {
    href: '/profile',
    label: '프로필',
    icon: 'User',
  },
] as const;