// DOM Elements
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const bookingModal = document.getElementById("booking-modal");
const loginSubmit = document.getElementById("login-submit");
const signupSubmit = document.getElementById("signup-submit");
const bookingSubmit = document.getElementById("booking-submit");
const searchBtn = document.getElementById("search-btn");
const accordionItems = document.querySelectorAll(".accordion-item");
const tabLinks = document.querySelectorAll(".tab-link");
const tabPanes = document.querySelectorAll(".tab-pane");
const mainContent = document.querySelectorAll("section:not(.dashboard)");
const dashboard = document.getElementById("user-dashboard");

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Open booking modal with destination info
function openBookingModal(destination, basePrice) {
  document.getElementById("booking-destination").value = destination;
  // Calculate an initial price
  updatePrice(basePrice);
  openModal("booking-modal");
}

// Update the price based on selections
function updatePrice(basePrice) {
  const travelers = parseInt(
    document.getElementById("booking-travelers").value
  );
  const travelClass = document.getElementById("booking-class").value;

  let multiplier = 1;
  if (travelClass === "luxury") multiplier = 2;
  if (travelClass === "vip") multiplier = 4;

  const totalPrice = basePrice * travelers * multiplier;
  document.getElementById("booking-price").value =
    "$" + totalPrice.toLocaleString();
}

// Select a travel package
function selectPackage(packageType) {
  // In a real app, this would store the selection
  alert(
    `You've selected the ${packageType} package. Please log in to continue booking.`
  );
  openModal("login-modal");
}

// Select an accommodation
function selectAccommodation(accommodationType) {
  // In a real app, this would store the selection
  alert(
    `You've selected ${accommodationType}. Please log in to continue booking.`
  );
  openModal("login-modal");
}

// Initialize event listeners
function initEventListeners() {
  // Modal triggers
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("login-modal");
  });

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("signup-modal");
  });

  // Form submissions
  loginSubmit.addEventListener("click", () => {
    // In a real app, validate credentials here
    closeModal("login-modal");
    showDashboard();
  });

  signupSubmit.addEventListener("click", () => {
    // In a real app, create account here
    closeModal("signup-modal");
    showDashboard();
  });

  bookingSubmit.addEventListener("click", () => {
    // In a real app, process booking here
    closeModal("booking-modal");
    showDashboard();
    alert("Your space journey has been booked successfully!");
  });

  searchBtn.addEventListener("click", () => {
    // In a real app, this would search for flights
    alert("Searching for available flights...");
    // For demo, we'll just show results
    openBookingModal("Earth Orbit", 250000);
  });

  // Accordion functionality
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // Tab functionality
  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const tab = link.getAttribute("data-tab");

      // Remove active class from all tabs
      tabLinks.forEach((item) => item.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to selected tab
      link.classList.add("active");
      document.getElementById(tab).classList.add("active");
    });
  });

  // Price calculation for booking form
  const bookingTravelers = document.getElementById("booking-travelers");
  const bookingClass = document.getElementById("booking-class");

  if (bookingTravelers && bookingClass) {
    bookingTravelers.addEventListener("change", () => {
      const basePrice = getBasePrice(
        document.getElementById("booking-destination").value
      );
      updatePrice(basePrice);
    });

    bookingClass.addEventListener("change", () => {
      const basePrice = getBasePrice(
        document.getElementById("booking-destination").value
      );
      updatePrice(basePrice);
    });
  }
}

// Get base price based on destination
function getBasePrice(destination) {
  const prices = {
    "Earth Orbit": 250000,
    "Lunar Base Alpha": 750000,
    "Celestial Space Station": 500000,
    "Mars Colony": 2500000,
  };
  return prices[destination] || 250000;
}

// Show dashboard and hide other content
function showDashboard() {
  mainContent.forEach((section) => (section.style.display = "none"));
  dashboard.style.display = "block";
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("signup-btn").style.display = "none";

  // Start countdown
  startCountdown();
}

// Countdown timer
function startCountdown() {
  // Set the launch date (2 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 2);

  // Update countdown every second
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // If countdown is over
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").textContent = "0";
      document.getElementById("hours").textContent = "0";
      document.getElementById("minutes").textContent = "0";
      document.getElementById("seconds").textContent = "0";
    }
  }, 1000);
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) closeModal("login-modal");
  if (e.target === signupModal) closeModal("signup-modal");
  if (e.target === bookingModal) closeModal("booking-modal");
});

// Initialize app
document.addEventListener("DOMContentLoaded", initEventListeners);