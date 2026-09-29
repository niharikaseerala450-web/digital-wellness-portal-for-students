// Student Dashboard Logic & Session Guard
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Guard: Check if user is logged in
    const { data: { session }, error: sessionError } = await window.sb.auth.getSession();

    if (!session || sessionError) {
        // Not logged in -> kick back to login page
        window.location.href = '../auth/login.html';
        return;
    }

    const user = session.user;
    const userEmailEl = document.getElementById('userEmail');
    const userNameEl = document.getElementById('userName');
    const userAvatarEl = document.getElementById('userAvatar');

    // 2. Load Profile Data from 'profiles' table
    try {
        const { data: profile, error: profileError } = await window.sb
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profile) {
            if (userNameEl) userNameEl.textContent = profile.full_name || 'Student';
            if (userEmailEl) userEmailEl.textContent = profile.email || user.email;
            if (userAvatarEl && profile.avatar_url) {
                userAvatarEl.src = profile.avatar_url;
            }
        }
    } catch (err) {
        console.error('Error fetching profile:', err);
    }

    // 3. Logout Handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await window.sb.auth.signOut();
            window.location.href = '../auth/login.html';
        });
    }

    // 4. Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('data-theme');
            const next = active === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
});