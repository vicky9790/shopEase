// wishlist.js

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".wishlist-icon");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Highlight items already in wishlist
  wishlist.forEach((item) => {
    const card = document.querySelector(`.product-card[data-id="${item.id}"]`);
    if (card) {
      const icon = card.querySelector(".wishlist-icon i");
      if (icon) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        card.querySelector(".wishlist-icon").classList.add("active");
      }
    }
  });

  // Click handler
  icons.forEach((iconBox) => {
    iconBox.addEventListener("click", function () {
      const card = this.closest(".product-card");

      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = card.dataset.price;
      const image = card.dataset.image;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const index = wishlist.findIndex((item) => item.id === id);
      const heartIcon = this.querySelector("i");

      if (index > -1) {
        // Already in wishlist, remove
        wishlist.splice(index, 1);
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        this.classList.remove("active");
      } else {
        // Add to wishlist
        wishlist.push({ id, name, price, image });
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        this.classList.add("active");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });
});

// RENDERING wishlist items on wishlist.html
document.addEventListener("DOMContentLoaded", () => {
  const wishlistItemsContainer = document.getElementById("wishlist-items");

  if (wishlistItemsContainer) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = "<p>Your wishlist is empty 😢</p>";
    } else {
      wishlist.forEach(item => {
        const card = document.createElement("div");
        card.className = "wishlist-card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="wishlist-info">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <div class="wishlist-actions">
              <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
              <button onclick="removeFromWishlist('${item.id}')">Remove</button>
            </div>
          </div>
        `;
        wishlistItemsContainer.appendChild(card);
      });

      // Attach event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
          const id = this.dataset.id;
          const name = this.dataset.name;
          const price = this.dataset.price;
          const image = this.dataset.image;

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find(item => item.id === id);

          if (!existing) {
            cart.push({ id, name, price, image, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("✅ Item added to cart!");
          } else {
            alert("🛒 Item already in cart!");
          }
        });
      });
    }
  }
});

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload(); // refresh after removal
}

// wishlist.js for .deal-card

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".wishlist-icon");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Highlight items already in wishlist
  wishlist.forEach((item) => {
    const card = document.querySelector(`.deal-card[data-id="${item.id}"]`);
    if (card) {
      const icon = card.querySelector(".wishlist-icon i");
      if (icon) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        card.querySelector(".wishlist-icon").classList.add("active");
      }
    }
  });

  // Click handler
  icons.forEach((iconBox) => {
    iconBox.addEventListener("click", function () {
      const card = this.closest(".deal-card");

      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = card.dataset.price;
      const image = card.dataset.image;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const index = wishlist.findIndex((item) => item.id === id);
      const heartIcon = this.querySelector("i");

      if (index > -1) {
        // Already in wishlist, remove
        wishlist.splice(index, 1);
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        this.classList.remove("active");
      } else {
        // Add to wishlist
        wishlist.push({ id, name, price, image });
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        this.classList.add("active");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });
});

// RENDERING wishlist items on wishlist.html
document.addEventListener("DOMContentLoaded", () => {
  const wishlistItemsContainer = document.getElementById("wishlist-items");

  if (wishlistItemsContainer) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = "<p>Your wishlist is empty 😢</p>";
    } else {
      wishlist.forEach(item => {
        const card = document.createElement("div");
        card.className = "wishlist-card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="wishlist-info">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <div class="wishlist-actions">
              <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
              <button onclick="removeFromWishlist('${item.id}')">Remove</button>
            </div>
          </div>
        `;
        wishlistItemsContainer.appendChild(card);
      });

      // Attach event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
          const id = this.dataset.id;
          const name = this.dataset.name;
          const price = this.dataset.price;
          const image = this.dataset.image;

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find(item => item.id === id);

          if (!existing) {
            cart.push({ id, name, price, image, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("✅ Item added to cart!");
          } else {
            alert("🛒 Item already in cart!");
          }
        });
      });
    }
  }
});

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload(); // refresh after removal
}


