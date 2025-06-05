document.addEventListener('DMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggle-theme');

    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if(document.body.classList.contains('light-mode')) {
            document.documentElement.style.setProperty('--background-dark', '#f5f5f5');
            document.documentElement.style.setProperty('--text-light', '#000');
            document.documentElement.style.setProperty('--card-color', '#e0e0e0');
        } else {
            document.documentElement.style.setProperty('--background-dark', '#f5f5f5');
            document.documentElement.style.setProperty('--text-light', '#000');
            document.documentElement.style.setProperty('--card-color', '#142a38');
        }
    });
});