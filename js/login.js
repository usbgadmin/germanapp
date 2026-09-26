/**
 * GermanApp Online — Login Logic Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const pwdToggleIcon = document.getElementById('pwdToggleIcon');
    const pwdToggleLabel = document.getElementById('pwdToggleLabel');
    const customGoogleBtn = document.getElementById('customGoogleBtn');
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // Web Audio Synthesis Helper (matches platform Audio Context)
    const playSound = (type = 'click') => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.08);
                osc.frequency.setValueAtTime(783.99, now + 0.16);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'error') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(280, now);
                osc.frequency.setValueAtTime(200, now + 0.1);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
                osc.start(now);
                osc.stop(now + 0.28);
            } else {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            }
        } catch (e) {
            // Fallback for browsers with restricted AudioContext
        }
    };

    // Helper: Show Toast Notification
    const showToast = (msg, isError = false) => {
        if (!toastNotification || !toastMessage) return;
        toastMessage.textContent = msg;
        toastNotification.classList.remove('hidden');
        toastNotification.classList.add('flex');

        if (isError) {
            toastNotification.classList.replace('border-brand-yellow', 'border-brand-coral');
        } else {
            toastNotification.classList.replace('border-brand-coral', 'border-brand-yellow');
        }

        setTimeout(() => {
            toastNotification.classList.add('hidden');
            toastNotification.classList.remove('flex');
        }, 3000);
    };

    // Toggle Password Visibility
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            playSound('click');
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';

            if (pwdToggleIcon) {
                pwdToggleIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
            }
            if (pwdToggleLabel) {
                pwdToggleLabel.textContent = isPassword ? 'Hide' : 'Show';
            }
        });
    }

    // Form Submit Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                playSound('error');
                showToast('Please fill in both username and password.', true);
                return;
            }

            playSound('success');

            // Save user session details
            const userRole = (username === 'admin' || username === 'teacher') ? 'admin' : 'student';
            localStorage.setItem('germanapp_user', JSON.stringify({
                username: username,
                role: userRole,
                loginTime: new Date().toISOString()
            }));

            showToast(`Willkommen, ${username}! Redirecting...`);

            // Route based on role
            setTimeout(() => {
                if (userRole === 'admin') {
                    window.location.href = 'admin-portal.html';
                } else {
                    window.location.href = 'student-portal.html';
                }
            }, 1000);
        });
    }

    // Google Sign-In Button Handler
    if (customGoogleBtn) {
        customGoogleBtn.addEventListener('click', () => {
            playSound('click');
            showToast('Initializing Google Sign-In...');
            
            // Trigger Google OAuth Client if SDK is loaded
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.prompt();
            } else {
                // Fallback simulation for offline/preview mode
                setTimeout(() => {
                    playSound('success');
                    localStorage.setItem('germanapp_user', JSON.stringify({
                        username: 'Google User',
                        role: 'student',
                        loginTime: new Date().toISOString()
                    }));
                    showToast('Authenticated via Google! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'student-portal.html';
                    }, 1000);
                }, 800);
            }
        });
    }
});