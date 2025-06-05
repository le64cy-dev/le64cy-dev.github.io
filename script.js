document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const navLinks = document.querySelectorAll('nav a');
    // Ensure all sections are wrapped within <main> in HTML
    const sections = document.querySelectorAll('main section'); 

    // --- Theme Toggle Functionality ---
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // Optionally save the preference
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });

        // Apply theme from localStorage on load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            // Default to dark if no preference or 'dark' saved
            document.body.classList.remove('light-mode');
        }
    }

    // --- Page Navigation Functionality ---
    function showPage(pageId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
            // No need to reset opacity/transform here if CSS handles it on display:none/block
            // The animation will trigger when 'active-section' is added
        });

        const targetSection = document.querySelector(pageId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        // Update URL hash without causing a page reload
        if (history.pushState) {
            history.pushState(null, '', pageId);
        } else {
            // Fallback for older browsers
            window.location.hash = pageId;
        }
    }

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href'); // e.g., "#home"
            showPage(targetId);
        });
    });

    // Handle initial page load (based on URL hash or default to #home)
    const initialHash = window.location.hash || '#home'; // Default to #home
    showPage(initialHash);

    // Handle browser back/forward buttons (popstate event)
    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash || '#home';
        showPage(currentHash);
    });
});