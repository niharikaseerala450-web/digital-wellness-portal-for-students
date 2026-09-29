// Static Knowledge Base for AuraBot Assistant
window.AuraBotKnowledge = {
    intents: [
        {
            keywords: ['dsa', 'algorithm', 'data structure', 'leetcode', 'array', 'tree', 'graph'],
            reply: `DSA preparation ki consistent practice chaala important!<br><br>
            📌 <b>Recommended Path:</b><br>
            1. Arrays & Hashing nunchi start cheyandi.<br>
            2. Two Pointers & Sliding Window master cheyandi.<br>
            3. Recursion and Backtracking practice cheyandi.<br><br>
            👉 Mana <a href="roadmaps.html" class="text-info fw-bold">Core CS & DSA Roadmap</a> lo weekly modules check cheyandi!`
        },
        {
            keywords: ['web', 'fullstack', 'frontend', 'backend', 'html', 'css', 'react', 'node'],
            reply: `Full Stack Developer avvadaniki 3-phase journey follow avvandi:<br><br>
            🌐 <b>Phases:</b><br>
            1. HTML5, Modern CSS, JavaScript ES6+ foundations.<br>
            2. Node.js/Express APIs & Supabase/PostgreSQL database.<br>
            3. React.js with full state management.<br><br>
            👉 Check our <a href="roadmaps.html" class="text-info fw-bold">Full Stack Roadmap</a> to track progress.`
        },
        {
            keywords: ['stress', 'anxious', 'anxiety', 'tired', 'burnout', 'headache', 'tension'],
            reply: `Study stress ni manage cheyadam chaala avasaram. Relax avvadaniki konchem break theesukondi.<br><br>
            🧘 <b>Quick Relief:</b><br>
            • 2 mins <i>Nadi Shodhana Pranayama</i> try cheyandi.<br>
            • Screen chudadam aapi, doora ga unna objects ni 20 seconds chudandi.<br><br>
            👉 Visit <a href="wellness.html" class="text-success fw-bold">Wellness Suite</a> to launch a guided session!`
        },
        {
            keywords: ['habit', 'streak', 'routine', 'consistency', 'discipline'],
            reply: `Habits build cheyadam lo consistency key!<br><br>
            🎯 <b>Rule:</b> "2-minute rule" follow avvandi — start cheyatam easy ga unte daily continue cheyachu.<br><br>
            👉 Check your daily habits at <a href="habits.html" class="text-warning fw-bold">Habit Tracker</a>.`
        },
        {
            keywords: ['hi', 'hello', 'hey', 'namaste', 'start'],
            reply: `Hello! Nenu mee AuraGrowth AI Study Buddy 🤖.<br><br>
            Nenu meeku coding roadmaps, study habits, focus tips, mariyu wellness guidance ivvagalanoo. Kinda unna quick prompts click cheyandi leda mee question type cheyandi!`
        }
    ],
    defaultReply: `Nenu ee topic meedha inka nerchukuntunnanu! Kinda unna topics lo help adagandi:<br>
    • <b>DSA & Coding Roadmaps</b><br>
    • <b>Habit Building & Streaks</b><br>
    • <b>Stress & Yoga Guidance</b>`
};