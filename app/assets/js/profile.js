/**
 * 민간구급차 실시간 배차/호출 플랫폼 - 프로필 페이지 JavaScript
 */

// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 프로필 수정 버튼
    setupEditProfileButton();
    
    // 메뉴 아이템 클릭 이벤트
    setupMenuItems();
    
    // 토글 스위치 이벤트
    setupToggleSwitches();
    
    // 로그아웃 버튼
    setupLogoutButton();
});

/**
 * 프로필 수정 버튼 설정
 */
function setupEditProfileButton() {
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (!editProfileBtn) return;
    
    editProfileBtn.addEventListener('click', function() {
        // 프로필 수정 페이지로 이동 (실제 구현 시)
        showAlert('프로필 수정 페이지로 이동합니다.');
        // window.location.href = 'profile-edit.html';
    });
}

/**
 * 메뉴 아이템 클릭 이벤트 설정
 */
function setupMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length === 0) return;
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 토글 스위치가 있는 메뉴는 클릭 이벤트 처리하지 않음
            if (this.querySelector('.toggle-switch')) return;
            
            // 값만 표시하는 메뉴는 클릭 이벤트 처리하지 않음
            if (this.querySelector('.menu-value') && !this.querySelector('.menu-arrow')) return;
            
            const title = this.querySelector('.menu-title').textContent;
            
            // 메뉴별 페이지 이동 (실제 구현 시)
            switch (title) {
                case '개인정보 관리':
                    showAlert('개인정보 관리 페이지로 이동합니다.');
                    // window.location.href = 'profile-info.html';
                    break;
                case '결제 수단 관리':
                    showAlert('결제 수단 관리 페이지로 이동합니다.');
                    // window.location.href = 'payment-methods.html';
                    break;
                case '기본 의료 정보':
                    showAlert('기본 의료 정보 페이지로 이동합니다.');
                    // window.location.href = 'medical-info.html';
                    break;
                case '자주 가는 병원':
                    showAlert('자주 가는 병원 관리 페이지로 이동합니다.');
                    // window.location.href = 'favorite-hospitals.html';
                    break;
                case '자주 묻는 질문':
                    showAlert('FAQ 페이지로 이동합니다.');
                    // window.location.href = 'faq.html';
                    break;
                case '이용약관':
                    showAlert('이용약관 페이지로 이동합니다.');
                    // window.location.href = 'terms.html';
                    break;
                case '개인정보 처리방침':
                    showAlert('개인정보 처리방침 페이지로 이동합니다.');
                    // window.location.href = 'privacy.html';
                    break;
                default:
                    break;
            }
        });
    });
}

/**
 * 토글 스위치 이벤트 설정
 */
function setupToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    if (toggleSwitches.length === 0) return;
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const menuTitle = this.closest('.menu-item').querySelector('.menu-title').textContent;
            const isChecked = this.checked;
            
            // 설정 값 저장 (실제 구현 시)
            // saveSetting(menuTitle, isChecked);
            
            showAlert(`${menuTitle}이(가) ${isChecked ? '활성화' : '비활성화'}되었습니다.`);
        });
    });
}

/**
 * 로그아웃 버튼 설정
 */
function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('정말 로그아웃 하시겠습니까?')) {
            // 로그아웃 처리 (실제 구현 시)
            // logout();
            
            showAlert('로그아웃 되었습니다.');
            // 로그인 페이지로 이동
            // window.location.href = 'login.html';
        }
    });
} 