"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];

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
