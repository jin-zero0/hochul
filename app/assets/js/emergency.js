/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 긴급 호출 페이지 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 현재 위치 설정
    setCurrentLocation();
    
    // 뒤로 가기 버튼 이벤트
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
    
    // 옵션 카드 선택 이벤트
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            optionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // 구급차 호출 버튼 이벤트
    const callBtn = document.getElementById('call-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const emergencyStatus = document.getElementById('emergency-status');
    
    if (callBtn && cancelBtn && emergencyStatus) {
        callBtn.addEventListener('click', function() {
            // 호출 상태로 변경
            callBtn.style.display = 'none';
            cancelBtn.style.display = 'block';
            emergencyStatus.style.display = 'block';
            
            // 스크롤을 상태 영역으로 이동
            emergencyStatus.scrollIntoView({ behavior: 'smooth' });
            
            // 상태 진행 애니메이션 (예시)
            simulateProgress();
        });
        
        cancelBtn.addEventListener('click', function() {
            // 취소 확인
            if (confirm('정말 구급차 호출을 취소하시겠습니까?')) {
                // 초기 상태로 복귀
                callBtn.style.display = 'block';
                cancelBtn.style.display = 'none';
                emergencyStatus.style.display = 'none';
                
                // 상태 초기화
                resetProgress();
            }
        });
    }
});

// 현재 위치 설정 함수
function setCurrentLocation() {
    const locationInput = document.getElementById('current-location');
    if (locationInput) {
        // 실제 구현 시 위치 API 사용
        locationInput.value = '서울특별시 강남구 테헤란로 123';
    }
}

// 진행 상태 시뮬레이션 함수
function simulateProgress() {
    const statusDots = document.querySelectorAll('.status-dot');
    if (statusDots.length === 0) return;
    
    // 첫 번째 상태는 이미 활성화되어 있음
    
    // 두 번째 상태 활성화 (2초 후)
    setTimeout(() => {
        if (statusDots[1]) statusDots[1].classList.add('active');
    }, 2000);
    
    // 세 번째 상태 활성화 (4초 후)
    setTimeout(() => {
        if (statusDots[2]) statusDots[2].classList.add('active');
    }, 4000);
    
    // 네 번째 상태 활성화 (8초 후)
    setTimeout(() => {
        if (statusDots[3]) statusDots[3].classList.add('active');
    }, 8000);
}

// 진행 상태 초기화 함수
function resetProgress() {
    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach((dot, index) => {
        if (index > 0) {
            dot.classList.remove('active');
        }
    });
} 