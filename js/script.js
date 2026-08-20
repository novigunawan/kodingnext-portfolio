"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const statNumbers = document.querySelectorAll(".stat-number");

// Navigation Animation on click and on close
function closeNavigation() {
  navMenu.classList.remove("open");

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");

  const icon = navToggle.querySelector("i");

  icon.classList.remove("fa-xmark");
  icon.classList.add("fa-bars");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  navToggle.setAttribute("aria-expanded", String(isOpen));

  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );

  const icon = navToggle.querySelector("i");

  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-xmark", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

// Counter for Hero Stats
function animateCounter(element) {
  const target = Number(element.dataset.target);

  const duration = 1200;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const currentValue = Math.floor(progress * target);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

statNumbers.forEach((number) => {
  statsObserver.observe(number);
});
