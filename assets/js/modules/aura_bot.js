// Floating Chat Widget Engine (AuraBot Assistant)
(function() {
    function injectWidget() {
        var style = document.createElement('style');
        style.innerHTML = `
            #aura-bot-launcher {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6366f1, #06b6d4);
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                cursor: pointer;
                box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
                z-index: 1050;
                transition: transform 0.2s ease;
            }
            #aura-bot-launcher:hover { transform: scale(1.08); }
            #aura-chat-window {
                position: fixed;
                bottom: 92px;
                right: 24px;
                width: 360px;
                max-width: calc(100vw - 48px);
                height: 480px;
                border-radius: 16px;
                background: rgba(15, 23, 42, 0.94);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
                display: none;
                flex-direction: column;
                z-index: 1050;
                overflow: hidden;
            }
            #aura-chat-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                font-size: 13.5px;
                color: #f1f5f9;
            }
            .chat-bubble {
                padding: 10px 14px;
                border-radius: 12px;
                margin-bottom: 10px;
                line-height: 1.45;
                max-width: 85%;
            }
            .chat-user {
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: #ffffff;
                margin-left: auto;
                border-bottom-right-radius: 2px;
            }
            .chat-bot {
                background: rgba(255, 255, 255, 0.08);
                color: #e2e8f0;
                margin-right: auto;
                border-bottom-left-radius: 2px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .bot-chip {
                display: inline-block;
                padding: 4px 10px;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                font-size: 11.5px;
                color: #38bdf8;
                cursor: pointer;
                margin: 2px;
            }
            .bot-chip:hover { background: rgba(56, 189, 248, 0.15); }
        `;
        document.head.appendChild(style);

        var container = document.createElement('div');
        container.innerHTML = `
            <div id="aura-bot-launcher" title="AuraBot Study AI">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div id="aura-chat-window">
                <div class="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center" style="background: rgba(255,255,255,0.03);">
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle p-1 bg-primary text-white d-flex align-items-center justify-content-center" style="width:28px; height:28px;">
                            <i class="fa-solid fa-brain small"></i>
                        </div>
                        <div>
                            <h6 class="mb-0 fw-bold text-white small">AuraBot Assistant</h6>
                            <small class="text-success" style="font-size: 10px;">● Online</small>
                        </div>
                    </div>
                    <button id="aura-close-btn" class="btn btn-sm text-secondary p-0"><i class="fa-solid fa-xmark fs-6"></i></button>
                </div>

                <div id="aura-chat-messages">
                    <div class="chat-bubble chat-bot">
                        Hi student! I'm AuraBot, your local study & wellness buddy. How can I guide you today?
                    </div>
                    <div class="mb-3">
                        <span class="bot-chip" onclick="window.sendAuraPrompt('How to practice DSA?')">💡 DSA Guide</span>
                        <span class="bot-chip" onclick="window.sendAuraPrompt('I feel stressed with exams')">🧘 Exam Stress</span>
                        <span class="bot-chip" onclick="window.sendAuraPrompt('How to build study habits?')">🎯 Habit Tips</span>
                    </div>
                </div>

                <form id="aura-chat-form" class="p-2 border-top border-secondary border-opacity-25 d-flex gap-2">
                    <input type="text" id="aura-user-input" class="form-control form-control-sm bg-transparent text-white border-secondary" placeholder="Ask AuraBot..." autocomplete="off">
                    <button type="submit" class="btn btn-primary btn-sm px-3"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        `;
        document.body.appendChild(container);

        var launcher = document.getElementById('aura-bot-launcher');
        var win = document.getElementById('aura-chat-window');
        var closeBtn = document.getElementById('aura-close-btn');
        var form = document.getElementById('aura-chat-form');
        var input = document.getElementById('aura-user-input');
        var msgBox = document.getElementById('aura-chat-messages');

        launcher.onclick = function() {
            var isHidden = win.style.display === 'none' || win.style.display === '';
            win.style.display = isHidden ? 'flex' : 'none';
        };

        closeBtn.onclick = function() { win.style.display = 'none'; };

        function appendMessage(sender, text) {
            var bubble = document.createElement('div');
            bubble.className = 'chat-bubble ' + (sender === 'user' ? 'chat-user' : 'chat-bot');
            bubble.innerHTML = text;
            msgBox.appendChild(bubble);
            msgBox.scrollTop = msgBox.scrollHeight;
        }

        // Built-in Knowledge Base fallback
        var builtInKnowledge = {
            intents: [
                {
                    keywords: ['dsa', 'algorithm', 'leetcode', 'array', 'tree', 'graph', 'data structure'],
                    reply: 'DSA preparation ki daily consistency chaala important!<br><br>' +
                           '📌 <b>Recommended Path:</b><br>' +
                           '1. Arrays & Two Pointers nunchi start cheyandi.<br>' +
                           '2. Recursion & Sliding Window concepts master cheyandi.<br>' +
                           '3. Trees & Graph traversals practice cheyandi.<br><br>' +
                           '👉 Check our <a href="roadmaps.html" class="text-info fw-bold">Core CS & DSA Roadmap</a>!'
                },
                {
                    keywords: ['web', 'fullstack', 'frontend', 'backend', 'html', 'css', 'react', 'node', 'javascript'],
                    reply: 'Full Stack Developer journey ki neat path idhi:<br><br>' +
                           '🌐 <b>Roadmap:</b><br>' +
                           '1. HTML5, Modern CSS & JavaScript ES6+ foundations.<br>' +
                           '2. Node.js backend APIs & Supabase/PostgreSQL database.<br>' +
                           '3. React.js state management & full project deployment.<br><br>' +
                           '👉 Check our <a href="roadmaps.html" class="text-info fw-bold">Full Stack Roadmap</a>!'
                },
                {
                    keywords: ['stress', 'anxious', 'anxiety', 'tired', 'burnout', 'headache', 'tension', 'relax'],
                    reply: 'Exam stress & study overload unnapudu chinna reset teesukondi:<br><br>' +
                           '🧘 <b>Quick Relief:</b><br>' +
                           '• 2-minutes <i>Nadi Shodhana Pranayama</i> try cheyandi.<br>' +
                           '• Follow 20-20-20 rule: screen nunchi 20 seconds pakkaki chudandi.<br><br>' +
                           '👉 Go to <a href="wellness.html" class="text-success fw-bold">Wellness Suite</a> to launch guided routines!'
                },
                {
                    keywords: ['habit', 'streak', 'routine', 'consistency', 'discipline'],
                    reply: 'Habits build cheyadam lo consistency key!<br><br>' +
                           '🎯 <b>Tip:</b> "2-minute rule" follow avvandi — chinna task tho start cheste streak break avvakunda maintain cheyachu.<br><br>' +
                           '👉 Check your streak at <a href="habits.html" class="text-warning fw-bold">Habit Tracker</a>.'
                },
                {
                    keywords: ['hi', 'hello', 'hey', 'namaste', 'start'],
                    reply: 'Hello! Nenu mee AuraGrowth AI Study Buddy 🤖.<br><br>' +
                           'Nenu meeku coding roadmaps, study habits, focus tips, mariyu wellness guidance ivvagalanoo. Above prompt chips click cheyandi leda question adagandi!'
                }
            ],
            defaultReply: 'Nenu ee topic meedha inka update avtunanu! Kinda unna topics lo help adagandi:<br>' +
                          '• <b>DSA & Coding Roadmaps</b><br>' +
                          '• <b>Habit Building & Streaks</b><br>' +
                          '• <b>Stress & Yoga Guidance</b>'
        };

        function getBotResponse(userQuery) {
            var q = userQuery.toLowerCase();
            var kb = window.AuraBotKnowledge || builtInKnowledge;
            
            for (var i = 0; i < kb.intents.length; i++) {
                var item = kb.intents[i];
                for (var k = 0; k < item.keywords.length; k++) {
                    if (q.includes(item.keywords[k])) {
                        return item.reply;
                    }
                }
            }
            return kb.defaultReply;
        }

        window.sendAuraPrompt = function(promptText) {
            appendMessage('user', promptText);
            
            var indicator = document.createElement('div');
            indicator.className = 'chat-bubble chat-bot';
            indicator.id = 'aura-typing-indicator';
            indicator.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i> AuraBot is thinking...';
            msgBox.appendChild(indicator);
            msgBox.scrollTop = msgBox.scrollHeight;

            setTimeout(function() {
                var indEl = document.getElementById('aura-typing-indicator');
                if (indEl) indEl.remove();

                var reply = getBotResponse(promptText);
                appendMessage('bot', reply);
            }, 350);
        };

        form.onsubmit = function(e) {
            e.preventDefault();
            var txt = input.value.trim();
            if (!txt) return;
            input.value = '';
            window.sendAuraPrompt(txt);
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }
})();