const ordersContainer = document.getElementById("orders-container");
let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

if (orderHistory.length === 0) {
  ordersContainer.innerHTML = "<p>No orders found.</p>";
} else {
  orderHistory.reverse().forEach((order, index) => {
    const section = document.createElement("div");
    section.classList.add("order-block");

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const statusSteps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];
    const currentStatus = statusSteps[Math.floor(Math.random() * 4)];

    section.innerHTML = `
      <h3>Order ID: ${order.id}</h3>
      <p>Date: ${order.timestamp}</p>
      <p><strong>Expected Delivery:</strong> ${deliveryDate.toDateString()}</p>
      
      <div class="status-tracker">
        ${statusSteps.map(step =>
          `<div class="status-step ${step === currentStatus ? 'active' : ''}">${step}</div>`).join("")}
      </div>

      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
           <img src="${item.image}" alt="${item.name}" />


            <div>
              <h4>${item.name}</h4>
              <p>Price: ₹${item.price}</p>
            </div>
          </div>
        `).join("")}
      </div>

      <button class="cancel-btn" data-order-id="${order.id}">Cancel Order</button>
    `;

    ordersContainer.appendChild(section);
  });
}

// Cancel Order Handler
ordersContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("cancel-btn")) {
    const orderId = e.target.dataset.orderId;
    const reason = prompt("Please provide a reason for cancellation:");
    if (reason) {
      alert(`Order ${orderId} cancelled for reason: ${reason}`);
      e.target.textContent = "Order Cancelled";
      e.target.disabled = true;
      e.target.style.background = "#ccc";
    }
  }
});
