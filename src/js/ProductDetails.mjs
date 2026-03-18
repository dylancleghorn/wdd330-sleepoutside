import { setLocalStorage } from "./utils.mjs";

function addProductToCart(product) {
  console.log(product);
  console.log(`Adding to cart: ${product.Name}`);
  setLocalStorage(`${product.Id}`, product);
}

export class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .querySelector("#addToCart")
      .addEventListener("click", () => addProductToCart(this.product));
  }
  renderProductDetails() {
    const t1 = document.querySelector("h3");
    t1.textContent = this.product.Name;
    const t2 = document.querySelector("h2");
    t2.textContent = this.product.NameWithoutBrand;
    let img = document.querySelector("img.divider");
    img.setAttribute("src", this.product.Image);
    img.setAttribute("alt", this.product.Name);

    const price = document.querySelector(".product-card__price");
    price.textContent = `$${this.product.FinalPrice}`;
    const color = document.querySelector(".product__color");
    color.textContent = this.product.Colors[0].ColorName;
    const description = document.querySelector(".product__description");
    description.innerHTML = this.product.DescriptionHtmlSimple;
  }
}
