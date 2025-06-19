/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 예약 페이지 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 옵션 카드 선택 기능
    setupOptionCards();
    
    // 날짜/시간 초기화
    setupDateTime();
    
    // 위치 버튼 설정
    setupLocationButtons();
    
    // 예약하기 버튼
    setupSubmitButton();
});

/**
 * 옵션 카드 선택 기능 설정
 */
function setupOptionCards() {
    const optionCards = document.querySelectorAll('.option-card');
    if (optionCards.length === 0) return;
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            optionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // 선택된 옵션에 따른 가격 업데이트 (실제 구현 시)
            updatePrice();
        });
    });
}

/**
 * 날짜/시간 설정
 */
function setupDateTime() {
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');
    
    if (!dateInput || !timeInput) return;
    
    // 오늘 날짜 이후만 선택 가능하도록 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    dateInput.min = `${year}-${month}-${day}`;
    
    // 기본값으로 내일 날짜 설정
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tomorrowDay = String(tomorrow.getDate()).padStart(2, '0');
    
    dateInput.value = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
    timeInput.value = '09:00';
}

/**
 * 위치 버튼 설정
 */
function setupLocationButtons() {
    const locationBtns = document.querySelectorAll('.location-btn');
    if (locationBtns.length === 0) return;
    
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 위치 선택 화면 표시 (실제 구현 시)
            showAlert('위치 선택 화면이 표시됩니다.');
        });
    });
}

/**
 * 예약하기 버튼 설정
 */
function setupSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', function() {
        // 폼 유효성 검사
        const form = document.querySelector('form');
        if (form && !validateForm(form)) {
            showAlert('필수 정보를 모두 입력해주세요.', 'error');
            return;
        }
        
        // 예약 정보 서버 전송 (실제 구현 시)
        showAlert('예약이 완료되었습니다.');
        window.location.href = 'customer-app.html';
    });
}

/**
 * 가격 업데이트
 */
function updatePrice() {
    // 선택된 옵션에 따른 가격 계산 (실제 구현 시)
    const selectedOption = document.querySelector('.option-card.selected');
    if (!selectedOption) return;
    
    const priceElement = selectedOption.querySelector('.option-card-price');
    if (!priceElement) return;
    
    // 거리, 시간 등에 따른 가격 계산 (실제 구현 시)
    // const distance = calculateDistance();
    // const basePrice = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
    // const totalPrice = basePrice + (distance * 1000);
    // 
    // document.getElementById('total-price').textContent = `${totalPrice.toLocaleString()}원`;
} 