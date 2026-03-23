import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter, getParam } from "./utils.mjs";
const category = getParam("category");
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

LoadHeaderFooter().then(() => {
  const title = document.querySelector(".title");
  if (title) {
    title.textContent = `Top Products: ${category}`;
  }
  productList.init();
});
