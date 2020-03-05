    const navSlider = () => {
    const burgerIcon = document.querySelector('.menu-icon');
    const navBar = document.querySelector('.navbar-links');
    const loginIcon = document.querySelector('#login-icon');
    const navBarLinks = document.querySelectorAll('.navbar-links li');

    burgerIcon.addEventListener('click', () => {
        // Toggle navigation bar
        navBar.classList.toggle('navbar-active');
                
        // Hide login icon
        loginIcon.classList.toggle('login-hide');
                
        // Links fade in animation
        navBarLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navbarLinkFade 0.5s ease forwards ${index / 4 + 0.1}s`;
            }
        });

        // Burger icon swap
        burgerIcon.classList.toggle('menu-toggle');
    });
}

navSlider();