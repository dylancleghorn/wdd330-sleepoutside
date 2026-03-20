import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter } from "./utils.mjs";
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

LoadHeaderFooter().then(() => {
  productList.init();
});
