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

// PROJECTS - OPEN MODAL
const projects = [
  {
    id: "website-majja",

    title: "Majja",

    type: "Website",

    cardDescription:
      "A healthcare website for exploring MAJJA Klinik’s services, specialists, and booking appointments.",

    description:
      "MAJJA Klinik is a healthcare website designed to connect patients with specialized medical services, including fertility and reproductive care, obstetrics, pediatrics, internal medicine, vaccination, and nutrition. The website provides information about the clinic’s services and doctors, patient testimonials, and convenient appointment booking to help patients access the care they need.",

    image: "/assets/img-majja.png",

    timeline: "1 week",

    tech: ["Typescript", "Tailwind CSS", "REST API"],

    website: "https://klinikmajja.com/",

    appStore: null,

    playStore: null,
  },

  {
    id: "website-asyah",

    title: "Asyah Landing Page",

    type: "Website",

    cardDescription:
      "A digital Sharia investment platform connecting users to transparent, asset-backed opportunities.",

    description:
      "Asyah is a Sharia-compliant digital participation platform that gives individuals and institutions access to structured, asset-backed investment opportunities through SRIA tokenization, with transparent and verifiable records.",

    image: "/assets/img-asyah.png",

    timeline: "2 weeks",

    tech: ["Typescript", "Tailwind CSS", "REST API"],

    website: "https://asyah.co/id#intro",

    appStore: null,

    playStore: null,
  },
  {
    id: "mobile-qliper",

    title: "Qliper",

    type: "Mobile App",

    cardDescription:
      "A decentralized creator marketplace where users earn rewards by participating in sponsored content campaigns.",

    description:
      "Qliper is a decentralized content creation marketplace where creators join themed campaigns, submit videos, memes, edits, or remixes, and compete for rewards funded in SOL. Rewards are distributed based on content performance, such as views and engagement.",

    image: "/assets/img-qliper.webp",

    timeline: "1 month",

    tech: ["Flutter", "Dart", "REST API"],

    website: null,

    appStore: "https://apps.apple.com/id/app/qliper/id6751450324",
  },

  {
    id: "website-propex",

    title: "Propex",

    type: "Web-App",

    cardDescription:
      "An on-chain real estate platform that enables global property sales and digital ownership.",

    description:
      "Propex is a real estate technology platform that helps developers and brokers launch branded property marketplaces, reach global buyers, accept fiat or crypto payments, and manage property ownership transparently through blockchain technology.",

    image: "/assets/img-propex.jpeg",

    timeline: "3 months",

    tech: ["Typescript", "Tailwind CSS", "REST API"],

    website: "https://propex.app/",

    appStore: null,

    playStore: null,
  },
];

const projectsGrid = document.querySelector("#projects-grid");

const projectModal = document.querySelector("#project-modal");

const projectModalImage = document.querySelector("#project-modal-image");

const projectModalTitle = document.querySelector("#project-modal-title");

const projectModalDescription = document.querySelector(
  "#project-modal-description",
);

const projectModalTimeline = document.querySelector("#project-modal-timeline");

const projectModalTech = document.querySelector("#project-modal-tech");

const projectModalLinks = document.querySelector("#project-modal-links");

const projectModalClose = document.querySelector(".project-modal-close");

const projectModalBackdrop = document.querySelector(".project-modal-backdrop");

function renderProjects() {
  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <button
          class="project-card"
          type="button"
          data-project-id="${project.id}"
        >
          <div class="project-card-image-wrapper">
            <img
              src="${project.image}"
              alt="${project.title}"
              class="project-card-image"
            />
          </div>

          <div class="project-card-content">
            <span class="project-card-type">
              ${project.type}
            </span>

            <h3 class="project-card-title">
              ${project.title}
            </h3>

            <p class="project-card-description">
              ${project.cardDescription}
            </p>

            <div class="project-card-action">
              <span>View Project</span>

              <i
                class="fa-solid fa-arrow-right"
              ></i>
            </div>
          </div>
        </button>
      `,
    )
    .join("");
}
function openProjectModal(project) {
  // Image
  projectModalImage.src = project.image;
  projectModalImage.alt = project.title;

  // Basic information
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;
  projectModalTimeline.textContent = project.timeline;

  // Tech Stack
  projectModalTech.innerHTML = project.tech
    .map(
      (tech) => `
          <span class="project-tech">
            ${tech}
          </span>
        `,
    )
    .join("");

  // External Links
  const links = [];

  // Website
  if (project.website) {
    links.push(`
        <a
          href="${project.website}"
          target="_blank"
          rel="noopener noreferrer"
          class="project-external-link"
        >
          <i class="fa-solid fa-globe"></i>
          Visit Website
        </a>
      `);
  }

  // App Store
  if (project.appStore) {
    links.push(`
        <a
          href="${project.appStore}"
          target="_blank"
          rel="noopener noreferrer"
          class="project-external-link"
        >
          <i class="fa-brands fa-apple"></i>
          App Store
        </a>
      `);
  }

  // Google Play
  if (project.playStore) {
    links.push(`
        <a
          href="${project.playStore}"
          target="_blank"
          rel="noopener noreferrer"
          class="project-external-link"
        >
          <i class="fa-brands fa-google-play"></i>
          Google Play
        </a>
      `);
  }

  projectModalLinks.innerHTML = links.join("");

  // Open Modal
  projectModal.classList.add("open");

  projectModal.setAttribute("aria-hidden", "false");

  // Prevent page behind modal from scrolling
  document.body.style.overflow = "hidden";
}
function closeProjectModal() {
  projectModal.classList.remove("open");

  projectModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

projectsGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");

  if (!card) return;

  const project = projects.find((item) => item.id === card.dataset.projectId);

  if (!project) return;

  openProjectModal(project);
});

projectModalClose.addEventListener("click", closeProjectModal);

projectModalBackdrop.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});

renderProjects();
