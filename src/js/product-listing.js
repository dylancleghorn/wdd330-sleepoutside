import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';

async function init() {
  await loadHeaderFooter();
  initNewsletter();

  const category = getParam('category') || 'tents';
  const dataSource = new ExternalServices();
  const listElement = document.querySelector('.product-list');

  if (!listElement) return;

  const myList = new ProductList(category, dataSource, listElement);
  await myList.init();
}

init();
