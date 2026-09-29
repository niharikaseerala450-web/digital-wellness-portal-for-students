// Authentication Logic with Supabase Client
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');
    const authAlert = document.getElementById('authAlert');

    function showAlert(message, type = 'danger') {
        if (!authAlert) return;
        authAlert.className = 'alert alert-${type} py-2 px-3 small';
        authAlert.textContent = message;
        authAlert.classList.remove('d-none');
    }

    // 1. User Registration
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const submitBtn = registerForm.querySelector('button[type="submit"]');

            if (password !== confirmPassword) {
                showAlert('Passwords do not match!');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Creating account...';

            try {
                const { data, error } = await window.sb.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: {
                            full_name: fullName
                        }
                    }
                });

                if (error) throw error;

                showAlert('Registration successful! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);

            } catch (err) {
                showAlert(err.message || 'Error signing up. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Account';
            }
        });
    }

    // 2. User Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Logging in...';

            try {
                const { data, error } = await window.sb.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                showAlert('Login successful! Welcome back.', 'success');
                setTimeout(() => {
                    // Logged in students will navigate to student dashboard
                    window.location.assign('../student/dashboard.html');
                }, 1200);

            } catch (err) {
                showAlert(err.message || 'Invalid login credentials.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Log In';
            }
        });
    }

    // 3. Password Reset
    if (forgotForm) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const submitBtn = forgotForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending link...';

            try {
                const { data, error } = await window.sb.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/pages/auth/login.html'
                });

                if (error) throw error;

                showAlert('Password reset link has been sent to your email!', 'success');
            } catch (err) {
                showAlert(err.message || 'Unable to send reset email.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Reset Link';
            }
        });
    }
});