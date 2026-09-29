// Career Roadmaps & Milestone Detailed Learning Drawer Engine
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Session Guard
    const { data: { session }, error: sessionError } = await window.sb.auth.getSession();
    if (!session || sessionError) {
        window.location.href = '../auth/login.html';
        return;
    }

    const user = session.user;
    const roadmapContainer = document.getElementById('roadmapContainer');
    const roadmapAlert = document.getElementById('roadmapAlert');

    // Topic Details & Curated Learning Paths
    const ROADMAP_DATA = [
        {
            id: 'fullstack-web',
            title: 'Full Stack Web Developer',
            icon: 'fa-code',
            category: 'Software Engineering',
            description: 'Master frontend fundamentals, modern JavaScript, backend APIs, and database design.',
            milestones: [
                { 
                    id: 'fs-1', 
                    title: 'HTML5 Semantic Markup & CSS3 Responsive Layouts',
                    summary: 'Learn clean DOM structures, accessibility (ARIA), Flexbox, CSS Grid, and responsive design for all device viewports.',
                    resources: [
                        { name: 'MDN Web Docs: HTML & CSS', link: 'https://developer.mozilla.org/' },
                        { name: 'CSS Tricks: Complete Guide to Flexbox', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
                    ]
                },
                { 
                    id: 'fs-2', 
                    title: 'JavaScript ES6+, Promises & Async/Await',
                    summary: 'Deep dive into closures, array methods (map/filter/reduce), asynchronous programming, Promises, Fetch API, and modern ES modules.',
                    resources: [
                        { name: 'JavaScript.info Complete Guide', link: 'https://javascript.info/' },
                        { name: 'FreeCodeCamp JS Algorithms', link: 'https://www.freecodecamp.org/' }
                    ]
                },
                { 
                    id: 'fs-3', 
                    title: 'Modern UI Framework (Bootstrap 5 / Tailwind CSS)',
                    summary: 'Build rapid, accessible interfaces with utility classes, grid systems, and glassmorphism styling.',
                    resources: [
                        { name: 'Bootstrap 5 Official Docs', link: 'https://getbootstrap.com/docs/5.3/' }
                    ]
                },
                { 
                    id: 'fs-4', 
                    title: 'Relational Databases (PostgreSQL, Schema Design & RLS)',
                    summary: 'Understand database normalization, primary/foreign keys, joins, indexing, Row Level Security (RLS), and writing optimized SQL queries.',
                    resources: [
                        { name: 'PostgreSQL Tutorial', link: 'https://www.postgresqltutorial.com/' },
                        { name: 'Supabase Database & RLS Guide', link: 'https://supabase.com/docs/guides/database' }
                    ]
                },
                { 
                    id: 'fs-5', 
                    title: 'RESTful APIs & Backend Integration',
                    summary: 'Client-server architecture, HTTP methods (GET/POST/PUT/DELETE), status codes, JSON handling, and secure API design.',
                    resources: [
                        { name: 'RESTful API Design Best Practices', link: 'https://restfulapi.net/' }
                    ]
                },
                { 
                    id: 'fs-6', 
                    title: 'Authentication, Authorization & Session Guards',
                    summary: 'JWT tokens, cookie-based sessions, role-based access control (RBAC), and securing single-page applications.',
                    resources: [
                        { name: 'OWASP Authentication Cheat Sheet', link: 'https://cheatsheetseries.owasp.org/' }
                    ]
                },
                { 
                    id: 'fs-7', 
                    title: 'CI/CD Pipelines & Cloud Deployment (Vercel/Netlify)',
                    summary: 'Automate build processes with Git hooks, deploy static assets, and configure production domain DNS.',
                    resources: [
                        { name: 'Vercel Deployment Docs', link: 'https://vercel.com/docs' }
                    ]
                }
            ]
        },
        {
            id: 'data-science-ai',
            title: 'Data Science & Machine Learning',
            icon: 'fa-brain',
            category: 'Artificial Intelligence',
            description: 'From data wrangling and exploratory analysis to training and deploying ML models.',
            milestones: [
                { 
                    id: 'ds-1', 
                    title: 'Python Core & Object-Oriented Programming',
                    summary: 'Syntax, control flow, functions, classes, inheritance, file handling, and standard package managers.',
                    resources: [
                        { name: 'Official Python Tutorial', link: 'https://docs.python.org/3/tutorial/' }
                    ]
                },
                { 
                    id: 'ds-2', 
                    title: 'Data Analysis with Pandas & NumPy',
                    summary: 'Vectorized operations, data cleaning, filtering DataFrames, handling missing values, and aggregation.',
                    resources: [
                        { name: '10 Minutes to Pandas', link: 'https://pandas.pydata.org/docs/user_guide/10min.html' }
                    ]
                },
                { 
                    id: 'ds-3', 
                    title: 'Data Visualization (Matplotlib, Seaborn)',
                    summary: 'Plotting statistical insights, distributions, correlation heatmaps, and storytelling with charts.',
                    resources: [
                        { name: 'Seaborn Tutorial Gallery', link: 'https://seaborn.pydata.org/tutorial.html' }
                    ]
                },
                { 
                    id: 'ds-4', 
                    title: 'Applied Statistics & Probability Theory',
                    summary: 'Hypothesis testing, distributions, p-values, central limit theorem, and confidence intervals.',
                    resources: [
                        { name: 'Khan Academy Statistics', link: 'https://www.khanacademy.org/math/statistics-probability' }
                    ]
                },
                { 
                    id: 'ds-5', 
                    title: 'Classical ML Algorithms with Scikit-Learn',
                    summary: 'Supervised vs unsupervised learning: Regression, Random Forests, SVM, clustering, and cross-validation.',
                    resources: [
                        { name: 'Scikit-Learn Getting Started', link: 'https://scikit-learn.org/stable/getting_started.html' }
                    ]
                },
                { 
                    id: 'ds-6', 
                    title: 'Neural Networks & Deep Learning Basics',
                    summary: 'Perceptrons, backpropagation, activation functions, loss curves, and introductory PyTorch/TensorFlow models.',
                    resources: [
                        { name: 'DeepLearning.AI Foundations', link: 'https://www.deeplearning.ai/' }
                    ]
                }
            ]
        },
        {
            id: 'cloud-devops',
            title: 'Cloud Architecture & DevOps',
            icon: 'fa-cloud',
            category: 'Infrastructure',
            description: 'Containerization, infrastructure as code, cloud computing providers, and CI/CD automation.',
            milestones: [
                { 
                    id: 'cd-1', 
                    title: 'Linux Fundamentals & Bash Scripting',
                    summary: 'File system permissions, process management, piping, SSH configuration, and shell scripts.',
                    resources: [
                        { name: 'Linux Survival Interactive', link: 'https://linuxsurvival.com/' }
                    ]
                },
                { 
                    id: 'cd-2', 
                    title: 'Git Workflows, Branching & GitHub Actions',
                    summary: 'Merge vs rebase, resolving conflicts, automated testing pipelines, and release workflows.',
                    resources: [
                        { name: 'GitHub Skills Tutorials', link: 'https://skills.github.com/' }
                    ]
                },
                { 
                    id: 'cd-3', 
                    title: 'Docker Containerization & Multi-stage Builds',
                    summary: 'Images, Dockerfiles, volumes, port forwarding, and lightweight multi-container environments with Docker Compose.',
                    resources: [
                        { name: 'Docker 101 Tutorial', link: 'https://www.docker.com/101-tutorial/' }
                    ]
                },
                { 
                    id: 'cd-4', 
                    title: 'Cloud Infrastructure (AWS/GCP Basics)',
                    summary: 'Core services: Compute (EC2), Object storage (S3), Virtual networks (VPC), and IAM security policies.',
                    resources: [
                        { name: 'AWS Cloud Practitioner Prep', link: 'https://aws.amazon.com/training/' }
                    ]
                },
                { 
                    id: 'cd-5', 
                    title: 'Kubernetes Cluster Orchestration',
                    summary: 'Pods, Deployments, Services, ConfigMaps, rolling updates, and self-healing cloud clusters.',
                    resources: [
                        { name: 'Kubernetes Official Interactive Basics', link: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }
                    ]
                }
            ]
        }
    ];

    function showAlert(message, type = 'danger') {
        if (!roadmapAlert) return;
        roadmapAlert.className = 'alert alert-${type} py-2 px-3 small';
        roadmapAlert.textContent = message;
        roadmapAlert.classList.remove('d-none');
        setTimeout(() => roadmapAlert.classList.add('d-none'), 3500);
    }

    // 2. Fetch User Progress from Supabase
    async function loadRoadmapProgress() {
        if (!roadmapContainer) return;
        roadmapContainer.innerHTML = '<div class="text-center py-5 text-secondary"><i class="fa-solid fa-spinner fa-spin"></i> Loading roadmaps...</div>';

        try {
            const { data: userMilestones, error } = await window.sb
                .from('user_roadmaps')
                .select('*')
                .eq('user_id', user.id);

            if (error) throw error;

            const completedMap = new Set(
                (userMilestones || []).filter(item => item.is_completed).map(item => item.milestone_id)
            );

            renderRoadmaps(completedMap);
        } catch (err) {
            console.error('Progress fetch fallback:', err);
            renderRoadmaps(new Set());
        }
    }

    // 3. Render Roadmaps with Clickable Topics
    function renderRoadmaps(completedSet) {
        roadmapContainer.innerHTML = ROADMAP_DATA.map(track => {
            const totalSteps = track.milestones.length;
            const completedSteps = track.milestones.filter(m => completedSet.has(m.id)).length;
            const percent = Math.round((completedSteps / totalSteps) * 100);

            return `
                <div class="glass-panel p-4 mb-4">
                    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="glass-card p-3 rounded-circle text-center" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-solid ${track.icon} fs-4 text-warning"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0">${track.title}</h5>
                                <span class="badge bg-secondary-subtle text-secondary">${track.category}</span>
                            </div>
                        </div>
                        <div class="text-end">
                            <span class="fw-bold fs-5 ${percent === 100 ? 'text-success' : 'text-info'}">${percent}%</span>
                            <small class="text-secondary d-block">${completedSteps} of ${totalSteps} Done</small>
                        </div>
                    </div>

                    <p class="text-secondary small mb-3">${track.description}</p>

                    <div class="progress mb-4" style="height: 8px;">
                        <div class="progress-bar bg-gradient" role="progressbar" style="width: ${percent}%;"></div>
                    </div>

                    <div class="d-flex flex-column gap-2">
                        ${track.milestones.map((m, index) => {
                            const isDone = completedSet.has(m.id);
                            return `
                                <div class="glass-card p-3 d-flex justify-content-between align-items-center">
                                    <div class="form-check d-flex align-items-center gap-2 mb-0">
                                        <input class="form-check-input milestone-checkbox" type="checkbox" id="${m.id}" data-roadmap="${track.id}" ${isDone ? 'checked' : ''} style="cursor: pointer;">
                                        <span class="view-topic-btn small ${isDone ? 'text-decoration-line-through text-secondary' : 'text-white'}" data-roadmap="${track.id}" data-milestone="${m.id}" style="cursor: pointer;">
                                            <span class="text-secondary me-2">#${index + 1}</span>${m.title}
                                        </span>
                                    </div>
                                    <button class="btn btn-glass btn-sm view-topic-btn px-2 py-1" data-roadmap="${track.id}" data-milestone="${m.id}" title="Read Guide">
                                        <i class="fa-solid fa-circle-info text-info me-1"></i> Learn
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');

        attachMilestoneHandlers();
        attachTopicModalHandlers();
    }

    // 4. Milestone Toggle Checkbox Handler
    function attachMilestoneHandlers() {
        document.querySelectorAll('.milestone-checkbox').forEach(box => {
            box.addEventListener('change', async (e) => {
                const milestoneId = e.target.id;
                const roadmapId = e.target.getAttribute('data-roadmap');
                const isChecked = e.target.checked;

                try {
                    const { error } = await window.sb
                        .from('user_roadmaps')
                        .upsert({
                            user_id: user.id,
                            roadmap_id: roadmapId,
                            milestone_id: milestoneId,
                            is_completed: isChecked,
                            updated_at: new Date().toISOString()
                        }, { onConflict: 'user_id, milestone_id' });

                    if (error) throw error;

                    showAlert(isChecked ? 'Milestone completed!' : 'Milestone marked incomplete.', 'success');
                    loadRoadmapProgress();
                } catch (err) {
                    showAlert('Unable to update milestone status.');
                    e.target.checked = !isChecked;
                }
            });
        });
    }

    // 5. Open Learning Drawer when clicking Topic or Learn button
    function attachTopicModalHandlers() {
        const offcanvasEl = document.getElementById('topicOffcanvas');
        if (!offcanvasEl) return;
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);

        document.querySelectorAll('.view-topic-btn').forEach(elem => {
            elem.addEventListener('click', () => {
                const rId = elem.getAttribute('data-roadmap');
                const mId = elem.getAttribute('data-milestone');

                const track = ROADMAP_DATA.find(r => r.id === rId);
                if (!track) return;
                const milestone = track.milestones.find(m => m.id === mId);
                if (!milestone) return;

                document.getElementById('drawerTrackTitle').textContent = track.title;
                document.getElementById('drawerMilestoneTitle').textContent = milestone.title;
                document.getElementById('drawerSummary').textContent = milestone.summary;

                const resList = document.getElementById('drawerResources');
                resList.innerHTML = milestone.resources.map(res => `
                    <li class="mb-2">
                        <a href="${res.link}" target="_blank" rel="noopener" class="text-info text-decoration-none small">
                            <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> ${res.name}
                        </a>
                    </li>
                `).join('');

                bsOffcanvas.show();
            });
        });
    }

    loadRoadmapProgress();
});