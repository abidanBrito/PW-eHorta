/* ----------------------------------------------------------------
 *   AUTHOR:         Abidan Brito Clavijo
 *   FILE:           navbar.js
 *   DATE:           16/03/2020
 *   STATE:          DONE
 *   ---------------------------------------------------------------- */

const navSlider = () => {
    const burgerIcon = document.querySelector('.menu-icon');
    const navBar = document.querySelector('.navbar-links');
    const navBarLinks = document.querySelectorAll('.navbar-links li');
    const loginIcon = document.querySelector('#login-icon');
    const globeIcon = document.querySelector('#globe-icon');

    // Get current page
    let path = window.location.pathname;
    let page = path.split("/").pop();

    burgerIcon.addEventListener('click', () => {
        // Toggle navigation bar
        navBar.classList.toggle('navbar-active');

        // Hide login icon
        if (page != 'login.html' && page != 'app.html' 
        && page != 'admin.html' && page != 'weather.html' 
        && page != 'alerts.html' && page != 'threshold.html') {
            loginIcon.classList.toggle('hide-icon');
        }

        if (page == 'index.html' || page == 'contact.html' || page == 'login.html') {
            globeIcon.classList.toggle('hide-icon');
        }

        // Links fade in animation
        navBarLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navbarLinkFade 0.5s ease forwards ${index / 6 + 0.2}s`;
            }
        });

        // Burger icon swap
        burgerIcon.classList.toggle('menu-toggle');
    });
}

navSlider();
