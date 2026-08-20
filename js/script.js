"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const statNumbers = document.querySelectorAll(".stat-number");
const typingText = document.querySelector(".typing-text");
const typingWords = ["world", "developers", "kids"];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typingSpeed = 120;
const deletingSpeed = 70;
const pauseAfterTyping = 1400;
const pauseAfterDeleting = 400;

const skillTracks = document.querySelectorAll(".skill-track");

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

// HERO ANIMATION TYPING
function typeText() {
  const currentWord = typingWords[wordIndex];

  if (!isDeleting) {
    characterIndex++;

    typingText.textContent = currentWord.slice(0, characterIndex);

    if (characterIndex === currentWord.length) {
      isDeleting = true;

      setTimeout(typeText, pauseAfterTyping);
      return;
    }

    setTimeout(typeText, typingSpeed);
  } else {
    characterIndex--;

    typingText.textContent = currentWord.slice(0, characterIndex);

    if (characterIndex === 0) {
      isDeleting = false;

      wordIndex = (wordIndex + 1) % typingWords.length;

      setTimeout(typeText, pauseAfterDeleting);
      return;
    }

    setTimeout(typeText, deletingSpeed);
  }
}

typeText();

// SKILLS  MARQUEE ANIMATION

function buildMarquee(track) {
  const marquee = track.closest(".skill-marquee");

  let originalItems = [
    ...track.querySelectorAll(":scope > .skill-item:not(.marquee-clone)"),
  ];

  track.querySelectorAll(".marquee-clone").forEach((clone) => {
    clone.remove();
  });

  originalItems = [
    ...track.querySelectorAll(":scope > .skill-item:not(.marquee-clone)"),
  ];

  if (!originalItems.length) return;

  const firstCloneSet = originalItems.map((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add("marquee-clone");
    clone.setAttribute("aria-hidden", "true");

    track.appendChild(clone);

    return clone;
  });

  const firstOriginal = originalItems[0];
  const firstClone = firstCloneSet[0];
  const distance = firstClone.offsetLeft - firstOriginal.offsetLeft;
  track.style.setProperty("--marquee-distance", `-${distance}px`);
  const requiredWidth = marquee.clientWidth + distance;
  while (track.scrollWidth < requiredWidth) {
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);

      clone.classList.add("marquee-clone");
      clone.setAttribute("aria-hidden", "true");

      track.appendChild(clone);
    });
  }
}

function buildAllMarquees() {
  skillTracks.forEach((track) => {
    buildMarquee(track);
  });
}

buildAllMarquees();

let marqueeResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(marqueeResizeTimer);

  marqueeResizeTimer = setTimeout(() => {
    buildAllMarquees();
  }, 150);
});
