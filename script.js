"use strict";

document.addEventListener('DOMContentLoaded', () => {
  // Cached selectors
  const body = document.body;
  const favicon = document.getElementById('favicon');
  const modeToggle = document.getElementById('mode-toggle');
  const mobileModeToggle = document.getElementById('mobile-mode-toggle');
  const hamburgerButton = document.getElementById('hamburger-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const equationsContainer = document.getElementById('equations-container');

  // Theme Functions
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      favicon.href = 'favicon-dark.png';
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      favicon.href = 'favicon-light.png';
    }
  };

  const currentTheme = localStorage.getItem("theme") || "light";
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

  // Lazy Loading with Intersection Observer (with fallback)
  const lazyImages = document.querySelectorAll('img.lazy');

  const lazyLoadImage = (img) => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.setAttribute('src', src);
      img.classList.remove('lazy');
    }
  };

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lazyLoadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(lazyLoadImage);
  }

  // Fade-in Animations via Intersection Observer
  const faders = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay');
  if ('IntersectionObserver' in window) {
    const appearObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    faders.forEach(el => appearObserver.observe(el));
  } else {
    // Fallback: simply show elements if observer isn't supported
    faders.forEach(el => {
      el.classList.add('opacity-100');
      el.classList.remove('opacity-0');
    });
  }

  // Hamburger Menu Toggle for Mobile
  hamburgerButton.addEventListener('click', () => {
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
    hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('show');
  });

  // Equation Animation
  const equations = [
    'P_x X + P_y Y = I', 'Q = A L^α K^β', 'π = P Q - C(Q)', 'MR = dTR/dQ',
    'Q_d = a - bP', 'Q_s = c + dP', 'Y = C + I + G + (X - M)', 'C = a + bY_d',
    'I = I_0 - b r', 'Y = C(Y - T) + I(r) + G', 'M/P = L(Y, r)', 'π = π_e - β(u - u_n)',
    'F = G (M_1 M_2)/D^2', 'LQ = (E_i/E) / (E\'_i/E\')', 'N = (3/√3)(A/B)^2',
    'T_{ij} = k (P_i P_j)/D_{ij}^θ', 'R_i = R_0 - c_i x_i', 'X_i = Σ a_{ij} X_j + Y_i',
    'p_i + t_{ij} = p_j', 'C_B(v) = Σ (σ_{st}(v)/σ_{st})', 'C_E(i) = (1/λ) Σ A_{ij} C_E(j)',
    'Y = β_0 + β_1X + ε', 'E(Y|X) = β_0 + β_1X', 'ΔY = α + βΔX + γΔZ',
    'Y = α + Σβ_i X_i + ε', 'log(Y) = β_0 + β_1X + ε', 'P(Y=1|X) = 1 / (1 + exp(-(β_0 + β_1X)))',
    'Cov(X, Y) = E[(X - μ_X)(Y - μ_Y)]', 'Var(X) = E[X^2] - (E[X])^2',
    'Corr(X, Y) = Cov(X, Y) / (σ_X σ_Y)', 'Y = α + βX + γX^2 + ε', 'ln(Y) = α + β ln(X) + ε',
    'ε ~ N(0, σ^2)', 'R^2 = 1 - (SS_{res}/SS_{tot})', 'DW = Σ(e_t - e_{t-1})^2 / Σe_t^2',
    'Heteroskedasticity: Var(ε|X) = σ^2(X)', 'dx_i/dt = f(x_i, x_j, ...)',
    'Y(t+1) = Y(t) + α Y(t)(1 - Y(t)/K)', 'A_{ij}(t+1) = A_{ij}(t) + η (x_i x_j - A_{ij}(t))',
    'S = Σ_{i,j} A_{ij} x_i x_j', 'NPV = Σ (C_t / (1 + r)^t)',
    'Σ (C_t / (1 + IRR)^t) = 0', 'F = S e^{rT}', 'C = S_0 Φ(d_1) - K e^{-rT} Φ(d_2)',
    'P = K e^{-rT} Φ(-d_2) - S_0 Φ(-d_1)', 'E(R) = R_f + β (R_m - R_f)',
    'Sharpe Ratio = (E(R_p) - R_f) / σ_p', 'P = Σ (C / (1 + r)^t) + F / (1 + r)^T'
  ];
  let equationIntervalId;

  function createEquation() {
    const eqElem = document.createElement('div');
    eqElem.className = 'equation';
    eqElem.textContent = equations[Math.floor(Math.random() * equations.length)];
    eqElem.style.top = '-10vh'; // Start above view
    eqElem.style.left = Math.random() * 100 + 'vw';
    eqElem.style.animationDuration = (Math.random() * 5 + 3) + 's';
    equationsContainer.appendChild(eqElem);

    eqElem.addEventListener('animationend', () => {
      eqElem.remove();
    });
  }

  function startEquationAnimation() {
    // Prevent multiple intervals if already running
    if (equationIntervalId) return;
    equationIntervalId = setInterval(createEquation, 150);
    setTimeout(() => {
      clearInterval(equationIntervalId);
      equationIntervalId = null;
    }, 8000);
  }

  function stopEquationAnimation() {
    clearInterval(equationIntervalId);
    equationIntervalId = null;
    document.querySelectorAll('.equation').forEach(elem => elem.remove());
  }

  // Start equation animation if in dark mode
  if (currentTheme === 'dark') {
    startEquationAnimation();
  }
});
