document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".wishlist-icon");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Highlight items already in wishlist
  wishlist.forEach((item) => {
    const card = document.querySelector(`.product-card[data-id="${item.id}"]`) || document.querySelector(`.deal-card[data-id="${item.id}"]`);
    if (card) {
      const icon = card.querySelector(".wishlist-icon i");
      if (icon) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        card.querySelector(".wishlist-icon").classList.add("active");
      }
    }
  });

  // Toggle Wishlist on click
  icons.forEach((iconBox) => {
    iconBox.addEventListener("click", function () {
      const card = this.closest(".product-card") || this.closest(".deal-card");
      const { id, name, price, image } = card.dataset;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const index = wishlist.findIndex((item) => item.id === id);
      const heartIcon = this.querySelector("i");

      if (index > -1) {
        wishlist.splice(index, 1);
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        this.classList.remove("active");
      } else {
        wishlist.push({ id, name, price, image });
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        this.classList.add("active");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });

  renderWishlistItems();
});

function renderWishlistItems() {
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  if (!wishlistItemsContainer) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistItemsContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = "<p>Your wishlist is empty 😢</p>";
    return;
  }

  wishlist.forEach(item => {
    let imagePath = item.image;
    if (!imagePath.startsWith("shopEase/")) {
      imagePath = "shopEase/" + imagePath.replace(/^\/?/, "");
    }

    const card = document.createElement("div");
    card.className = "wishlist-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="wishlist-info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <div class="wishlist-actions">
          <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
          <button class="remove-from-wishlist-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
    wishlistItemsContainer.appendChild(card);
  });

  setupWishlistButtons();
}

function setupWishlistButtons() {
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const { id, name, price, image } = this.dataset;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === id);

      if (!existing) {
        cart.push({ id, name, price, image, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("✅ Added to cart!");
      } else {
        alert("🛒 Already in cart!");
      }
    });
  });

  document.querySelectorAll(".remove-from-wishlist-btn").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter(item => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlistItems();
    });
  });
}

