import { loadHeaderFooter } from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

async function init() {
  await loadHeaderFooter();
  initNewsletter();

  const order = new CheckoutProcess('so-cart', '.checkout-summary');
  order.init();

  const zipInput = document.querySelector('#zip');
  if (zipInput) {
    zipInput.addEventListener('blur', order.calculateOrderTotal.bind(order));
  }

  const form = document.forms.checkout;
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await order.checkout(form);
    });
  }
}

init();
