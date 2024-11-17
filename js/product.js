// Ürünleri Apı dan alan fonksiyon
export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");

    if (!response.ok) {
      throw new Error("Yanlış URL");
    }

    return await response.json();
  } catch (error) {
    console.log(`Hatta: ${error}`);
    return [];
  }
};

// Ürünleri Render eden fonksiyon

export const renderProducts = (products, addToCartCallBack) => {
  const productList = document.getElementById("product-list");

  productList.innerHTML = products
    .map(
      (product) =>
        `   <div class="product">
          <img
            src="${product.image}"
            alt="product-img"
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a class="add-to-cart"data-id="${product.id}">Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  // Add to cart buttonlarını seç

  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];

    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
