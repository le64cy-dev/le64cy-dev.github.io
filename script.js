/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeCheckbox = document.getElementById('toggle-theme-checkbox');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section'); 
    
    // Get the new invite buttons by their IDs
    const inviteButtonHome = document.getElementById('invite-wavy-button');
    const inviteButtonCTA = document.getElementById('invite-wavy-button-cta'); // For the button on the invite page

    // Discord Invite Link
    const discordInviteLink = "https://discord.com/oauth2/authorize?client_id=1209275204497571920&scope=bot+applications.commands&permissions=8";

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

    // --- NEW: Invite Button Functionality ---
    const handleInviteButtonClick = (buttonElement) => {
        if (!buttonElement) return; // Exit if button doesn't exist

        buttonElement.addEventListener('click', () => {
            // Add the 'focus' class to trigger the animation
            buttonElement.focus(); 

            // Prevent multiple clicks during animation
            buttonElement.disabled = true;

            setTimeout(() => {
                window.open(discordInviteLink, '_blank'); 
                
                
                buttonElement.disabled = false; 

            }, 1200); // Match or exceed the longest animation duration
        });
    };

    // Apply the click handler to both invite buttons
    handleInviteButtonClick(inviteButtonHome);
    handleInviteButtonClick(inviteButtonCTA); // If you add one to the CTA section too
});