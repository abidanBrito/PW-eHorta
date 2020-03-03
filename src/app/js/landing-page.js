const navSlider = () => {
    const burgerIcon = document.querySelector('.menu-icon');
    const navBar = document.querySelector('.navbar-links');
    const navBarLinks = document.querySelectorAll('.navbar-links li');
    const body = document.querySelector('body');

    burgerIcon.addEventListener('click', () => {
        // Toggle navigation bar
        navBar.classList.toggle('navbar-active');
        
        // Disable scrolling over mobile menu
        body.classList.toggle('disable-scroll');
        
        // Links fade in animation
        navBarLinks.forEach((link, index) => {
            if(link.style.animation) {
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