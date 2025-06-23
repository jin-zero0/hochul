'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import Script from 'next/script';

interface MapSectionProps {
  className?: string;
}

export default function MapSection({ className = '' }: MapSectionProps) {
  const [map, setMap] = useState<any>(null);

  const initializeMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(
          APP_CONFIG.MAP.DEFAULT_LAT,
          APP_CONFIG.MAP.DEFAULT_LNG
        ),
        level: APP_CONFIG.MAP.DEFAULT_ZOOM
      };
      
      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);
      
      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lng);
            
            mapInstance.setCenter(locPosition);
          },
          (error) => {
            console.warn('위치 정보를 가져올 수 없습니다:', error);
          }
        );
      }
    }
  };

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_CONFIG.KAKAO.APP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        }}
      />
      
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-40 relative ${className}`}>
        <div id="map" className="w-full h-full" />
        <MapPin 
          size={32} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 drop-shadow-lg" 
        />
      </div>
    </>
  );
}

// Window 타입 확장
declare global {
  interface Window {
    kakao: any;
  }
}