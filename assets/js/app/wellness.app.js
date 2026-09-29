// Wellness Survey Scoring Logic & Supabase Sync
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Guard
    const { data: { session }, error: sessionError } = await window.sb.auth.getSession();
    if (!session || sessionError) {
        window.location.href = '../auth/login.html';
        return;
    }

    const user = session.user;
    const surveyForm = document.getElementById('wellnessForm');
    const surveyAlert = document.getElementById('surveyAlert');
    const historyContainer = document.getElementById('historyContainer');
    const computedScoreBadge = document.getElementById('computedScoreBadge');

    // 2. Score Calculation Algorithm (0-100 scale)
    function calculateWellnessScore(sleepHours, screenHours, studyHours, waterGlasses, stressLevel) {
        let score = 50; // baseline

        // Sleep Evaluation (7-9 hrs ideal)
        if (sleepHours >= 7 && sleepHours <= 9) score += 20;
        else if (sleepHours === 6 || sleepHours === 10) score += 10;
        else score -= 10;

        // Screen Time Evaluation (lower is better for wellness)
        if (screenHours <= 3) score += 15;
        else if (screenHours <= 6) score += 5;
        else score -= 15;

        // Hydration Evaluation (8+ glasses ideal)
        if (waterGlasses >= 8) score += 10;
        else if (waterGlasses >= 5) score += 5;
        else score -= 5;

        // Stress Level (1-10 inverted)
        score += (10 - stressLevel) * 1.5;

        // Bound between 0 and 100
        return Math.min(100, Math.max(0, Math.round(score)));
    }

    // 3. Form Submit Handler
    if (surveyForm) {
        surveyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = surveyForm.querySelector('button[type="submit"]');

            const sleepHours = parseFloat(document.getElementById('sleepHours').value);
            const screenHours = parseFloat(document.getElementById('screenHours').value);
            const studyHours = parseFloat(document.getElementById('studyHours').value);
            const waterGlasses = parseInt(document.getElementById('waterGlasses').value, 10);
            const stressLevel = parseInt(document.getElementById('stressLevel').value, 10);
            const mood = document.getElementById('mood').value;
            const reflection = document.getElementById('reflection').value.trim();

            const score = calculateWellnessScore(sleepHours, screenHours, studyHours, waterGlasses, stressLevel);

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Saving Log...';

            try {
                const { error } = await window.sb
                    .from('wellness_logs')
                    .insert({
                        user_id: user.id,
                        sleep_hours: sleepHours,
                        screen_hours: screenHours,
                        study_hours: studyHours,
                        water_intake: waterGlasses,
                        stress_level: stressLevel,
                        mood: mood,
                        reflection_notes: reflection,
                        computed_score: score
                    });

                if (error) throw error;

               if (computedScoreBadge) {
        computedScoreBadge.textContent =' ${score}/100';
        computedScoreBadge.className = score >= 70 ? 'badge bg-success fs-6' : score >= 50 ? 'badge bg-warning text-dark fs-6' : 'badge bg-danger fs-6';
    }

    showAlert('Entry saved! Todays Wellness Score :${score}/100', 'success');
    surveyForm.reset();
    loadRecentLogs();

            } catch (err) {
                showAlert(err.message || 'Failed to submit log. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Submit Daily Log';
            }
        });
    }

    function showAlert(message, type = 'danger') {
        if (!surveyAlert) return;
        surveyAlert.className =' alert alert-${type} py-2 px-3 small';
        surveyAlert.textContent = message;
        surveyAlert.classList.remove('d-none');
    }

    // 4. Fetch Past 5 Logs
    async function loadRecentLogs() {
        if (!historyContainer) return;
        historyContainer.innerHTML = '<div class="text-center py-3 text-secondary"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';

        try {
            const { data: logs, error } = await window.sb
                .from('wellness_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;

            if (!logs || logs.length === 0) {
                historyContainer.innerHTML = '<p class="text-secondary small text-center my-3">No logs submitted yet. Complete your first survey above!</p>';
                return;
            }

            historyContainer.innerHTML = logs.map(item => `
                <div class="glass-card p-3 mb-2 d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-semibold">${new Date(item.created_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                        <small class="text-secondary">Sleep: ${item.sleep_hours}h | Screen: ${item.screen_hours}h | Mood: ${item.mood || 'Neutral'}</small>
                    </div>
                    <span class="badge ${item.computed_score >= 70 ? 'bg-success' : item.computed_score >= 50 ? 'bg-warning text-dark' : 'bg-danger'} px-3 py-2">
                        ${item.computed_score || 0} / 100
                    </span>
                </div>
            `).join('');

        } catch (err) {
            historyContainer.innerHTML = <p class="text-danger small text-center">${err.message || 'Failed to load history.'}</p>;
        }
    }

    loadRecentLogs();
});