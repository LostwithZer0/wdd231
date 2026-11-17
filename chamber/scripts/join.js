
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

// Form timestamp
document.querySelector('#timestamp').value =
    new Date().toISOString();

// Membership modals
const modalLinks = document.querySelectorAll('.modal-link');

modalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const modal = document.querySelector(link.getAttribute('href'));

        modal.showModal();
    });
});

// Close buttons
document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

// Close when clicking outside modal content
document.querySelectorAll('.membership-modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            const rect = modal.getBoundingClientRect();

            const outside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;

            if (outside) {
                modal.close();
            }
        }
    });
});
