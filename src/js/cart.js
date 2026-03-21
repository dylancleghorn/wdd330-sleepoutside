import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const productList = document.querySelector('.product-list');

  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-card">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image;
  const name = item.NameWithoutBrand || item.Name;

  return `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${image}"
      alt="${name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
}

init();
