document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const mobileModeToggle = document.getElementById('mobile-mode-toggle');
    const body = document.body;
    const favicon = document.getElementById('favicon');

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            favicon.href = 'favicon-dark.png'; // Switch to dark favicon
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            favicon.href = 'favicon-light.png'; // Switch to light favicon
        }
    };
    
    // Initialize the theme based on localStorage or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Set the initial state of the toggles
    if (modeToggle) modeToggle.checked = currentTheme === 'dark';
    if (mobileModeToggle) mobileModeToggle.checked = currentTheme === 'dark';

    // Toggle theme and update localStorage
    const toggleMode = (isDarkMode) => {
        const theme = isDarkMode ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    };

    // Event listeners for the toggles
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

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Hamburger menu toggle
    document.getElementById('hamburger-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('show');
    });