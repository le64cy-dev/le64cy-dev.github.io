document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section'); 

    // --- Theme Toggle Functionality ---
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // Save the preference to localStorage
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
        });

        const targetSection = document.querySelector(pageId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            // Scroll to top of the new section for better UX if needed
            // targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Update URL hash without causing a page reload
        if (history.pushState) {
            history.pushState(null, '', pageId);
        } else {
            window.location.hash = pageId;
        }
    }

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href'); 
            showPage(targetId);
        });
    });

    // Handle initial page load (based on URL hash or default to #home)
    const initialHash = window.location.hash || '#home'; 
    showPage(initialHash);

    // Handle browser back/forward buttons (popstate event)
    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash || '#home';
        showPage(currentHash);
    });
});