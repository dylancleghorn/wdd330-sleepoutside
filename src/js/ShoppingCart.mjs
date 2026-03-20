import { renderListWithTemplate } from "./utils.mjs";
function cartItemTemplate(item) {
  return `<li class="cart-item">
    <img src="${item.Image}" alt="Image of ${item.Name}">
    <h3 class="cart-item__name">${item.Name}</h3>
    <p class="cart-item__price">$${item.FinalPrice}</p>
    <p class="cart-item__quantity">Qty: ${item.Quantity}</p>
  </li>`;
}
export default class ShoppingCart {
  constructor(listElement, key = "so-cart") {
    this.listElement = listElement;
    this.key = key; // localStorage key for cart
  }

  async init() {
    const cartItems = this.getCartItems();
    this.renderList(cartItems);
  }

  getCartItems() {
    const cart = localStorage.getItem(this.key);
    return cart ? JSON.parse(cart) : [];
  }

  renderList(list) {
    renderListWithTemplate(cartItemTemplate, this.listElement, list);
  }
}
