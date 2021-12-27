// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";
// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
// cart product
let productID;

// show product when page loads
window.addEventListener("DOMContentLoaded", async () => {
  const urlID = window.location.search;
  try {
    let response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      let data = await response.json();
      const {
        fields: { name, price, image: img, description, company, colors, id },
      } = data;
      productID = id;
      let clr = colors
        .map((color) => {
          return `<span class="product-color" style="background: ${color}"></span>`;
        })
        .join("");
      let Image = img[0].thumbnails.large.url;
      let product = `
      <img
          src="${Image}"
          class="single-product-img img"
          alt=""
        />
        <article class="single-product-info">
          <div>
            <h2 class="single-product-title">${name}</h2>
            <p class="single-product-company text-slanted">by ${company}</p>
            <p class="single-product-price">${formatPrice(price)}</p>
            <div class="single-product-colors">${clr}</div>
            <p class="single-product-desc">${description}</p>
            <button class="addToCartBtn btn" data-id="${productID}">add to cart</button>
          </div>
        </article>
      `;

      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      centerDOM.innerHTML = product;
      const cartBtn = getElement(".addToCartBtn");
      cartBtn.addEventListener('click', () => {
          addToCart(productID)
      })
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div>
          <h3 class="error">Sorry, something went wrong</h3>
          <a href="index.html" class="btn">back home</a>
        </div>`;
    }
  } catch (err) {
    console.log(err);
  }
  loading.style.display = "none";
});