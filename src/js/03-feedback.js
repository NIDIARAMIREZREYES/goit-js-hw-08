import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

function saveFormState() {
    const formState = {
        email: emailInput.value,
        message: messageInput.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

function loadFormState() {
    const savedState = localStorage.getItem('feedback-form-state');
    if (savedState) {
        const formState = JSON.parse(savedState);
        emailInput.value = formState.email || '';
        messageInput.value = formState.message || '';
    }
}

function clearFormState() {
    localStorage.removeItem('feedback-form-state');
}

feedbackForm.addEventListener('input', throttle(saveFormState, 500));

document.addEventListener('DOMContentLoaded', loadFormState);

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formState = {
        email: emailInput.value,
        message: messageInput.value
    };

    console.log('Formulario enviado:', formState);

    clearFormState();
    emailInput.value = '';
    messageInput.value = '';
});

