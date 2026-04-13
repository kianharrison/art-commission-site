const hamburger = document.querySelector(".header .nav-bar .nav-list .hamburger");
const mobileMenu = document.querySelector(".header .nav-bar .nav-list ul");
const menuItems = document.querySelectorAll(".header .nav-bar .nav-list ul li a");
const header = document.querySelector(".header.container");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

if (header) {
  document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    header.style.backgroundColor = scrollPosition > 250 ? "#29323c" : "transparent";
  });
}

if (hamburger && mobileMenu && menuItems.length) {
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

const revealSelectors = [
  "#gallery",
  "#services",
  "#contact",
  "#footer",
  ".section-title",
  ".photo-gallery > div",
  ".photo-gallery2 .card",
  "#services .service-item",
  "#contact .contact-item",
  ".button",
  ".selected-img-section",
  ".service-detail-panel",
  ".sample-card",
];

const revealTargets = document.querySelectorAll(revealSelectors.join(", "));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const applyStagger = (selector, step) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * step}ms`);
  });
};

applyStagger(".photo-gallery > div", 80);
applyStagger(".photo-gallery2 .card", 70);
applyStagger("#services .service-item", 90);
applyStagger("#contact .contact-item", 110);
applyStagger(".process-image", 60);
applyStagger(".sample-card", 70);

revealTargets.forEach((element) => {
  element.classList.add("reveal-ready");
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => {
    element.classList.add("revealed");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}

const previewModal = document.getElementById("image-preview-modal");
const previewImage = document.getElementById("image-preview-img");
const previewStage = document.getElementById("image-preview-stage");
const previewClose = document.getElementById("image-preview-close");

if (previewModal && previewImage && previewStage && previewClose) {
  const previewableImages = document.querySelectorAll(".selected-img, .process-image, #art-detail-image");
  let currentZoom = 1;

  const setZoom = (zoomLevel) => {
    currentZoom = Math.max(1, Math.min(4, zoomLevel));
    previewImage.style.transform = `scale(${currentZoom})`;
  };

  const openPreview = (image) => {
    previewImage.src = image.src;
    previewImage.alt = image.alt || "Artwork preview";
    previewModal.classList.add("open");
    previewModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setZoom(1);
  };

  const closePreview = () => {
    previewModal.classList.remove("open");
    previewModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    previewImage.src = "";
    setZoom(1);
  };

  previewableImages.forEach((image) => {
    image.addEventListener("click", () => openPreview(image));
  });

  previewClose.addEventListener("click", closePreview);

  previewModal.addEventListener("click", (event) => {
    if (event.target === previewModal) {
      closePreview();
    }
  });

  previewStage.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const direction = event.deltaY < 0 ? 0.18 : -0.18;
      setZoom(currentZoom + direction);
    },
    { passive: false }
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && previewModal.classList.contains("open")) {
      closePreview();
    }
  });
}
