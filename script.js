/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeCheckbox = document.getElementById('toggle-theme-checkbox');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section'); 
    
    // --- Theme Toggle Functionality ---
    if (toggleThemeCheckbox) {
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-mode');
                toggleThemeCheckbox.checked = true;
            } else {
                document.body.classList.remove('light-mode');
                toggleThemeCheckbox.checked = false;
            }
        };

        applyTheme();

        toggleThemeCheckbox.addEventListener('change', () => {
            if (toggleThemeCheckbox.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Page Navigation Functionality ---
    function showPage(pageId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        const targetSection = document.querySelector(pageId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        if (history.pushState) {
            history.pushState(null, '', pageId);
        } else {
            window.location.hash = pageId;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href'); 
            showPage(targetId);
        });
    });

    const initialHash = window.location.hash || '#home'; 
    showPage(initialHash);

    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash || '#home';
        showPage(currentHash);
    });
});