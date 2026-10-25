const navButton = document.querySelector('#nav-button');
const primaryNav = document.querySelector('#primary-nav');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');

    primaryNav.classList.toggle('show', isOpen);

    navButton.setAttribute('aria-expanded', isOpen);
});