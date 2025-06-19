// 사용자 타입
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: 'customer' | 'driver';
}

// 위치 정보
export interface Location {
  lat: number;
  lng: number;
  address: string;
  placeName?: string;
}

// 예약 정보
export interface Reservation {
  id: string;
  userId: string;
  startLocation: Location;
  endLocation: Location;
  scheduledTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  driverId?: string;
  price?: number;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 응급 상황 타입
export interface EmergencyType {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
}

// 진료 기록
export interface MedicalHistory {
  id: string;
  userId: string;
  date: Date;
  hospital: string;
  diagnosis: string;
  treatment: string;
  note?: string;
}