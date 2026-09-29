// Cognitive Focus & 5-Brain Games Engine with Supabase Sync
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Guard
    const { data: { session }, error: sessionError } = await window.sb.auth.getSession();
    if (!session || sessionError) {
        window.location.href = '../auth/login.html';
        return;
    }

    const user = session.user;
    const gameAlert = document.getElementById('gameAlert');

    function showAlert(message, type = 'success') {
        if (!gameAlert) return;
        gameAlert.className = 'alert alert-${type} py-2 px-3 small';
        gameAlert.textContent = message;
        gameAlert.classList.remove('d-none');
        setTimeout(() => gameAlert.classList.add('d-none'), 3500);
    }

    // Save Game Score & Award XP in Supabase
    async function recordScore(gameTitle, scoreAchieved, xpEarned) {
        showAlert('Great job! ${gameTitle} finished. Score: ${scoreAchieved} (+${xpEarned} XP)', 'success');
        try {
            await window.sb.from('game_logs').insert({
                user_id: user.id,
                game_type: gameTitle,
                score: scoreAchieved,
                xp_awarded: xpEarned
            });
        } catch (err) {
            console.error('Failed to log game score:', err);
        }
    }

    /* -------------------------------------------------------------
       GAME 1: Memory Match Game (Card Pairing)
    ------------------------------------------------------------- */
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryRestartBtn = document.getElementById('memoryRestartBtn');
    const memoryMovesEl = document.getElementById('memoryMoves');
    const ICONS = ['fa-brain', 'fa-bolt', 'fa-fire', 'fa-heart', 'fa-star', 'fa-gem'];
    let flippedCards = [], matchedPairs = 0, memoryMoves = 0;

    function initMemoryGame() {
        if (!memoryGrid) return;
        memoryGrid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        memoryMoves = 0;
        if (memoryMovesEl) memoryMovesEl.textContent = '0';

        const deck = [...ICONS, ...ICONS].sort(() => 0.5 - Math.random());
        deck.forEach((icon, idx) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'btn btn-glass p-3 memory-card fs-3 text-secondary';
            card.dataset.icon = icon;
            card.dataset.idx = idx;
            card.innerHTML = <i class="fa-solid ${card.dataset.icon} text-warning"></i>;
            card.addEventListener('click', () => onCardClick(card));
            memoryGrid.appendChild(card);
        });
    }

    function onCardClick(card) {
        if (flippedCards.length === 2 || card.classList.contains('matched') || card.classList.contains('flipped')) return;
        
        card.classList.add('flipped');
        card.innerHTML = <i class="fa-solid ${card.dataset.icon} text-warning"></i>;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            memoryMoves++;
            if (memoryMovesEl) memoryMovesEl.textContent = memoryMoves;
            const [c1, c2] = flippedCards;

            if (c1.dataset.icon === c2.dataset.icon) {
                c1.classList.add('matched', 'btn-success');
                c2.classList.add('matched', 'btn-success');
                matchedPairs++;
                flippedCards = [];
                if (matchedPairs === ICONS.length) {
                    const finalScore = Math.max(10, 100 - (memoryMoves * 4));
                    recordScore('Memory Match Game', finalScore, 25);
                }
            } else {
                setTimeout(() => {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    c1.innerHTML = '<i class="fa-solid fa-question"></i>';
                    c2.innerHTML = '<i class="fa-solid fa-question"></i>';
                    flippedCards = [];
                }, 800);
            }
        }
    }
    if (memoryRestartBtn) memoryRestartBtn.addEventListener('click', initMemoryGame);

    /* -------------------------------------------------------------
       GAME 2: Number Recall Challenge (Digit Span Memory)
    ------------------------------------------------------------- */
    const numDisplay = document.getElementById('numDisplay');
    const numInputSection = document.getElementById('numInputSection');
    const numInput = document.getElementById('numInput');
    const numSubmitBtn = document.getElementById('numSubmitBtn');
    const numStartBtn = document.getElementById('numStartBtn');
    const numLevelEl = document.getElementById('numLevel');
    let numCurrentLevel = 4;
    let generatedSequence = '';

    function startNumberRecall() {
        generatedSequence = '';
        for (let i = 0; i < numCurrentLevel; i++) {
            generatedSequence += Math.floor(Math.random() * 10);
        }
        if (numInputSection) numInputSection.classList.add('d-none');
        if (numDisplay) {
            numDisplay.textContent = generatedSequence;
            numDisplay.classList.remove('d-none');
        }
        if (numStartBtn) numStartBtn.disabled = true;

        setTimeout(() => {
            if (numDisplay) numDisplay.classList.add('d-none');
            if (numInputSection) {
                numInputSection.classList.remove('d-none');
                numInput.value = '';
                numInput.focus();
            }
        }, 2200);
    }

    if (numSubmitBtn) {
        numSubmitBtn.addEventListener('click', () => {
            const userVal = numInput.value.trim();
            if (userVal === generatedSequence) {
                showAlert('Correct! Advancing to ${numCurrentLevel + 1} digits.', 'success');
                numCurrentLevel++;
                if (numLevelEl) numLevelEl.textContent =' ${numCurrentLevel} Digits';
                recordScore('Number Recall Challenge', numCurrentLevel * 10, 15);
            } else {
                showAlert('Incorrect! The sequence was ${generatedSequence}. Try again!', 'danger');
                numCurrentLevel = 4;
                if (numLevelEl) numLevelEl.textContent = '4 Digits';
            }
            if (numStartBtn) numStartBtn.disabled = false;
            if (numInputSection) numInputSection.classList.add('d-none');
        });
    }
    if (numStartBtn) numStartBtn.addEventListener('click', startNumberRecall);

    /* -------------------------------------------------------------
       GAME 3: Focus Challenge (Stroop Color Conflict)
    ------------------------------------------------------------- */
    const stroopWord = document.getElementById('stroopWord');
    const stroopScoreEl = document.getElementById('stroopScore');
    const stroopTimerEl = document.getElementById('stroopTimer');
    const stroopStartBtn = document.getElementById('stroopStartBtn');
    const stroopButtons = document.querySelectorAll('.stroop-btn');
    const COLORS = [
        { name: 'RED', css: 'text-danger', hex: 'red' },
        { name: 'BLUE', css: 'text-primary', hex: 'blue' },
        { name: 'GREEN', css: 'text-success', hex: 'green' },
        { name: 'YELLOW', css: 'text-warning', hex: 'yellow' }
    ];
    let stroopScore = 0, stroopTimer = 20, stroopInterval = null, activeColor = null;

    function nextStroopQuestion() {
        const wordObj = COLORS[Math.floor(Math.random() * COLORS.length)];
        const inkObj = COLORS[Math.floor(Math.random() * COLORS.length)];
        activeColor = inkObj.name;

        stroopWord.textContent = wordObj.name;
        stroopWord.className = 'display-4 fw-bold mb-4 ${inkObj.css}';
    }

    function startFocusChallenge() {
        stroopScore = 0;
        stroopTimer = 20;
        if (stroopScoreEl) stroopScoreEl.textContent = '0';
        if (stroopTimerEl) stroopTimerEl.textContent = '20s';
        if (stroopStartBtn) stroopStartBtn.disabled = true;

        nextStroopQuestion();
        clearInterval(stroopInterval);
        stroopInterval = setInterval(() => {
            stroopTimer--;
            if (stroopTimerEl) stroopTimerEl.textContent =' ${stroopTimer}s';
            if (stroopTimer <= 0) {
                clearInterval(stroopInterval);
                recordScore('Focus Challenge', stroopScore * 10, 20);
                if (stroopStartBtn) stroopStartBtn.disabled = false;
                stroopWord.textContent = 'Game Over!';
                stroopWord.className = 'display-4 fw-bold mb-4 text-secondary';
            }
        }, 1000);
    }

    stroopButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (stroopTimer <= 0) return;
            if (btn.dataset.color === activeColor) {
                stroopScore++;
                if (stroopScoreEl) stroopScoreEl.textContent = stroopScore;
            }
            nextStroopQuestion();
        });
    });
    if (stroopStartBtn) stroopStartBtn.addEventListener('click', startFocusChallenge);

    /* -------------------------------------------------------------
       GAME 4: Reaction Time Test
    ------------------------------------------------------------- */
    const reactionBox = document.getElementById('reactionBox');
    const reactionText = document.getElementById('reactionText');
    const reactionScoreEl = document.getElementById('reactionScore');
    let reactionStartTime = 0, reactionTimeout = null, reactionState = 'idle';

    if (reactionBox) {
        reactionBox.addEventListener('click', () => {
            if (reactionState === 'idle') {
                reactionState = 'waiting';
                reactionBox.style.backgroundColor = '#dc3545';
                reactionText.textContent = 'Wait for GREEN...';

                const randomDelay = Math.floor(Math.random() * 3000) + 1500;
                reactionTimeout = setTimeout(() => {
                    reactionState = 'ready';
                    reactionStartTime = Date.now();
                    reactionBox.style.backgroundColor = '#198754';
                    reactionText.textContent = 'CLICK NOW!';
                }, randomDelay);

            } else if (reactionState === 'waiting') {
                clearTimeout(reactionTimeout);
                reactionState = 'idle';
                reactionBox.style.backgroundColor = 'transparent';
                reactionText.textContent = 'Too early! Click to try again.';
            } else if (reactionState === 'ready') {
                const reactionMs = Date.now() - reactionStartTime;
                reactionState = 'idle';
                reactionBox.style.backgroundColor = 'transparent';
                reactionText.textContent = '${reactionMs} ms! Click to test again.';
                if (reactionScoreEl) reactionScoreEl.textContent = '${reactionMs} ms';
                const finalScore = Math.max(10, Math.round(500 - reactionMs));
                recordScore('Reaction Time Test', finalScore, 20);
            }
        });
    }

    /* -------------------------------------------------------------
       GAME 5: Pattern Recognition (Simon Sequence)
    ------------------------------------------------------------- */
    const simonTiles = document.querySelectorAll('.simon-tile');
    const simonStartBtn = document.getElementById('simonStartBtn');
    const simonRoundEl = document.getElementById('simonRound');
    let simonSequence = [], playerSequence = [], simonRound = 0;

    function nextSimonRound() {
        playerSequence = [];
        simonRound++;
        if (simonRoundEl) simonRoundEl.textContent = simonRound;

        const nextTile = Math.floor(Math.random() * 4);
        simonSequence.push(nextTile);
        playSequence();
    }

    function playSequence() {
        let i = 0;
        const interval = setInterval(() => {
            flashTile(simonSequence[i]);
            i++;
            if (i >= simonSequence.length) clearInterval(interval);
        }, 600);
    }

    function flashTile(idx) {
        const tile = simonTiles[idx];
        if (!tile) return;
        tile.classList.add('border', 'border-white', 'shadow-lg');
        tile.style.filter = 'brightness(2)';
        setTimeout(() => {
            tile.classList.remove('border', 'border-white', 'shadow-lg');
            tile.style.filter = 'brightness(1)';
        }, 300);
    }

    simonTiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            if (simonSequence.length === 0) return;
            flashTile(index);
            playerSequence.push(index);

            const currStep = playerSequence.length - 1;
            if (playerSequence[currStep] !== simonSequence[currStep]) {
                showAlert('Pattern missed at round ${simonRound}! Try again.', 'danger');
                recordScore('Pattern Recognition Game', simonRound * 15, 20);
                simonSequence = [];
                simonRound = 0;
                if (simonRoundEl) simonRoundEl.textContent = '0';
                if (simonStartBtn) simonStartBtn.disabled = false;
                return;
            }

            if (playerSequence.length === simonSequence.length) {
                showAlert('Pattern matched! Next round...', 'success');
                setTimeout(nextSimonRound, 800);
            }
        });
    });

    if (simonStartBtn) {
        simonStartBtn.addEventListener('click', () => {
            simonSequence = [];
            simonRound = 0;
            simonStartBtn.disabled = true;
            nextSimonRound();
        });
    }

    // Initialize Memory game on load
    initMemoryGame();
});