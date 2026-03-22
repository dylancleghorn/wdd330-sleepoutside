import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { initNewsletter } from './newsletter.mjs';

async function init() {
  await loadHeaderFooter();
  initNewsletter();

  const dataSource = new ProductData('tents');
  const productID = getParam('product');

  const product = new ProductDetails(productID, dataSource);
  product.init();
}

init();
