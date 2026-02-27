document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const mobileModeToggle = document.getElementById('mobile-mode-toggle');
    const body = document.body;
    const favicon = document.getElementById('favicon');

    // ========================
    // THEME
    // ========================
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (favicon) favicon.href = 'favicon-dark.png';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (favicon) favicon.href = 'favicon-light.png';
        }
    };

    const currentTheme = localStorage.getItem("theme") || "dark";
    applyTheme(currentTheme);

    if (modeToggle) modeToggle.checked = currentTheme === "dark";
    if (mobileModeToggle) mobileModeToggle.checked = currentTheme === "dark";

    const toggleMode = (isDarkMode) => {
        const theme = isDarkMode ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            startEquationAnimation();
        } else {
            stopEquationAnimation();
        }
    };

    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            toggleMode(modeToggle.checked);
            if (mobileModeToggle) mobileModeToggle.checked = modeToggle.checked;
        });
    }

    if (mobileModeToggle) {
        mobileModeToggle.addEventListener('change', () => {
            toggleMode(mobileModeToggle.checked);
            if (modeToggle) modeToggle.checked = mobileModeToggle.checked;
        });
    }

    // ========================
    // HAMBURGER MENU
    // ========================
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            mobileMenu.classList.toggle('hidden');
            const icon = hamburgerButton.querySelector('i');
            if (mobileMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                const icon = hamburgerButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========================
    // SCROLL REVEAL
    // ========================
    const revealElements = document.querySelectorAll('.section-block, .glass-card, .skill-tile, .timeline-item');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================
    // ACTIVE NAV HIGHLIGHT
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => navObserver.observe(section));

    // ========================
    // EQUATIONS ANIMATION
    // ========================
    const equations = [
        'P_x X + P_y Y = I',
        'Q = A L^α K^β',
        'π = P Q - C(Q)',
        'MR = dTR/dQ',
        'Q_d = a - bP',
        'Q_s = c + dP',
        'Y = C + I + G + (X - M)',
        'C = a + bY_d',
        'I = I_0 - b r',
        'Y = C(Y - T) + I(r) + G',
        'M/P = L(Y, r)',
        'π = π_e - β(u - u_n)',
        'F = G (M_1 M_2)/D^2',
        'LQ = (E_i/E) / (E\'_i/E\')',
        'T_{ij} = k (P_i P_j)/D_{ij}^θ',
        'R_i = R_0 - c_i x_i',
        'X_i = Σ a_{ij} X_j + Y_i',
        'C_B(v) = Σ (σ_{st}(v)/σ_{st})',
        'Y = β_0 + β_1X + ε',
        'E(Y|X) = β_0 + β_1X',
        'P(Y=1|X) = 1/(1+e^{-Xβ})',
        'Cov(X,Y) = E[(X-μ_X)(Y-μ_Y)]',
        'R² = 1 - SS_res/SS_tot',
        'NPV = Σ C_t/(1+r)^t',
        'E(R) = R_f + β(R_m - R_f)',
        'F = S e^{rT}',
        'dx_i/dt = f(x_i, x_j, ...)',
        'S = Σ A_{ij} x_i x_j',
        'Sharpe = (E(R_p)-R_f)/σ_p'
    ];

    const container = document.getElementById('equations-container');
    let intervalId;

    function createEquation() {
        if (!container) return;
        const eq = document.createElement('div');
        eq.className = 'equation';
        eq.textContent = equations[Math.floor(Math.random() * equations.length)];
        eq.style.left = Math.random() * (container.clientWidth - 200) + 'px';
        eq.style.animationDuration = (Math.random() * 6 + 5) + 's';
        eq.style.fontSize = (Math.random() * 6 + 14) + 'px';
        eq.style.opacity = Math.random() * 0.4 + 0.2;
        container.appendChild(eq);

        eq.addEventListener('animationend', () => eq.remove());
    }

    function startEquationAnimation() {
        if (!container) return;
        intervalId = setInterval(createEquation, 200);
        setTimeout(() => clearInterval(intervalId), 10000);
    }

    function stopEquationAnimation() {
        clearInterval(intervalId);
        if (container) {
            container.querySelectorAll('.equation').forEach(eq => eq.remove());
        }
    }

    if (currentTheme === 'dark') {
        startEquationAnimation();
    }

    // ========================
    // NAV SHRINK ON SCROLL
    // ========================
    const nav = document.querySelector('nav.sticky');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.padding = '0.5rem 1.5rem';
            } else {
                nav.style.padding = '1rem 1.5rem';
            }
        });
    }
});
