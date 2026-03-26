import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
} from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image || '';
  const name = item.NameWithoutBrand || item.Name || 'Product';
  const color = item.Colors?.[0]?.ColorName || '';
  const price = Number(item.FinalPrice ?? item.ListPrice ?? 0);
  const id = item.Id || '';

  return `
    <li class="cart-card cart-card--enhanced divider">
      <a href="/product_pages/index.html?product=${id}" class="cart-card__image">
        <img src="${image}" alt="${name}" />
      </a>

      <div class="cart-card__details">
        <div class="cart-card__top">
          <a href="/product_pages/index.html?product=${id}" class="cart-card__title-link">
            <h2 class="card__name">${name}</h2>
          </a>
          <button
            class="cart-card__remove"
            data-id="${id}"
            aria-label="Remove ${name} from cart"
            title="Remove item"
            type="button"
          >
            ×
          </button>
        </div>

        <p class="cart-card__color">${color}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${price.toFixed(2)}</p>
      </div>
    </li>
  `;
}

function displayCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const totalElement = document.querySelector('.cart-total__amount');
  const checkoutLink = document.querySelector('.cart-footer__checkout');

  if (!cartFooter || !totalElement || !checkoutLink) return;

  if (cartItems.length === 0) {
    cartFooter.classList.add('hidden');
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice ?? item.ListPrice ?? 0),
    0,
  );

  totalElement.textContent = `$${total.toFixed(2)}`;
  cartFooter.classList.remove('hidden');
}

function addRemoveFromCartListeners() {
  const removeButtons = document.querySelectorAll('.cart-card__remove');

  removeButtons.forEach((button) => {
    button.addEventListener('click', removeItemFromCart);
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');

  if (!productList) return;

  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-card">Your cart is empty.</li>';
    displayCartTotal(cartItems);
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join('');
  addRemoveFromCartListeners();
  displayCartTotal(cartItems);
}

function removeItemFromCart(event) {
  const itemId = event.currentTarget.dataset.id;
  const cartItems = getLocalStorage('so-cart') || [];
  const itemIndex = cartItems.findIndex(
    (item) => String(item.Id) === String(itemId),
  );

  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
  initNewsletter();
}

init();
