
// Mobile navigation
const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
});

// Footer
document.querySelector('#current-year').textContent =
    new Date().getFullYear();

document.querySelector('#last-modified').textContent =
    document.lastModified;

// Read submitted form information
const params = new URLSearchParams(window.location.search);

document.querySelector('#firstName').textContent =
    params.get('firstName') || 'Not provided';

document.querySelector('#lastName').textContent =
    params.get('lastName') || 'Not provided';

document.querySelector('#email').textContent =
    params.get('email') || 'Not provided';

document.querySelector('#phone').textContent =
    params.get('phone') || 'Not provided';

document.querySelector('#organization').textContent =
    params.get('organization') || 'Not provided';

const timestamp = params.get('timestamp');

document.querySelector('#timestamp').textContent =
    timestamp
        ? new Date(timestamp).toLocaleString()
        : 'Not provided';
