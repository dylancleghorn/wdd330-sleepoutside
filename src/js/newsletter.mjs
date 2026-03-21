export function initNewsletter() {
  const form = document.querySelector('#newsletter-form');
  const messageDiv = document.querySelector('#newsletter-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#newsletter-email').value;

    messageDiv.innerText = `Thank you for subscribing, ${email}!`;
    messageDiv.classList.remove('hidden');

    form.reset();

    setTimeout(() => {
      messageDiv.classList.add('hidden');
    }, 5000);
  });
}