import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  let response = await fetch(allProductsUrl).catch((err) => console.log(err));
  if (response) {
    let data = await response.json();
    return data;
  }
  else {
      console.log(`problem with launching the url by the name of ${allProductsUrl}`);
  }
};

export default fetchProducts;
