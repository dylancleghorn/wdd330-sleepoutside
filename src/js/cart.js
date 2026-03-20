import { LoadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  // message when no items in cart
  if (cartItems.length === 0) {
    productList.innerHTML = '<li class="cart-card">Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
// const cartElement = document.querySelector(".product-list");
// const cart = new ShoppingCart(cartElement);

LoadHeaderFooter().then(() => {
  renderCartContents();
  // cart.init();
});
