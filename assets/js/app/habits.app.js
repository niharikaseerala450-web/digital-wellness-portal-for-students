// Habit & Daily Goal Tracker Logic with Supabase Sync
document.addEventListener('DOMContentLoaded', async function() {
    console.log("Habits JS loaded successfully!");

    // 1. Session check with safe fallback
    var user = null;
    try {
        if (window.sb && window.sb.auth) {
            var { data } = await window.sb.auth.getSession();
            if (data && data.session) {
                user = data.session.user;
                console.log("Current User logged in:", user.id);
            }
        }
    } catch (e) {
        console.warn("Session check warning:", e);
    }

    if (!user) {
        console.warn("No active session found. Redirecting or checking local session...");
    }

    var habitList = document.getElementById('habitList');
    var addHabitForm = document.getElementById('addHabitForm');
    var habitTitleInput = document.getElementById('habitTitle');
    var habitCategorySelect = document.getElementById('habitCategory');
    var habitAlert = document.getElementById('habitAlert');

    function showAlert(msg, type) {
        if (!habitAlert) return;
        habitAlert.className = 'alert alert-' + (type || 'success') + ' py-2 px-3 small';
        habitAlert.textContent = msg;
        habitAlert.classList.remove('d-none');
        setTimeout(function() { habitAlert.classList.add('d-none'); }, 3500);
    }

    function getTodayDateString() {
        var d = new Date();
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    // 2. Fetch and display habits
    async function loadHabits() {
        console.log("Fetching habits from database...");
        try {
            var query = window.sb.from('habits').select('*').order('created_at', { ascending: false });
            if (user) {
                query = query.eq('user_id', user.id);
            }

            var { data: habits, error } = await query;

            if (error) {
                console.error("Supabase load error:", error);
                throw error;
            }

            console.log("Habits received:", habits);
            renderHabits(habits || []);
        } catch (err) {
            console.error('Failed to load habits:', err);
            showAlert('Could not load habits list', 'danger');
        }
    }

    function renderHabits(habits) {
        if (!habitList) {
            console.error("habitList element not found in HTML! Check id='habitList'");
            return;
        }

        if (habits.length === 0) {
            habitList.innerHTML = '<div class="text-secondary text-center my-4 p-3 border border-secondary border-opacity-25 rounded">No active habits yet. Add your first habit above!</div>';
            return;
        }

        var todayStr = getTodayDateString();

        habitList.innerHTML = habits.map(function(h) {
            var isDoneToday = (h.last_completed_at === todayStr) || h.completed_today;
            var streak = h.streak_count || 0;

            return (
                '<div class="card bg-dark border-secondary p-3 mb-3 d-flex flex-row justify-content-between align-items-center text-white">' +
                    '<div class="d-flex align-items-center gap-3">' +
                        '<button class="btn btn-sm ' + (isDoneToday ? 'btn-success' : 'btn-outline-secondary') + ' check-habit-btn" ' +
                            'data-id="' + h.id + '" ' + (isDoneToday ? 'disabled' : '') + '>' +
                            '<i class="fa-solid ' + (isDoneToday ? 'fa-check-double' : 'fa-check') + '"></i>' +
                        '</button>' +
                        '<div>' +
                            '<div class="fw-semibold ' + (isDoneToday ? 'text-decoration-line-through text-secondary' : 'text-white') + '">' +
                                h.title +
                            '</div>' +
                            '<span class="badge bg-secondary text-white">' + (h.category || 'General') + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex align-items-center gap-3">' +
                        '<div class="text-end">' +
                            '<span class="badge ' + (streak > 0 ? 'bg-warning text-dark' : 'bg-secondary text-light') + ' px-2 py-1">' +
                                '<i class="fa-solid fa-fire me-1"></i>' + streak + ' Day' + (streak === 1 ? '' : 's') +
                            '</span>' +
                            '<div class="small text-secondary mt-1">' + (isDoneToday ? 'Completed today' : 'Pending') + '</div>' +
                        '</div>' +
                        '<button class="btn btn-link text-danger p-0 delete-habit-btn" data-id="' + h.id + '">' +
                            '<i class="fa-solid fa-trash-can"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>'
            );
        }).join('');

        attachActionListeners();
    }

    function attachActionListeners() {
        document.querySelectorAll('.check-habit-btn').forEach(function(btn) {
            btn.onclick = async function() {
                var habitId = btn.getAttribute('data-id');
                btn.disabled = true;

                try {
                    var { data, error } = await window.sb.rpc('maintain_habit_streak', {
                        target_habit_id: habitId,
                        user_auth_id: user ? user.id : null
                    });

                    if (error) throw error;
                    showAlert(data.message || 'Streak updated!', 'success');
                    loadHabits();
                } catch (err) {
                    console.error('Streak update error:', err);
                    showAlert('Failed to update streak', 'danger');
                    btn.disabled = false;
                }
            };
        });

        document.querySelectorAll('.delete-habit-btn').forEach(function(btn) {
            btn.onclick = async function() {
                if (!confirm('Are you sure you want to delete this habit?')) return;
                var habitId = btn.getAttribute('data-id');

                try {
                    var { error } = await window.sb
                        .from('habits')
                        .delete()
                        .eq('id', habitId);

                    if (error) throw error;
                    showAlert('Habit deleted', 'success');
                    loadHabits();
                } catch (err) {
                    console.error('Failed to delete habit:', err);
                    showAlert('Error deleting habit', 'danger');
                }
            };
        });
    }

    // 3. Add Habit Event
    if (addHabitForm) {
        addHabitForm.onsubmit = async function(e) {
            e.preventDefault();
            var title = habitTitleInput.value.trim();
            var category = habitCategorySelect ? habitCategorySelect.value : 'Study';

            if (!title) return;

            if (!user) {
                alert("Please log in first to save habits!");
                return;
            }

            try {
                console.log("Adding new habit for user:", user.id);
                var { data, error } = await window.sb.from('habits').insert([
                    {
                        user_id: user.id,
                        title: title,
                        category: category,
                        streak_count: 0,
                        completed_today: false,
                        last_completed_at: null
                    }
                ]).select();

                if (error) {
                    console.error("Insert error:", error);
                    throw error;
                }

                console.log("Insert success:", data);
                habitTitleInput.value = '';
                showAlert('New habit created!', 'success');
                loadHabits();
            } catch (err) {
                console.error('Error inserting habit:', err);
                showAlert('Failed to create habit: ' + (err.message || ''), 'danger');
            }
        };
    } else {
        console.error("addHabitForm not found! Check if form has id='addHabitForm'");
    }

    loadHabits();
});