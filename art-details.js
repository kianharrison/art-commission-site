const ART_DATA = {
  1: {
    title: "Expressive Portrait I",
    image: "art/1.jpg",
    processImages: ["art/1.jpg", "art/1_1.png", "art/1_2.png"],
    description:
      "A bright and expressive headshot centered on emotion, clean lighting, and character personality.",
  },
  2: {
    title: "Expressive Portrait II",
    image: "art/2.jpg",
    processImages: ["art/2.jpg", "art/2_1.png", "art/2_2.png"],
    description:
      "A festive portrait piece with soft tonal blending and playful color atmosphere.",
  },
  3: {
    title: "Character Concept",
    image: "art/3.png",
    processImages: ["art/3.png", "art/3_1.png", "art/3_2.png"],
    description:
      "Stylized character artwork with stronger contrast and cinematic framing.",
  },
  4: {
    title: "City Vibes Illustration",
    image: "art/4.png",
    processImages: ["art/4.png", "art/4_1.png", "art/4_2.png"],
    description:
      "A confident composition combining mood, costume detail, and polished digital rendering.",
  },
  5: {
    title: "Story Panel Artwork",
    image: "art/5.jpg",
    processImages: ["art/5.jpg", "art/5_1.png", "art/5_2.png"],
    description:
      "Narrative-focused artwork with a balanced composition and smooth painterly finish.",
  },
  6: {
    title: "Neon Pulse Character",
    image: "art/6.png",
    processImages: ["art/6.png", "art/6_1.png", "art/6_2.png"],
    description:
      "Dynamic character artwork with layered lighting and clean finishing details.",
  },
};

const params = new URLSearchParams(window.location.search);
const artId = params.get("art");
const art = ART_DATA[artId] || ART_DATA[1];

const imageEl = document.getElementById("art-detail-image");
const titleEl = document.getElementById("art-detail-title");
const descEl = document.getElementById("art-detail-description");
const imageSwitcherEl = document.getElementById("art-image-switcher");
const processEls = document.querySelectorAll(".art-process-image");
const prevArtBtn = document.getElementById("art-nav-prev");
const nextArtBtn = document.getElementById("art-nav-next");
const resolvedArtId = String(artId && ART_DATA[artId] ? artId : 1);

let processImages = [];

let activeImageIndex = 0;

const setActiveImage = (index) => {
  if (!imageEl || !processImages.length) {
    return;
  }

  const boundedIndex = Math.max(0, Math.min(processImages.length - 1, index));
  activeImageIndex = boundedIndex;
  const nextImage = processImages[boundedIndex];

  imageEl.classList.remove("art-blur-in");
  // Reflow so the animation can replay on every step change.
  // eslint-disable-next-line no-unused-expressions
  imageEl.offsetWidth;
  imageEl.src = nextImage;
  imageEl.alt = `${art.title} process ${boundedIndex + 1}`;
  imageEl.loading = "lazy";
  requestAnimationFrame(() => {
    imageEl.classList.add("art-blur-in");
  });

  if (imageSwitcherEl) {
    imageSwitcherEl.querySelectorAll(".art-switch-dot").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === boundedIndex);
      button.setAttribute("aria-pressed", buttonIndex === boundedIndex ? "true" : "false");
    });
  }

  if (processEls.length) {
    processEls.forEach((preview, previewIndex) => {
      preview.classList.toggle("active", previewIndex === boundedIndex);
    });
  }
};

if (titleEl) {
  titleEl.textContent = art.title;
}

if (descEl) {
  descEl.textContent = art.description;
}

const renderImageSwitcher = () => {
  if (!imageSwitcherEl) {
    return;
  }

  imageSwitcherEl.innerHTML = "";

  processImages.forEach((_, index) => {
    const switchButton = document.createElement("button");
    switchButton.className = "art-switch-dot";
    switchButton.type = "button";
    switchButton.setAttribute("aria-label", `Show process image ${index + 1}`);
    switchButton.setAttribute("aria-pressed", index === activeImageIndex ? "true" : "false");
    switchButton.addEventListener("click", () => setActiveImage(index));
    imageSwitcherEl.appendChild(switchButton);
  });
};

const renderProcessThumbnails = () => {
  if (!processEls.length) {
    return;
  }

  processEls.forEach((image, index) => {
    const src = processImages[index];
    if (!src) {
      image.style.display = "none";
      return;
    }

    image.style.display = "block";
    image.src = src;
    image.alt = `${art.title} process preview ${index + 1}`;
    image.loading = "lazy";
    image.classList.toggle("active", index === activeImageIndex);
    image.addEventListener("click", () => setActiveImage(index));
  });
};

const stepProcessImage = (direction) => {
  if (!processImages.length) {
    return;
  }
  const nextIndex =
    (activeImageIndex + direction + processImages.length) % processImages.length;
  setActiveImage(nextIndex);
};

if (prevArtBtn) {
  prevArtBtn.addEventListener("click", () => stepProcessImage(-1));
}

if (nextArtBtn) {
  nextArtBtn.addEventListener("click", () => stepProcessImage(1));
}

const canLoadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

const resolveProcessImages = async () => {
  const fallback =
    Array.isArray(art.processImages) && art.processImages.length
      ? [...art.processImages]
      : [art.image];

  const dynamic = [art.image];
  const extensions = ["png", "jpg", "jpeg", "webp"];

  for (let step = 1; step <= 8; step += 1) {
    let foundSource = "";

    for (const ext of extensions) {
      const candidate = `art/${resolvedArtId}_${step}.${ext}`;
      const exists = await canLoadImage(candidate);
      if (exists) {
        foundSource = candidate;
        break;
      }
    }

    if (!foundSource) {
      break;
    }

    dynamic.push(foundSource);
  }

  return dynamic.length > 1 ? dynamic : fallback;
};

const initArtDetail = async () => {
  processImages = await resolveProcessImages();
  renderImageSwitcher();
  renderProcessThumbnails();
  setActiveImage(0);
};

initArtDetail();

document.title = `${art.title} | KianLooksBetter`;
