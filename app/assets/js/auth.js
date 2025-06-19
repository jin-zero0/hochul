// 인증 관련 공통 함수들
class AuthManager {
    constructor() {
        this.init();
    }
    
    init() {
        // 페이지 로드 시 로그인 상태 확인
        this.checkLoginStatus();
    }
    
    // 로그인 상태 확인
    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userInfo = localStorage.getItem('userInfo');
        const appType = localStorage.getItem('appType');
        
        if (!isLoggedIn || isLoggedIn !== 'true' || !userInfo || !appType) {
            // 로그인되지 않은 상태라면 로그인 페이지로 리다이렉트
            this.redirectToLogin();
            return false;
        }
        
        // 로그인 정보가 유효한지 확인
        try {
            const user = JSON.parse(userInfo);
            if (!user.id || !user.nickname) {
                throw new Error('Invalid user info');
            }
            
            // 로그인 시간이 24시간을 초과했는지 확인
            const loginTime = new Date(user.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                // 24시간이 지났다면 자동 로그아웃
                this.logout();
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('사용자 정보 파싱 오류:', error);
            this.logout();
            return false;
        }
    }
    
    // 현재 페이지가 올바른 앱 타입인지 확인
    checkAppType(expectedAppType) {
        const appType = localStorage.getItem('appType');
        
        // 데모 모드에서는 앱 타입 체크를 건너뛰고 자동으로 설정
        const userInfo = this.getUserInfo();
        if (userInfo && userInfo.id === 'demo_user') {
            if (appType !== expectedAppType) {
                // 데모 모드에서는 자동으로 올바른 앱 타입으로 설정
                localStorage.setItem('appType', expectedAppType);
                userInfo.appType = expectedAppType;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
            return true;
        }
        
        // 운영자는 모든 페이지에 접근 가능
        if (appType === 'admin') {
            return true;
        }
        
        if (appType !== expectedAppType) {
            alert('잘못된 접근입니다. 올바른 앱으로 이동합니다.');
            
            if (appType === 'customer') {
                window.location.href = 'home.html';
            } else if (appType === 'driver') {
                window.location.href = 'driver.html';
            } else {
                this.redirectToLogin();
            }
            return false;
        }
        
        return true;
    }
    
    // 사용자 정보 가져오기
    getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                return JSON.parse(userInfo);
            } catch (error) {
                console.error('사용자 정보 파싱 오류:', error);
                return null;
            }
        }
        return null;
    }
    
    // 로그아웃
    logout() {
        // Kakao 로그아웃
        if (window.Kakao && Kakao.Auth) {
            Kakao.Auth.logout(() => {
                console.log('카카오 로그아웃 완료');
            });
        }
        
        // 로컬 스토리지 정리
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('appType');
        
        // 로그인 페이지로 이동
        this.redirectToLogin();
    }
    
    // 로그인 페이지로 리다이렉트
    redirectToLogin() {
        window.location.href = 'login.html';
    }
    
    // 사용자 프로필 정보를 헤더에 표시
    displayUserProfile(containerId) {
        const userInfo = this.getUserInfo();
        const container = document.getElementById(containerId);
        
        if (userInfo && container) {
            const profileHtml = `
                <div class="user-profile d-flex align-items-center">
                    <div class="user-avatar me-2">
                        ${userInfo.profile_image ? 
                            `<img src="${userInfo.profile_image}" alt="프로필" class="rounded-circle" width="32" height="32">` :
                            `<div class="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; background: #ff3b30; color: white; font-size: 14px; font-weight: bold;">${userInfo.nickname.charAt(0)}</div>`
                        }
                    </div>
                    <div class="user-info">
                        <div class="user-name" style="font-size: 14px; font-weight: 600; color: white;">${userInfo.nickname}</div>
                        <div class="user-type" style="font-size: 12px; opacity: 0.8; color: white;">${userInfo.appType === 'customer' ? '고객' : '기사'}</div>
                    </div>
                    <button class="btn btn-sm btn-outline-light ms-2" onclick="authManager.logout()" style="font-size: 12px; padding: 4px 8px;">
                        <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            `;
            container.innerHTML = profileHtml;
        }
    }
    
    // 로그인 시간 업데이트 (활동 시 세션 연장)
    updateLoginTime() {
        const userInfo = this.getUserInfo();
        if (userInfo) {
            userInfo.loginTime = new Date().toISOString();
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    }
}

// 전역 인스턴스 생성
const authManager = new AuthManager();

// 페이지 활동 감지하여 세션 연장
let activityTimer;
function resetActivityTimer() {
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        authManager.updateLoginTime();
    }, 5 * 60 * 1000); // 5분마다 세션 연장
}

// 사용자 활동 이벤트 리스너
document.addEventListener('click', resetActivityTimer);
document.addEventListener('keypress', resetActivityTimer);
document.addEventListener('scroll', resetActivityTimer);
document.addEventListener('mousemove', resetActivityTimer);

// 초기 타이머 설정
resetActivityTimer(); 