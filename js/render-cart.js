document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const summary = document.querySelector(".cart-summary");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // If cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    summary.innerHTML = "";
    return;
  }

  let total = 0;
  let itemsHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;

    // ✅ Fix: Build proper relative image path
    let imagePath = item.image.startsWith("assets/")
      ? item.image
      : "assets/" + item.image.replace(/^\/?/, "");

    itemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <div class="quantity">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <input type="text" value="${item.quantity}" readonly />
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        </div>
      </div>
    `;
  });

 

  cartItemsContainer.innerHTML = itemsHTML;

  // Summary Section
  summary.innerHTML = `
    <div class="summary-box">
      <h2>🧾 Order Summary</h2>
      <div class="summary-details">
        <div class="cart-actions">
          <p><strong>Items:</strong> <strong>${cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
          <p><strong>Total:</strong> ₹${total.toLocaleString()}</p>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  `;

  // Checkout button click
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      localStorage.setItem("checkoutCart", JSON.stringify(cart));
      window.location.href = "checkout.html";
    });
  }
});

// 🔄 Update quantity
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = cart.find(p => p.id === id);
  if (!product) return;

  product.quantity += change;
  if (product.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ❌ Remove item
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
