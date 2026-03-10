import { setLocalStorage, getLocalStorage } from './utils.mjs'; // getLocalStorage to pull existing cart items
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || []; // get existing cart items
  cartItems.push(product); // add cart items
  setLocalStorage('so-cart', cartItems); // push back to storage
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
