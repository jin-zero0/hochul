/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 홈 페이지 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 지도 초기화
    initMockMap();
    
    // 위치 선택 버튼 이벤트 설정
    setupLocationButtons();
    
    // 구급/예약 버튼 이벤트 설정
    setupActionButtons();
});

/**
 * 위치 선택 버튼 설정
 */
function setupLocationButtons() {
    const locationBtns = document.querySelectorAll('.location-btn');
    if (locationBtns.length === 0) return;
    
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 현재 위치 버튼
            if (this.querySelector('i').classList.contains('fa-location-arrow')) {
                getCurrentLocation();
            } 
            // 장소 선택 버튼
            else {
                showLocationSearch();
            }
        });
    });
}

/**
 * 현재 위치 가져오기
 */
function getCurrentLocation() {
    // 실제 구현 시에는 Geolocation API 사용
    // navigator.geolocation.getCurrentPosition(
    //     position => {
    //         const { latitude, longitude } = position.coords;
    //         // 지도 중심 위치 변경 및 마커 표시
    //     },
    //     error => {
    //         showAlert('위치 정보를 가져오는데 실패했습니다.', 'error');
    //     }
    // );
    
    // 목업 구현
    showAlert('현재 위치를 가져왔습니다: 서울특별시 강남구 테헤란로 123');
}

/**
 * 위치 검색 화면 표시
 */
function showLocationSearch() {
    // 실제 구현 시에는 위치 검색 모달 또는 화면 표시
    showAlert('장소 검색 화면이 표시됩니다.');
}

/**
 * 구급/예약 버튼 설정
 */
function setupActionButtons() {
    const emergencyBtn = document.querySelector('.emergency-btn');
    const reservationBtn = document.querySelector('.reservation-btn');
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            window.location.href = 'emergency.html';
        });
    }
    
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function() {
            window.location.href = 'reservation.html';
        });
    }
}

// 목업 지도 초기화 (실제 구현 시 카카오맵 API로 대체)
function initMockMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.style.background = "url('https://i.ibb.co/ZTyHGvN/kakao-map-sample.jpg')";
        mapContainer.style.backgroundSize = "cover";
        mapContainer.style.backgroundPosition = "center";
    }
} 