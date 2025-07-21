// js/cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".add-to-cart");
  
    cartButtons.forEach(button => {
      button.addEventListener("click", () => {
        const product = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: parseFloat(button.dataset.price),
          image: button.dataset.image,
          quantity: 1
        };
  
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        // Check if product already exists
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push(product);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
      });
    });
  });

