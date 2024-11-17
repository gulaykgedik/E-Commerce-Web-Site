// Sepete ekleme yapacak fonksiyon
import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();

export const addToCart = (event, products) => {
  const productId = parseInt(event.target.dataset.id);

  const product = products.find((product) => product.id === productId);
  if (product) {
    const exitingItem = cart.find((item) => item.id === productId);
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      };
      cart.push(cartItem);
      event.target.textContent = "Added";

      saveToLocalStorage(cart);
      // Sepet iconunu güncelle
      updateCartIcon(cart);
    }
  }
};

// Sepetten eleman silen fonksiyon
const removeFromCart = (event) => {
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  // LocalStorage ı güncelle
  saveToLocalStorage(cart);
  // Sayfayı ı güncelle
  renderCartItems();
  // Toplam miktarı güncelle
  displayCartTotal();
  // Sepet iconunu güncelle
  updateCartIcon(cart);
};

export const renderCartItems = () => {
  const cartItemElement = document.querySelector("#cartItems");

  cartItemElement.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
                  <img src="${item.image}" alt="">
                  <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <input 
                    type="number" 
                    min="1" 
                    value=${item.quantity} 
                    class="cart-item-quantity"
                    data-id="${item.id}"
                    />
                  </div>
                  <h2 class="cart-item-price">$${item.price}</h2>
                  <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
      `
    )
    .join("");

  const removeButtons = document.querySelectorAll(".remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQantityChange);
  }
};

const onQantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productID = +event.target.dataset.id;

  if (newQuantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);

    if (!cartItem) return;

    cartItem.quantity = newQuantity;
    saveToLocalStorage(cart);
    displayCartTotal();
    updateCartIcon(cart);
  }
};

export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");

  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
