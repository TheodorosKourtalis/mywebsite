document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const mobileModeToggle = document.getElementById('mobile-mode-toggle');
    const body = document.body;
    const favicon = document.getElementById('favicon'); // Make sure your favicon link element has this ID

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            // Switch to dark favicon
            favicon.href = 'favicon-dark.png'; // Replace with the path to your dark mode favicon
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            // Switch to light favicon
            favicon.href = 'favicon-light.png'; // Replace with the path to your light mode favicon
        }
    };

    // Get the current theme from localStorage or default to 'light'
    const currentTheme = localStorage.getItem("theme") || "light";
    applyTheme(currentTheme);

    // Set the initial state of the toggles
    if (modeToggle) modeToggle.checked = currentTheme === "dark";
    if (mobileModeToggle) mobileModeToggle.checked = currentTheme === "dark";

    // Toggle theme and update localStorage
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

    // Event listeners for the toggles
    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            toggleMode(modeToggle.checked);
            if (mobileModeToggle) {
                mobileModeToggle.checked = modeToggle.checked;
            }
        });
    }

    if (mobileModeToggle) {
        mobileModeToggle.addEventListener('change', () => {
            toggleMode(mobileModeToggle.checked);
            if (modeToggle) {
                modeToggle.checked = mobileModeToggle.checked;
            }
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img.lazy');

    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    img.setAttribute('src', src);
                    img.classList.remove('lazy');

                    observer.unobserve(img);
                }
            });
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Fade-in animations
    const faders = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Hamburger menu toggle
    document.getElementById('hamburger-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('show');
    });

    // JavaScript for Animating Equations
    const equations = [
        'Y = β0 + β1X + ε',
        'E(Y|X) = β0 + β1X',
        'ΔY = α + βΔX + γΔZ',
        'Y = α + ΣβiXi + ε',
        'log(Y) = β0 + β1X + ε',
        'P(Y=1|X) = 1 / (1 + exp(-(β0 + β1X)))',
        'Cov(X, Y) = E[(X - μX)(Y - μY)]',
        'Var(X) = E[X^2] - (E[X])^2',
        'Corr(X, Y) = Cov(X, Y) / (σX * σY)',
        'Y = α + βX + γX^2 + ε',
        'ln(Y) = α + βln(X) + ε',
        'r = r_f + β (r_m - r_f)',
        'σ^2_p = w^2_1σ^2_1 + w^2_2σ^2_2 + 2w_1w_2Cov_12',
        'V_0 = D_1 / (r - g)',
        'π_t = π_{t-1} + γ(u_t - u_n)',
        'S_t = E_t(S_{t+1}) + (i_t - i*_t)',
        'L = -∑ (Y_i log(π_i) + (1 - Y_i) log(1 - π_i))',
        'R = σ_p / (E(R_p) - r_f)',
        'NPV = ∑ (C_t / (1 + r)^t)',
        'IRR: ∑ (C_t / (1 + IRR)^t) = 0',
        'F = S e^(rT)',
        'Call Option Price: C = S_0Φ(d1) - Ke^(-rT)Φ(d2)',
        'Put Option Price: P = Ke^(-rT)Φ(-d2) - S_0Φ(-d1)',
        'd1 = (ln(S/K) + (r + σ^2/2)T) / (σ√T)',
        'd2 = d1 - σ√T',
        'Delta (Δ) = Φ(d1)',
        'Gamma (Γ) = Φ\'(d1) / (Sσ√T)',
        'Theta (Θ) = -(SΦ\'(d1)σ) / (2√T) - rKe^(-rT)Φ(d2)',
        'Vega (ν) = S√TΦ\'(d1)',
        'CAPM: E(R) = Rf + β (Rm - Rf)',
        'Sharpe Ratio = (E(R_p) - r_f) / σ_p',
        'σ^2 = Σp_i(x_i - μ)^2',
        'r = r_f + β (r_m - r_f)',
        'Fisher Equation: r_n = r_r + π_e',
        'Bond Price: P = Σ (C / (1 + r)^t) + F / (1 + r)^T',
        'YTM = ∑ C / (1 + y)^t + F / (1 + y)^T',
        'ModDur = MacDur / (1 + y/m)'
    ];

    const container = document.getElementById('equations-container');
    let intervalId;

    function createEquation() {
        const equation = document.createElement('div');
        equation.className = 'equation';
        equation.textContent = equations[Math.floor(Math.random() * equations.length)];
        equation.style.top = '-10vh'; // Start above the view
        equation.style.left = Math.random() * 100 + 'vw';
        equation.style.animationDuration = (Math.random() * 5 + 3) + 's';
        container.appendChild(equation);

        // Remove equation after animation ends
        equation.addEventListener('animationend', () => {
            equation.remove();
        });
    }

    function startEquationAnimation() {
        intervalId = setInterval(createEquation, 150); // Create a new equation every 0.15 seconds

        // Stop creating equations after 8 seconds
        setTimeout(() => {
            clearInterval(intervalId);
        }, 8000);
    }

    function stopEquationAnimation() {
        clearInterval(intervalId);
        const equations = document.querySelectorAll('.equation');
        equations.forEach(equation => equation.remove());
    }

    // Initialize the animation if the current theme is dark
    if (currentTheme === 'dark') {
        startEquationAnimation();
    }
});