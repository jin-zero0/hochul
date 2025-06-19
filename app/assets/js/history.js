/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 이용내역 페이지 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    setupTabs();
    
    // 상세 내역 버튼
    setupDetailButtons();
    
    // 재호출/재예약/취소 버튼
    setupActionButtons();
    
    // 빈 상태 처리
    checkEmptyState();
});

/**
 * 탭 전환 기능 설정
 */
function setupTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const historyCards = document.querySelectorAll('.history-card');
    const emptyState = document.querySelector('.empty-state');
    
    if (tabItems.length === 0 || historyCards.length === 0 || !emptyState) return;
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 활성화된 탭 스타일 변경
            tabItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            let hasItems = false;
            
            // 내역 필터링
            historyCards.forEach(card => {
                const cardType = card.querySelector('.history-type').classList.contains('emergency') ? 'emergency' : 'reservation';
                
                if (tabType === 'all' || tabType === cardType) {
                    card.style.display = 'block';
                    hasItems = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 빈 상태 표시
            emptyState.style.display = hasItems ? 'none' : 'flex';
        });
    });
}

/**
 * 상세 내역 버튼 설정
 */
function setupDetailButtons() {
    const detailBtns = document.querySelectorAll('.history-action-btn.primary');
    if (detailBtns.length === 0) return;
    
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 상세 내역 페이지로 이동 (실제 구현 시)
            const historyId = this.closest('.history-card').getAttribute('data-id');
            showAlert('상세 내역 페이지로 이동합니다.');
            // window.location.href = `history-detail.html?id=${historyId}`;
        });
    });
}

/**
 * 재호출/재예약/취소 버튼 설정
 */
function setupActionButtons() {
    const actionBtns = document.querySelectorAll('.history-action-btn.secondary');
    if (actionBtns.length === 0) return;
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            
            // 예약 취소
            if (btnText.includes('취소')) {
                if (confirm('예약을 취소하시겠습니까?')) {
                    // 실제로는 서버에 취소 요청을 보내고 UI 업데이트
                    showAlert('예약이 취소되었습니다.');
                    this.closest('.history-card').querySelector('.history-status').textContent = '취소됨';
                    this.closest('.history-card').querySelector('.history-status').className = 'history-status cancelled';
                    this.textContent = '재예약';
                }
            } 
            // 재호출/재예약
            else {
                const isEmergency = this.closest('.history-card').querySelector('.history-type').classList.contains('emergency');
                if (isEmergency) {
                    window.location.href = 'emergency.html';
                } else {
                    window.location.href = 'reservation.html';
                }
            }
        });
    });
    
    // 빈 상태의 홈으로 이동 버튼
    const goHomeBtn = document.querySelector('.empty-state .history-action-btn');
    if (goHomeBtn) {
        goHomeBtn.addEventListener('click', function() {
            window.location.href = 'customer-app.html';
        });
    }
}

/**
 * 빈 상태 확인
 */
function checkEmptyState() {
    const historyCards = document.querySelectorAll('.history-card');
    const emptyState = document.querySelector('.empty-state');
    const activeTab = document.querySelector('.tab-item.active');
    
    if (!emptyState || historyCards.length === 0 || !activeTab) return;
    
    const tabType = activeTab.getAttribute('data-tab');
    let hasItems = false;
    
    historyCards.forEach(card => {
        const cardType = card.querySelector('.history-type').classList.contains('emergency') ? 'emergency' : 'reservation';
        if (tabType === 'all' || tabType === cardType) {
            if (window.getComputedStyle(card).display !== 'none') {
                hasItems = true;
            }
        }
    });
    
    emptyState.style.display = hasItems ? 'none' : 'flex';
} 