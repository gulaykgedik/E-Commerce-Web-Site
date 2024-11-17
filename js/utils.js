// Localstorage a ekleme yapacak fonksiyon
export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Localstorage dan verileri alan fonksiyon
export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// Sepet toplamını bulan fonksiyon

export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const updateCartIcon = (cart) => {
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");

  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  i.setAttribute("data-quantity", totalQuantity);
};
