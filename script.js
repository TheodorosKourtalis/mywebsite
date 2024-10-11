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
    // Microeconomics (6 Equations)
    'P_x X + P_y Y = I', // Budget Constraint
    'Q = A L^α K^β', // Cobb-Douglas Production Function
    'π = P Q - C(Q)', // Profit Maximization
    'MR = dTR/dQ', // Marginal Revenue
    'Q_d = a - bP', // Demand Curve
    'Q_s = c + dP', // Supply Curve

    // Macroeconomics (6 Equations)
    'Y = C + I + G + (X - M)', // GDP Identity
    'C = a + bY_d', // Keynesian Consumption Function
    'I = I_0 - b r', // Investment Function
    'Y = C(Y - T) + I(r) + G', // IS Curve
    'M/P = L(Y, r)', // LM Curve
    'π = π_e - β(u - u_n)', // Phillips Curve

    // Economic Geography (5 Equations)
    'F = G (M_1 M_2)/D^2', // Gravity Model
    'LQ = (E_i/E) / (E\'_i/E\')', // Location Quotient
    'N = (3/√3)(A/B)^2', // Central Place Theory
    'T_{ij} = k (P_i P_j)/D_{ij}^θ', // Spatial Interaction Model
    'R_i = R_0 - c_i x_i', // Bid-Rent Function

    // Network Theory in Economics (4 Equations)
    'X_i = Σ a_{ij} X_j + Y_i', // Input-Output Model
    'p_i + t_{ij} = p_j', // Network Equilibrium
    'C_B(v) = Σ (σ_{st}(v)/σ_{st})', // Betweenness Centrality
    'C_E(i) = (1/λ) Σ A_{ij} C_E(j)', // Eigenvector Centrality

    // Econometrics (15 Equations)
    'Y = β_0 + β_1X + ε', // Simple Linear Regression
    'E(Y|X) = β_0 + β_1X', // Conditional Expectation
    'ΔY = α + βΔX + γΔZ', // Difference Equation
    'Y = α + Σβ_i X_i + ε', // Multiple Linear Regression
    'log(Y) = β_0 + β_1X + ε', // Log-Linear Model
    'P(Y=1|X) = 1 / (1 + exp(-(β_0 + β_1X)))', // Logistic Regression
    'Cov(X, Y) = E[(X - μ_X)(Y - μ_Y)]', // Covariance
    'Var(X) = E[X^2] - (E[X])^2', // Variance
    'Corr(X, Y) = Cov(X, Y) / (σ_X σ_Y)', // Correlation
    'Y = α + βX + γX^2 + ε', // Quadratic Regression
    'ln(Y) = α + β ln(X) + ε', // Log-Log Model
    'ε ~ N(0, σ^2)', // Error Term Assumption
    'R^2 = 1 - (SS_{res}/SS_{tot})', // Coefficient of Determination
    'DW = Σ(e_t - e_{t-1})^2 / Σe_t^2', // Durbin-Watson Statistic
    'Heteroskedasticity: Var(ε|X) = σ^2(X)', // Heteroskedasticity Condition

    // Complexity Economics (4 Equations)
    'dx_i/dt = f(x_i, x_j, ...)', // Agent-Based Dynamics
    'Y(t+1) = Y(t) + α Y(t)(1 - Y(t)/K)', // Logistic Growth (Non-linear Dynamics)
    'A_{ij}(t+1) = A_{ij}(t) + η (x_i x_j - A_{ij}(t))', // Adaptive Network Formation
    'S = Σ_{i,j} A_{ij} x_i x_j', // Network Spillover Effects

    // Financial Economics (6 Equations)
    'NPV = Σ (C_t / (1 + r)^t)', // Net Present Value
    'Σ (C_t / (1 + IRR)^t) = 0', // Internal Rate of Return
    'F = S e^{rT}', // Future Value
    'C = S_0 Φ(d_1) - K e^{-rT} Φ(d_2)', // Call Option Price (Black-Scholes)
    'P = K e^{-rT} Φ(-d_2) - S_0 Φ(-d_1)', // Put Option Price (Black-Scholes)
    'E(R) = R_f + β (R_m - R_f)', // CAPM

    // Additional Financial Economics (Optional, if needed)
    'Sharpe Ratio = (E(R_p) - R_f) / σ_p', // Sharpe Ratio
    'P = Σ (C / (1 + r)^t) + F / (1 + r)^T' // Bond Price
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
