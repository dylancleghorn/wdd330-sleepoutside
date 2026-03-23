const baseURL = import.meta.env.VITE_SERVER_URL;
console.log("baseURL:", baseURL);
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData(category = this.category) {
    if (!category) {
      throw new Error("Category is required to fetch product data");
    }
    console.log(`Fetching data for category: ${category}`);
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    console.log("API response:", data);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
