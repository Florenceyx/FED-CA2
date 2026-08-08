//================ NAV SCROLL STATE ================

const nav = document.getElementById("siteNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

//================ SCROLL CUE ================

document.getElementById("scrollCue").addEventListener("click", () => {
  document.getElementById("journey").scrollIntoView({ behavior: "smooth" });
});

//================ RIVER JOURNEY SCROLLYTELLING ================

const storyBlocks = document.querySelectorAll(".story-block");
const journeyVisual = document.getElementById("journeyVisual");
const riverPath = document.getElementById("riverPath");
const boat = document.getElementById("boat"); // optional — journey works fine without it
const stageIndexEl = document.getElementById("stageIndex");
const stageNameEl = document.getElementById("stageName");
const visualImageEl = document.getElementById("visualImage");
const dots = document.querySelectorAll(".dot");

const stories = [
  "Where the Mist Begins",
  "Yangshuo",
  "Bamboo Rafting",
  "Villages Along the Bank",
  "Terraces in the Distance",
  "Where the River Rests"
];

// One photo per stage — six images because there are six moments on the water.
// Replace these filenames with your own six photos (same folder as index.html).
const stageImages = [
  "../images/Guilin/story1.jpeg",
  "../images/Guilin/story2.jpeg",
  "../images/Guilin/story3.jpeg",
  "../images/Guilin/story4.jpeg",
  "../images/Guilin/story5.jpeg",
  "../images/Guilin/story6.jpeg"
];

const pathLength = riverPath ? riverPath.getTotalLength() : 0;
const storyRiverSvg = document.querySelector(".story-river");
let activeIndex = 0;

function moveBoatTo(index) {
  // The boat illustration is optional — if it isn't in the page, skip silently
  // instead of throwing, so the rest of the site keeps working.
  if (!boat || !riverPath) return;

  const total = stories.length;
  const fraction = (index + 0.5) / total;
  const dist = fraction * pathLength;
  const point = riverPath.getPointAtLength(dist);
  const nextPoint = riverPath.getPointAtLength(Math.min(dist + 4, pathLength));
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

  // The background svg stretches non-uniformly to cover the tall story
  // column, so counter-scale the boat to keep its own proportions correct.
  const box = storyRiverSvg.getBoundingClientRect();
  const scaleX = box.width / 400;
  const scaleY = box.height / 1080;
  const correction = scaleY ? scaleX / scaleY : 1;

  boat.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle + 90}deg) scale(1, ${correction})`;
}

function updateVisualImage(index) {
  if (!visualImageEl) return;
  visualImageEl.style.opacity = "0";
  window.setTimeout(() => {
    visualImageEl.src = stageImages[index];
    visualImageEl.alt = stories[index];
    visualImageEl.style.opacity = "1";
  }, 180);
}

function setActiveStage(index) {
  if (index === activeIndex) return;
  activeIndex = index;

  journeyVisual.dataset.stage = index;
  stageIndexEl.textContent = String(index + 1).padStart(2, "0");
  stageNameEl.textContent = stories[index];
  moveBoatTo(index);
  updateVisualImage(index);

  dots.forEach(dot => dot.classList.toggle("active", Number(dot.dataset.index) === index));
  storyBlocks.forEach(block => block.classList.toggle("active", Number(block.dataset.index) === index));
}

const storyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveStage(Number(entry.target.dataset.index));
    }
  });
}, { threshold: 0, rootMargin: "-50% 0px -50% 0px" });

storyBlocks.forEach(block => storyObserver.observe(block));

// initialise boat position and first active story
moveBoatTo(0);
storyBlocks[0].classList.add("active");

// keep the boat aligned with the river path if the window is resized
window.addEventListener("resize", () => moveBoatTo(activeIndex));

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = document.querySelector(`.story-block[data-index="${dot.dataset.index}"]`);
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

//================ FOOD MODAL ================

const foodItems = document.querySelectorAll(".food-item");
const foodModal = document.getElementById("foodModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const foodTitle = document.getElementById("foodTitle");
const foodDescription = document.getElementById("foodDescription");
const modalImage = document.getElementById("modalImage");

function openFoodModal(item) {
  foodTitle.textContent = item.dataset.title;
  foodDescription.textContent = item.dataset.description;

  // Reuse the exact same photo shown on the card, so the modal image is
  // never a different picture from the one the person just clicked.
  const cardImg = item.querySelector(".food-thumb img");
  if (modalImage && cardImg) {
    modalImage.src = cardImg.src;
    modalImage.alt = cardImg.alt;
  }

  foodModal.classList.add("open");
  foodModal.setAttribute("aria-hidden", "false");
}

function closeFoodModal() {
  foodModal.classList.remove("open");
  foodModal.setAttribute("aria-hidden", "true");
}

foodItems.forEach(item => {
  item.addEventListener("click", () => openFoodModal(item));
});

modalBackdrop.addEventListener("click", closeFoodModal);
modalClose.addEventListener("click", closeFoodModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeFoodModal();
});

//================ ITINERARY TIMELINE ================

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineFill = document.getElementById("timelineFill");

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      const furthest = Math.max(
        ...Array.from(document.querySelectorAll(".timeline-item.active"))
          .map(el => Number(el.dataset.index))
      );
      const percent = (furthest / (timelineItems.length - 1)) * 100;
      timelineFill.style.width = percent + "%";
    }
  });
}, { threshold: 0.6 });

timelineItems.forEach(item => timelineObserver.observe(item));

//================ GENERAL REVEAL ANIMATION ================

const revealTargets = document.querySelectorAll(".food-item, .tip-card");
revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealTargets.forEach(el => revealObserver.observe(el));

//================ CLICK-TO-PLAY VIDEO ================
// Loads the YouTube iframe only when the person clicks play, instead of on
// page load. This sidesteps "Error 153 / video player configuration error",
// which is most often caused by the iframe trying to load from a file://
// page instead of a real server, or from a video whose owner disabled
// embedding. The fallback link under the video always works either way.

const videoCard = document.getElementById("videoCard");
const videoPlayBtn = document.getElementById("videoPlayBtn");
const VIDEO_ID = "rB4Ir88aDuA";

if (videoPlayBtn && videoCard) {
  videoPlayBtn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`;
    iframe.title = "Guilin, China 4K Drone | Majestic Karst Mountains & Li River Aerial View";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    videoCard.innerHTML = "";
    videoCard.appendChild(iframe);
  });
}

//================ WHOLE-PAGE DOT NAVIGATION ================

const pageDots = document.querySelectorAll(".page-dot");
const pageDotSections = Array.from(pageDots)
  .map(dot => document.getElementById(dot.dataset.target))
  .filter(Boolean);

const pageDotObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      pageDots.forEach(dot => dot.classList.toggle("active", dot.dataset.target === id));
    }
  });
}, { threshold: 0, rootMargin: "-50% 0px -50% 0px" });

pageDotSections.forEach(section => pageDotObserver.observe(section));

pageDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
