document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("menu-toggle")?.addEventListener("click", function () {
    document.getElementById("nav-links")?.classList.toggle("show");
  });

  const slides = document.querySelectorAll(".banner");
  const dots = document.querySelectorAll(".dot");
  const slider = document.querySelector(".banner-slider");

  let current = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    current = index;
    resetAutoSlide();
  }

  function autoSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
  }

  if (slides.length) resetAutoSlide();

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // Swipe handling
  let startX = 0;
  if (slider) {
    slider.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      handleSwipe(endX - startX);
    });

    slider.addEventListener("mousedown", e => {
      startX = e.clientX;
    });

    slider.addEventListener("mouseup", e => {
      handleSwipe(e.clientX - startX);
    });
  }

  function handleSwipe(distance) {
    if (Math.abs(distance) < 30) return;
    if (distance > 0) {
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    } else {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }
  }

  // Carousel scrolling functions
  window.scrollCarousel = function (direction) {
    const container = document.getElementById("product-carousel");
    const scrollAmount = 300;
    if (container) {
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  window.scrollDeals = function (direction) {
    const container = document.getElementById("deals-carousel");
    const scrollAmount = 300;
    if (container) {
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  window.scrollFlash = function (direction) {
    const container = document.getElementById("flash-carousel");
    const scrollAmount = 300;
    if (container) {
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  // Countdown timer
  function startFlashTimer(hours = 24) {
    const endTime = new Date().getTime() + hours * 60 * 60 * 1000;
    const timerDisplay = document.getElementById("flash-timer");

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        timerDisplay.textContent = "00:00:00";
        clearInterval(timerInterval);
        return;
      }

      const h = String(Math.floor(distance / (1000 * 60 * 60))).padStart(2, "0");
      const m = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const s = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

      timerDisplay.textContent = `${h}:${m}:${s}`;
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  startFlashTimer();

  const carousel = document.getElementById("testimonial-carousel");
  if (carousel) {
    setInterval(() => {
      carousel.scrollLeft += 280;
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0;
      }
    }, 4000);
  }

  window.submitNewsletter = function (e) {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;
    const msg = document.getElementById("newsletter-msg");

    if (email) {
      msg.textContent = `✅ Thanks! We've sent a 10% coupon to ${email}`;
      document.getElementById("newsletterEmail").value = "";
    } else {
      msg.textContent = "❌ Please enter a valid email.";
    }
  };

  const placeBtn = document.querySelector(".place-order-btn");
  if (placeBtn) {
    placeBtn.addEventListener("click", () => {
      alert("✅ Your order has been placed successfully!");
    });
  }

  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    icon.addEventListener("click", function () {
      this.classList.toggle("active");
      const productId = this.getAttribute("data-id");
    });
  });
});


