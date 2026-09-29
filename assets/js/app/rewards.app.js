// Gamification, XP Aggregator & Badge Unlocking Logic
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Guard
    const { data: { session }, error: sessionError } = await window.sb.auth.getSession();
    if (!session || sessionError) {
        window.location.href = '../auth/login.html';
        return;
    }

    const user = session.user;
    const userLevelEl = document.getElementById('userLevel');
    const totalXpEl = document.getElementById('totalXp');
    const nextLevelXpEl = document.getElementById('nextLevelXp');
    const levelProgressBar = document.getElementById('levelProgressBar');
    const badgesContainer = document.getElementById('badgesContainer');
    const activityLogContainer = document.getElementById('activityLogContainer');

    // Badge Definitions
    const BADGES_CONFIG = [
        {
            id: 'first_step',
            title: 'First Step',
            icon: 'fa-shoe-prints',
            description: 'Log your first daily wellness survey.',
            check: (data) => data.wellnessCount >= 1
        },
        {
            id: 'zen_master',
            title: 'Zen Master',
            icon: 'fa-spa',
            description: 'Log 5 or more wellness checks.',
            check: (data) => data.wellnessCount >= 5
        },
        {
            id: 'habit_builder',
            title: 'Habit Builder',
            icon: 'fa-bullseye',
            description: 'Track at least 3 active habits.',
            check: (data) => data.habitsCount >= 3
        },
        {
            id: 'brain_sharpener',
            title: 'Brain Sharpener',
            icon: 'fa-brain',
            description: 'Play 3 cognitive focus brain games.',
            check: (data) => data.gamesCount >= 3
        },
        {
            id: 'career_pathfinder',
            title: 'Pathfinder',
            icon: 'fa-compass',
            description: 'Complete at least 2 career roadmap milestones.',
            check: (data) => data.milestonesCount >= 2
        },
        {
            id: 'xp_warrior',
            title: 'XP Warrior',
            icon: 'fa-trophy',
            description: 'Reach 200 total XP points across modules.',
            check: (data) => data.totalXp >= 200
        }
    ];

    async function loadGamificationData() {
        try {
            // Parallel Fetch of Logs & Activities
            const [wellnessRes, habitsRes, gamesRes, roadmapsRes] = await Promise.all([
                window.sb.from('wellness_logs').select('id, computed_score, created_at').eq('user_id', user.id),
                window.sb.from('habits').select('id, streak_count, completed_today').eq('user_id', user.id),
                window.sb.from('game_logs').select('id, game_type, score, xp_awarded, created_at').eq('user_id', user.id),
                window.sb.from('user_roadmaps').select('id, is_completed').eq('user_id', user.id).eq('is_completed', true)
            ]);

            const wellnessLogs = wellnessRes.data || [];
            const habits = habitsRes.data || [];
            const gameLogs = gamesRes.data || [];
            const completedMilestones = roadmapsRes.data || [];

            // XP Computation Logic
            // 20 XP per wellness entry, 15 XP per habit streak, actual XP earned from brain games, 30 XP per milestone
            let xp = 0;
            xp += wellnessLogs.length * 20;
            habits.forEach(h => { xp += (h.streak_count || 0) * 15; });
            gameLogs.forEach(g => { xp += (g.xp_awarded || 15); });
            xp += completedMilestones.length * 30;

            // Level Calculation (Every 100 XP is 1 Level)
            const level = Math.floor(xp / 100) + 1;
            const currentLevelFloor = (level - 1) * 100;
            const nextLevelTarget = level * 100;
            const progressPercent = Math.min(100, Math.round(((xp - currentLevelFloor) / 100) * 100));

            // Render Level Headers
            if (userLevelEl) userLevelEl.textContent =' Level ${level}';
            if (totalXpEl) totalXpEl.textContent =' ${xp} XP';
            if (nextLevelXpEl) nextLevelXpEl.textContent =' ${nextLevelTarget} XP';
            if (levelProgressBar) {
                levelProgressBar.style.width =' ${progressPercent}%';
                levelProgressBar.textContent =' ${progressPercent}%';
            }

            // Stats object for badge validation
            const userStats = {
                wellnessCount: wellnessLogs.length,
                habitsCount: habits.length,
                gamesCount: gameLogs.length,
                milestonesCount: completedMilestones.length,
                totalXp: xp
            };

            renderBadges(userStats);
            renderRecentActivity(gameLogs, wellnessLogs);

        } catch (err) {
            console.error('Error loading gamification stats:', err);
        }
    }

    function renderBadges(stats) {
        if (!badgesContainer) return;
        badgesContainer.innerHTML = BADGES_CONFIG.map(badge => {
            const isUnlocked = badge.check(stats);
            return `
                <div class="col-sm-6 col-md-4">
                    <div class="glass-card p-3 text-center h-100 ${isUnlocked ? 'border border-warning border-opacity-50' : 'opacity-50'}">
                        <div class="glass-panel p-3 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                            <i class="fa-solid ${badge.icon} fs-3 ${isUnlocked ? 'text-warning' : 'text-secondary'}"></i>
                        </div>
                        <h6 class="fw-bold mb-1 ${isUnlocked ? 'text-white' : 'text-secondary'}">${badge.title}</h6>
                        <p class="text-secondary small mb-2">${badge.description}</p>
                        <span class="badge ${isUnlocked ? 'bg-success' : 'bg-secondary-subtle text-secondary'}">
                            ${isUnlocked ? '<i class="fa-solid fa-unlock me-1"></i> Unlocked' : '<i class="fa-solid fa-lock me-1"></i> Locked'}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderRecentActivity(games, wellness) {
        if (!activityLogContainer) return;
        const activities = [];

        games.forEach(g => {
            activities.push({
                type: 'game',
                title: 'Played ${g.game_type}',
                reward:' +${g.xp_awarded || 15} XP',
                date: new Date(g.created_at || Date.now())
            });
        });

        wellness.forEach(w => {
            activities.push({
                type: 'wellness',
                title: 'Logged Daily Wellness Check',
                reward: '+20 XP',
                date: new Date(w.created_at || Date.now())
            });
        });

        activities.sort((a, b) => b.date - a.date);

        if (activities.length === 0) {
            activityLogContainer.innerHTML = '<p class="text-secondary small text-center my-3">No activity recorded yet. Play a brain game or submit a wellness log!</p>';
            return;
        }

        activityLogContainer.innerHTML = activities.slice(0, 6).map(act => `
            <div class="glass-card p-3 mb-2 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-3">
                    <i class="fa-solid ${act.type === 'game' ? 'fa-gamepad text-info' : 'fa-heart-pulse text-danger'} fs-5"></i>
                    <div>
                        <div class="fw-semibold small">${act.title}</div>
                        <small class="text-secondary">${act.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                </div>
                <span class="badge bg-warning text-dark fw-bold">${act.reward}</span>
            </div>
        `).join('');
    }

    loadGamificationData();
});