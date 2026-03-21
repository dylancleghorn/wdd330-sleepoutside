import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');

  if (!productList) return;

  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-card">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join('');
  addRemoveFromCartListeners();
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image || '';
  const name = item.NameWithoutBrand || item.Name || 'Product';
  const color = item.Colors?.[0]?.ColorName || '';
  const price = item.FinalPrice ?? item.ListPrice ?? 0;

  return `
    <li class="cart-card cart-card--enhanced divider">
      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${image}" alt="${name}" />
      </a>

      <div class="cart-card__details">
        <div class="cart-card__top">
          <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__title-link">
            <h2 class="card__name">${name}</h2>
          </a>
          <button
            class="cart-card__remove"
            data-id="${item.Id}"
            aria-label="Remove ${name} from cart"
            title="Remove item"
            type="button"
          >
            ×
          </button>
        </div>

        <p class="cart-card__color">${color}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${price}</p>
      </div>
    </li>
  `;
}

function addRemoveFromCartListeners() {
  const removeButtons = document.querySelectorAll('.cart-card__remove');

  removeButtons.forEach((button) => {
    button.addEventListener('click', removeItemFromCart);
  });
}

function removeItemFromCart(event) {
  const itemId = event.currentTarget.dataset.id;
  const cartItems = getLocalStorage('so-cart') || [];
  const updatedCart = cartItems.filter((item) => String(item.Id) !== String(itemId));

  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
}

init();