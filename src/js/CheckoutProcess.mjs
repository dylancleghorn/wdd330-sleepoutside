import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.displayOrderTotals();
  }

  calculateItemSummary() {
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    const itemCount = this.list.length;
    const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);
    const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);

    this.itemTotal = this.list.reduce((sum, item) => sum + Number(item.FinalPrice || 0), 0);

    if (itemNumElement) {
      itemNumElement.innerText = itemCount;
    }

    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const formElement = form || document.forms.checkout;

    if (!formElement?.reportValidity()) {
      return null;
    }

    this.calculateOrderTotal();

    const order = formDataToJSON(formElement);
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    const messageElement = document.getElementById('checkout-message');

    try {
      const response = await services.checkout(order);

      if (messageElement) {
        messageElement.textContent = 'Order submitted successfully.';
      }

      setLocalStorage(this.key, []);
      return response;
    } catch (error) {
      if (messageElement) {
        messageElement.textContent = 'There was a problem submitting your order. Please verify your payment details and try again.';
      }

      throw error;
    }
  }
}
