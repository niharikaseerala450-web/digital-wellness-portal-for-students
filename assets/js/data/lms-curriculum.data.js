/**
 * AuraGrowth 42-Phase Full-Stack Web Engineering Master Curriculum
 * Database: Modules 1 & 2 (Phases 0 to 5)
 */
window.AURA_LMS = window.AURA_LMS || {};

window.AURA_LMS['fullstack'] = {
    title: 'Full-Stack Web Engineering (Phases 0 – 42)',
    subtitle: 'From Internet basics and modern JavaScript to distributed system design, Docker containers, and interview prep.',
    weeks: [
        // ==========================================
        // MODULE 1: PHASES 0, 1 & 2
        // ==========================================
        {
            weekId: 'fs-mod-1',
            title: 'Module 1: Foundations, Web Mechanics, HTML5 & Modern CSS (Phases 0–2)',
            lessons: [
                {
                    id: 'fs-m1-l1',
                    title: 'Phase 0: Computer Systems, Networking & Browser Runtime',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Computer & Internet Fundamentals</h5>
                            <p class="text-secondary small">Understanding how physical bytes travel across networks and render on client viewports prevents architectural bugs.</p>
                            <div class="glass-panel p-3 border-secondary mb-3">
                                <ul class="text-secondary small ps-3 mb-0">
                                    <li><b>OS & Environment Variables:</b> PATH variables, terminal processes, port bindings, and directory traversal.</li>
                                    <li><b>DNS & 3-Way Handshake:</b> Client requests trigger DNS resolution (Root &rarr; TLD &rarr; Authoritative Name Server) followed by a TCP SYN &rarr; SYN-ACK &rarr; ACK handshake.</li>
                                    <li><b>TCP vs UDP:</b> TCP guarantees stateful in-order packet delivery (HTTP/HTTPS); UDP transmits connectionless datagrams with zero delivery guarantees (VoIP, WebRTC).</li>
                                    <li><b>HTTP Request/Response Anatomy:</b> Headers, Status Codes (1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error), Cookies, and Cache-Control.</li>
                                    <li><b>CORS (Cross-Origin Resource Sharing):</b> Browser security mechanism where cross-origin fetch calls trigger an HTTP <code>OPTIONS</code> preflight check before execution.</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'fs-m1-l2',
                    title: 'Phase 1: Semantic HTML5, Forms, Accessibility (A11y) & SEO',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. Production HTML Architecture</h5>
                            <p class="text-secondary small">Never build applications using nested unstyled <code>&lt;div&gt;</code> elements. Screen readers, keyboard navigation tools, and search crawlers rely on semantic landmarks.</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>&lt;!-- Production Accessible Form with Constraints --&gt;
&lt;main id="main-content" role="main"&gt;
    &lt;article aria-labelledby="form-heading"&gt;
        &lt;h1 id="form-heading"&gt;Student Account Registration&lt;/h1&gt;
        &lt;form action="/api/v1/register" method="POST" novalidate&gt;
            &lt;div class="form-group mb-3"&gt;
                &lt;label for="userEmail"&gt;Institutional Email&lt;/label&gt;
                &lt;input 
                    type="email" 
                    id="userEmail" 
                    name="email" 
                    required 
                    autocomplete="email"
                    aria-describedby="emailNote"
                /&gt;
                &lt;small id="emailNote" class="text-secondary"&gt;Verification token sent here.&lt;/small&gt;
            &lt;/div&gt;
            &lt;button type="submit" class="btn btn-primary"&gt;Create Profile&lt;/button&gt;
        &lt;/form&gt;
    &lt;/article&gt;
&lt;/main&gt;</code></pre>
                            <div class="p-3 bg-dark border border-secondary rounded">
                                <b class="text-white small">Phase 1 Project Deliverable:</b>
                                <p class="text-secondary small mb-0">Build a fully accessible Personal Portfolio using strictly semantic HTML5 (header, nav, main, article, section, aside, footer) with zero CSS, passing full keyboard Tab navigation.</p>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'fs-m1-l3',
                    title: 'Phase 2: Modern CSS, Box Model, Flexbox, Grid & Compositor Animations',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Box Model & Fluid Design Math</h5>
                            <p class="text-secondary small">Set <code>box-sizing: border-box</code> globally to prevent padding and borders from inflating defined element dimensions.</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>/* Universal Reset & Fluid Typography */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --fluid-heading: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
}

/* 2D Responsive Grid without Media Queries */
.dashboard-matrix {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* GPU Compositor-Only Animation (60-120 FPS, No Reflow) */
.smooth-sidebar {
    transform: translate3d(-100%, 0, 0);
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}</code></pre>
                            <div class="p-3 bg-dark border border-secondary rounded">
                                <b class="text-white small">Phase 2 Project Deliverables:</b>
                                <p class="text-secondary small mb-0">Build a responsive Landing Page, a Netflix-style streaming card carousel, and an E-Commerce product catalog with CSS Grid and Container Queries.</p>
                            </div>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 1 Assessment: Computer Basics, HTML5 & CSS3',
                questions: [
                    {
                        q: 'Why does animating CSS transform properties yield 60-120 FPS performance compared to animating left or margin?',
                        options: [
                            'Transforms convert CSS into JavaScript bytecode',
                            'Transforms are handled directly by the GPU compositor layer, bypassing layout reflow and repaint phases',
                            'Transforms force the browser to disable CORS',
                            'Transforms automatically delete unused CSS rules'
                        ],
                        correct: 1,
                        explanation: 'Properties like transform and opacity execute on GPU compositing layers, avoiding CPU-heavy recalculations of the layout geometry.'
                    },
                    {
                        q: 'What is the exact purpose of the HTTP OPTIONS preflight request in CORS?',
                        options: [
                            'To download images before rendering HTML',
                            'To query foreign server permissions and verify allowed methods/headers before dispatching state-modifying cross-origin payloads',
                            'To clear server RAM caches',
                            'To compress cookies with gzip'
                        ],
                        correct: 1,
                        explanation: 'The browser dispatches OPTIONS to ensure the target server explicitly permits cross-origin communication before transmitting real data.'
                    }
                ]
            }
        },

        // ==========================================
        // MODULE 2: PHASES 3, 4 & 5
        // ==========================================
        {
            weekId: 'fs-mod-2',
            title: 'Module 2: Complete JavaScript Core, V8 Engine & Projects (Phases 3–5)',
            lessons: [
                {
                    id: 'fs-m2-l1',
                    title: 'Phase 3 & 4: V8 Memory Heap, Call Stack, Scopes, Closures & OOP',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Execution Contexts & Closures</h5>
                            <p class="text-secondary small">V8 compiles JavaScript into machine code. Memory is partitioned into the Call Stack (execution frames) and the Memory Heap (dynamic reference objects).</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>// Production Closure: State Factory with Private Encapsulation
function createDataVault(initialToken) {
    let _token = initialToken; // Private variable trapped inside lexical scope

    return {
        getToken(authKey) {
            if (authKey === 'SECRET_2026') return _token;
            throw new Error('Access Denied');
        },
        rotateToken(authKey, newToken) {
            if (authKey === 'SECRET_2026') {
                _token = newToken;
                return true;
            }
            return false;
        }
    };
}

const vault = createDataVault('aura_live_token_77');
console.log(vault.getToken('SECRET_2026')); // Accessible
// console.log(vault._token); // Undefined (Private state protected from leaks)</code></pre>
                        </div>
                    `
                },
                {
                    id: 'fs-m2-l2',
                    title: 'Phase 4 (Deep Dive): The Event Loop, Microtasks & Async/Await',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. Event Loop Queue Priority</h5>
                            <ol class="text-secondary small ps-3 mb-3">
                                <li><b>Call Stack:</b> Executes all synchronous statements.</li>
                                <li><b>Microtask Queue:</b> <code>Promise.then()</code>, <code>catch()</code>, <code>async/await</code>, and <code>queueMicrotask()</code>. Drained completely the instant the stack clears!</li>
                                <li><b>Macrotask Queue:</b> <code>setTimeout</code>, <code>setInterval</code>, and DOM event callbacks.</li>
                            </ol>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>// Resilient Fetch with Timeout and Exponential Retry Backoff
async function resilientFetch(url, retries = 3, delay = 300) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(\HTTP \${res.status}\);
            return await res.json();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
        }
    }
}</code></pre>
                            <div class="p-3 bg-dark border border-secondary rounded">
                                <b class="text-white small">Phase 5 Project Deliverables:</b>
                                <p class="text-secondary small mb-0">Build 8 Vanilla JavaScript Applications: Todo App, Scientific Calculator, Live Weather App (REST Fetch), Interactive Quiz Engine, Expense Tracker, Movie Search Engine, Shopping Cart with localStorage, and a Markdown Notes App.</p>
                            </div>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 2 Assessment: JavaScript Engine, Closures & Async',
                questions: [
                    {
                        q: 'If a Promise resolves at the same millisecond a setTimeout(0) expires, which one executes first?',
                        options: [
                            'setTimeout(0) because it was registered in the timer thread',
                            'The Promise callback because the Microtask queue takes absolute priority over the Macrotask queue',
                            'They run on multi-threaded parallel cores simultaneously',
                            'The browser halts with a race condition error'
                        ],
                        correct: 1,
                        explanation: 'V8 always empties the microtask queue completely following stack clearance before checking the macrotask queue.'
                    }
                ]
            }
        },
        // ==========================================
        // MODULE 3: PHASES 6, 7, 8 & 9
        // ==========================================
        {
            weekId: 'fs-mod-3',
            title: 'Module 3: Git, React 19 Ecosystem, State & TypeScript (Phases 6–9)',
            lessons: [
                {
                    id: 'fs-m3-l1',
                    title: 'Phase 6: Professional Git Workflows & Collaborative GitHub',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Enterprise Git Branching Pipeline</h5>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code># 1. Clone repository and spawn feature branch
git clone https://github.com/org/auragrowth-lms.git
cd auragrowth-lms
git checkout -b feature/jwt-token-rotation

# 2. Stage changes and commit with Conventional Commits
git add .
git commit -m "feat(auth): integrate HttpOnly cookie refresh rotation"

# 3. Synchronize with upstream and push
git pull --rebase origin main
git push -u origin feature/jwt-token-rotation</code></pre>
                        </div>
                    `
                },
                {
                    id: 'fs-m3-l2',
                    title: 'Phases 7, 8 & 9: React 19, Custom Hooks, Zustand & TypeScript',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. React Architecture & State Hierarchy</h5>
                            <p class="text-secondary small">Isolate state effectively: <b>Local State</b> (useState), <b>Global State</b> (Zustand / Redux Toolkit), and <b>Server State</b> (TanStack Query for cache invalidation).</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>// Strongly-Typed React 19 Custom Hook in TypeScript
import { useState, useEffect } from 'react';

interface StudentMetric {
    id: string;
    xp: number;
    streakDays: number;
}

export function useStudentMetrics(studentId: string) {
    const [data, setData] = useState&lt;StudentMetric | null&gt;(null);
    const [loading, setLoading] = useState&lt;boolean&gt;(true);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const res = await fetch(\/api/v1/students/\${studentId}\);
                const json: StudentMetric = await res.json();
                if (isMounted) setData(json);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => { isMounted = false; }; // Cleanup guard against memory leaks
    }, [studentId]);

    return { data, loading };
}</code></pre>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 3 Assessment: Git, React & TypeScript',
                questions: [
                    {
                        q: 'Why does TanStack Query replace global state managers (like Redux) for managing remote API data?',
                        options: [
                            'Because Redux is illegal in modern JavaScript',
                            'TanStack Query automatically handles caching, background re-fetching, deduplication, and server synchronization out of the box',
                            'TanStack Query converts React into TypeScript',
                            'It compiles code faster on Linux'
                        ],
                        correct: 1,
                        explanation: 'Server state has distinct caching, invalidation, and deduplication requirements that traditional client-side global stores handle poorly.'
                    }
                ]
            }
        },

        // ==========================================
        // MODULE 4: PHASES 10, 11, 12, 13, 14, 15 & 18
        // ==========================================
        {
            weekId: 'fs-mod-4',
            title: 'Module 4: Node.js, Express, REST APIs, SQL, PostgreSQL & NoSQL (Phases 10–15, 18)',
            lessons: [
                {
                    id: 'fs-m4-l1',
                    title: 'Phases 10, 11, 12 & 18: Node.js, Express, REST Standards & Zod Validation',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Layered Backend Architecture</h5>
                            <p class="text-secondary small">Enforce clean separation: <code>Route &rarr; Validation Middleware &rarr; Controller &rarr; Service &rarr; Database</code>.</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>const express = require('express');
const { z } = require('zod');
const app = express();
app.use(express.json());

// Strict Schema Validation
const HabitSchema = z.object({
    title: z.string().min(3).max(100),
    frequency: z.enum(['daily', 'weekly']),
    targetMinutes: z.number().positive()
});

const validateBody = (schema) => (req, res, next) => {
    try {
        req.validatedBody = schema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ error: err.errors });
    }
};

app.post('/api/habits', validateBody(HabitSchema), async (req, res) => {
    // Controller logic safely consumes req.validatedBody
    res.status(201).json({ success: true, habit: req.validatedBody });
});</code></pre>
                        </div>
                    `
                },
                {
                    id: 'fs-m4-l2',
                    title: 'Phases 13, 14 & 15: SQL, PostgreSQL 3NF, Joins, ORM (Prisma) & MongoDB',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. Relational PostgreSQL vs NoSQL MongoDB</h5>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>-- Relational Integrity: Foreign Key Constraints & Cascading Deletions
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    progress_pct INT DEFAULT 0
);

-- ACID Transaction: Both updates succeed or both rollback
BEGIN;
UPDATE public.enrollments SET progress_pct = 100 WHERE student_id = 'c4b8b6c4-0000-0000-0000-000000000001';
INSERT INTO public.physical_activities (user_id, xp_earned) VALUES ('c4b8b6c4-0000-0000-0000-000000000001', 50);
COMMIT;</code></pre>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 4 Assessment: Backend APIs, SQL & Relational Models',
                questions: [
                    {
                        q: 'Under what circumstances is PostgreSQL preferable over MongoDB in enterprise systems?',
                        options: [
                            'When the data is completely unstructured JSON without relationships',
                            'When data demands strict relational schemas, complex cross-table joins, and ACID transactional guarantees',
                            'When disk space must be saved by skipping backups',
                            'When you want to avoid writing SQL queries'
                        ],
                        correct: 1,
                        explanation: 'PostgreSQL provides strict schema integrity, referential foreign keys, and atomic transactions, preventing orphaned data records.'
                    }
                ]
            }
        },
        // ==========================================
        // MODULE 5: PHASES 16, 17, 19–25 & 31–34
        // ==========================================
        {
            weekId: 'fs-mod-5',
            title: 'Module 5: Security, Auth, Testing, Performance & Real-Time (Phases 16–25, 31–34)',
            lessons: [
                {
                    id: 'fs-m5-l1',
                    title: 'Phases 16, 17, 19, 20 & 21: Auth, OWASP, Uploads, Email & Stripe Payments',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Enterprise Auth & Defense in Depth</h5>
                            <ul class="text-secondary small ps-3 mb-3">
                                <li><b>JWT & Refresh Token Rotation:</b> Short-lived (15 min) access tokens stored in memory; refresh tokens stored in secure, HttpOnly, SameSite=Strict cookies. On refresh, invalidate old tokens to prevent replay attacks.</li>
                                <li><b>OWASP Top 10 Mitigation:</b> Defense against XSS (CSP headers, HTML sanitization), CSRF (anti-CSRF tokens, SameSite cookies), and SQL/NoSQL Injection (parameterized queries).</li>
                                <li><b>Payments & Webhooks (Stripe):</b> Never store raw card numbers. Generate checkout sessions client-side and process fulfilled orders strictly via cryptographically-signed server webhooks.</li>
                            </ul>
                        </div>
                    `
                },
                {
                    id: 'fs-m5-l2',
                    title: 'Phases 22–25 & 31–34: Testing, Performance, Redis Caching, WebSockets & Next.js',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. Testing Pyramid & Multi-Tier Caching</h5>
                            <p class="text-secondary small">Combine <b>Unit Tests</b> (Jest/Vitest), <b>API Integration Tests</b> (Supertest), and <b>End-to-End Tests</b> (Playwright). Protect databases by placing Redis caching in front of heavy read paths.</p>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code>// Production Redis Caching Strategy Pattern
async function getStudentDashboardMetrics(userId) {
    const cacheKey = \metrics:student:\${userId}\;
    const cached = await redis.get(cacheKey);

    if (cached) {
        return JSON.parse(cached); // Cache Hit: Instant response (~2ms)
    }

    // Cache Miss: Query PostgreSQL and populate cache with 60-second TTL
    const metrics = await db.query('SELECT * FROM user_metrics WHERE user_id = $1', [userId]);
    await redis.setex(cacheKey, 60, JSON.stringify(metrics.rows[0]));
    return metrics.rows[0];
}</code></pre>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 5 Assessment: Security, Testing & Performance',
                questions: [
                    {
                        q: 'Why must Stripe payment fulfillment logic rely strictly on server-side Webhooks rather than client-side redirects?',
                        options: [
                            'Client-side redirects are slower than webhooks',
                            'Malicious users can forge client-side redirect URLs without completing actual payments; webhooks verify cryptographically signed events directly from Stripe servers',
                            'Webhooks run in the browser console',
                            'Stripe prohibits client-side redirects'
                        ],
                        correct: 1,
                        explanation: 'Webhooks are authenticated via HMAC cryptographic signatures sent directly from the payment provider to your server, preventing client payment spoofing.'
                    }
                ]
            }
        },

        // ==========================================
        // MODULE 6: PHASES 26–30 & 35–42
        // ==========================================
        {
            weekId: 'fs-mod-6',
            title: 'Module 6: DevOps, Docker, System Design, DSA & Career Preparation (Phases 26–42)',
            lessons: [
                {
                    id: 'fs-m6-l1',
                    title: 'Phases 26–30: Production Deployment, Linux, Docker, CI/CD & Cloud',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-warning fw-bold mb-3">1. Production Multi-Stage Dockerization</h5>
                            <pre class="bg-dark border border-secondary p-3 rounded text-success small mb-3"><code># Stage 1: Build Container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal Distroless Production Server
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>
                        </div>
                    `
                },
                {
                    id: 'fs-m6-l2',
                    title: 'Phases 35–42: Scalable System Design, DSA, Major Projects & Interview Prep',
                    content: `
                        <div class="learning-section mb-4">
                            <h5 class="text-info fw-bold mb-3">1. System Design Architecture for Millions of Users</h5>
                            <div class="p-3 bg-dark border border-secondary rounded mb-3">
                                <span class="text-warning fw-semibold small">DNS (Route53) &rarr; CDN (Cloudflare) &rarr; Load Balancer (Nginx) &rarr; Stateless App Servers &rarr; Redis Cache &rarr; PostgreSQL (Primary/Replica)</span>
                            </div>
                            <ul class="text-secondary small ps-3 mb-3">
                                <li><b>Horizontal Scaling & Statelessness:</b> Never store session state inside web server RAM. Offload sessions to Redis, enabling instances to scale dynamically behind load balancers.</li>
                                <li><b>Database Sharding & Replicas:</b> Route heavy read queries to Read Replicas while directing atomic writes to the Primary instance.</li>
                                <li><b>Core DSA & Big-O Mastery:</b> Master Hash Maps ($O(1)$ lookup), Balanced Trees ($O(\log N)$ search), Two Pointers, Dynamic Programming, and Graph Traversals (BFS/DFS).</li>
                            </ul>
                            <div class="p-3 bg-dark border border-secondary rounded">
                                <b class="text-white small">Phase 38 Major Projects Portfolio Requirement:</b>
                                <p class="text-secondary small mb-0">Build 5 production-grade applications: (1) Full-Stack E-Commerce Platform with Stripe, (2) Real-Time Social Media Network with WebSockets, (3) Student Management LMS with Supabase/PostgreSQL RLS, (4) Job Portal with resume parsing, and (5) Your flagship production project with unit test coverage, CI/CD, and live deployment.</p>
                            </div>
                        </div>
                    `
                }
            ],
            quiz: {
                title: 'Module 6 Final Certification Exam: System Design & Career Mastery',
                questions: [
                    {
                        q: 'In large-scale system design, why must web application servers be kept strictly stateless?',
                        options: [
                            'Stateless servers don’t require database access',
                            'Stateless servers allow any request to be routed to any server instance by a load balancer, enabling seamless horizontal scaling without session loss',
                            'Stateless servers run on Linux only',
                            'Stateless servers eliminate the need for Docker containers'
                        ],
                        correct: 1,
                        explanation: 'Stateless servers store session data externally (e.g. in Redis), allowing instances to be created or destroyed dynamically without disrupting active users.'
                    },
                    {
                        q: 'Which database design strategy directs read-heavy analytics traffic away from the primary transactional database instance?',
                        options: ['Master-Replica Read Replication', 'Vertical RAM Expansion', 'Converting SQL to HTML', 'Client-side LocalStorage'],
                        correct: 0,
                        explanation: 'Read replicas asynchronously mirror the primary database, absorbing heavy SELECT query traffic so transactional writes execute without blocking.'
                    }
                ]
            }
        }
    ]
};
