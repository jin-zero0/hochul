/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 공통 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('앱이 초기화되었습니다.');
    
    // 모바일 화면 크기 조정
    adjustMobileView();
    
    // 하단 네비게이션 이벤트 설정
    setupNavigation();
    
    // 뒤로가기 버튼 이벤트 설정
    setupBackButton();
});

/**
 * 모바일 화면 크기 조정
 * Android 규격 (411x731 dp 또는 360x640 dp)에 맞게 조정
 */
function adjustMobileView() {
    const container = document.querySelector('.mobile-container') || document.querySelector('.app-container');
    if (!container) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Android 규격에 맞게 크기 조정
    if (windowWidth <= 360) {
        // 작은 Android 화면 (360x640)
        container.style.width = '360px';
        container.style.height = windowHeight < 640 ? `${windowHeight - 20}px` : '640px';
        container.style.margin = '10px auto';
        container.style.borderRadius = '15px';
    } else if (windowWidth <= 411) {
        // 표준 Android 화면 (411x731)
        container.style.width = '411px';
        container.style.height = windowHeight < 731 ? `${windowHeight - 40}px` : '731px';
        container.style.margin = '20px auto';
        container.style.borderRadius = '20px';
    }
}

/**
 * 하단 네비게이션 설정
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname;
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.endsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 뒤로가기 버튼 설정
 */
function setupBackButton() {
    const backBtn = document.querySelector('.back-btn');
    if (!backBtn) return;
    
    backBtn.addEventListener('click', function() {
        // 이전 페이지로 이동
        if (document.referrer && document.referrer.includes(window.location.host)) {
            window.history.back();
        } else {
            // 기본값으로 홈으로 이동
            window.location.href = 'customer-app.html';
        }
    });
}

/**
 * 폼 입력값 유효성 검사
 * @param {HTMLFormElement} form - 검사할 폼 요소
 * @returns {boolean} - 유효성 검사 결과
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

/**
 * 알림 메시지 표시
 * @param {string} message - 표시할 메시지
 * @param {string} type - 알림 유형 (success, error, info)
 */
function showAlert(message, type = 'info') {
    // 기본적으로는 alert 사용
    alert(message);
    
    // 실제 구현 시에는 커스텀 알림 UI 사용
    // const alertElement = document.createElement('div');
    // alertElement.className = `alert alert-${type}`;
    // alertElement.textContent = message;
    // document.body.appendChild(alertElement);
    // 
    // setTimeout(() => {
    //     alertElement.remove();
    // }, 3000);
}

/**
 * 지도 초기화 (목업)
 */
function initMockMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    mapContainer.style.background = "url('https://i.ibb.co/ZTyHGvN/kakao-map-sample.jpg')";
    mapContainer.style.backgroundSize = "cover";
    mapContainer.style.backgroundPosition = "center";
} 