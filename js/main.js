import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  let cart = getFromLocalStorage();
  if (window.location.pathname.includes("cart.html")) {
    console.log(`Cart sayfası`);

    renderCartItems();
    displayCartTotal();
  } else {
    console.log(`Ana sayfa`);
    const product = await fetchProducts();
    renderProducts(product, (event) => {
      addToCart(event, product);
    });
  }

  updateCartIcon(cart);
});
