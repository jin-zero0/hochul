// 인증 관련 유틸리티 함수들
import { APP_CONFIG } from '../constants';

const AUTH_KEY = APP_CONFIG.STORAGE_KEYS.AUTH;

export interface AuthData {
  isLoggedIn: boolean;
  user?: {
    id: string;
    name: string;
    phone: string;
    type: 'customer' | 'driver' | 'admin';
  };
  token?: string;
}

// 로그인 상태 확인
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;
  
  try {
    const parsed: AuthData = JSON.parse(authData);
    return parsed.isLoggedIn === true;
  } catch {
    return false;
  }
};

// 사용자 정보 가져오기
export const getUser = (): AuthData['user'] | null => {
  if (typeof window === 'undefined') return null;
  
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  
  try {
    const parsed: AuthData = JSON.parse(authData);
    return parsed.user || null;
  } catch {
    return null;
  }
};

// 로그인
export const login = (user: AuthData['user'], token?: string): void => {
  if (typeof window === 'undefined') return;
  
  const authData: AuthData = {
    isLoggedIn: true,
    user,
    token
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

// 로그아웃
export const logout = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(AUTH_KEY);
};

// 사용자 타입 확인
export const getUserType = (): 'customer' | 'driver' | 'admin' | null => {
  const user = getUser();
  return user?.type || null;
};