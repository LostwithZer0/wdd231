
const params = new URLSearchParams(window.location.search);

document.querySelector('#firstName').textContent =
    params.get('firstName') || 'Not provided';

document.querySelector('#lastName').textContent =
    params.get('lastName') || 'Not provided';

document.querySelector('#email').textContent =
    params.get('email') || 'Not provided';

document.querySelector('#phone').textContent =
    params.get('phone') || 'Not provided';

document.querySelector('#course').textContent =
    params.get('course') || 'Not selected';

document.querySelector('#format').textContent =
    params.get('format') || 'Not selected';

document.querySelector('#startDate').textContent =
    params.get('startDate') || 'Not provided';

document.querySelector('#updates').textContent =
    params.has('updates') ? 'Yes' : 'No';
