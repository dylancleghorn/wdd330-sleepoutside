import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';
import Alert from './Alert.js';

async function init() {
  await loadHeaderFooter();

  initNewsletter();

  const dataSource = new ProductData('tents');
  const element = document.querySelector('.product-list');
  const productList = new ProductList('Tents', dataSource, element);
  const alertSystem = new Alert();
  alertSystem.init()
  productList.init();
}

init();

