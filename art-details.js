const ART_DATA = {
  1: {
    title: "Soft Fire Gaze",
    image: "art/1.jpg",
    processImages: ["art/1.jpg", "art/1_1.png", "art/1_2.png"],
    description:
      "<p>A stylized portrait built around an intense expression, soft skin rendering, and a color balance that keeps the face feeling alive rather than overworked. The piece is meant to pull the viewer in through the eyes first, then keep attention with controlled highlights and subtle painterly transitions.</p><ul><li><strong>Krita:</strong> used for the early sketch, facial placement, and first composition pass.</li><li><strong>Paint Tool SAI:</strong> used for line refinement, color rendering, shading, and the final finish.</li></ul>",
  },
  2: {
    title: "Festival Glow",
    image: "art/2.jpg",
    processImages: ["art/2.jpg", "art/2_1.png", "art/2_2.png"],
    description:
      "<p>This portrait leans into warmth and personality, with softer tonal blending and a playful atmosphere that makes the character feel immediate and approachable. The rendering is polished, but the goal was to keep the expression fresh and alive rather than overly stiff.</p><ul><li><strong>Krita:</strong> used for the planning sketch, structure pass, and early shape blocking.</li><li><strong>Paint Tool SAI:</strong> used for painting, lighting control, color blending, and final rendering.</li></ul>",
  },
  3: {
    title: "Velvet Voltage",
    image: "art/3.png",
    processImages: ["art/3.png", "art/3_1.png", "art/3_2.png"],
    description:
      "<p>A character illustration centered on silhouette clarity, costume presence, and a stronger sense of cinematic contrast. The composition gives it concept-art energy, while the final rendering keeps the subject readable and stylish without losing mood.</p><ul><li><strong>Krita:</strong> used for silhouette exploration, sketch construction, and layout experimentation.</li><li><strong>Paint Tool SAI:</strong> used for color rendering, detail polish, edge control, and the finished presentation.</li></ul>",
  },
  4: {
    title: "Streetlight Daydream",
    image: "art/4.png",
    processImages: ["art/4.png", "art/4_1.png", "art/4_2.png"],
    description:
      "<p>This piece focuses on mood, styling, and quiet confidence, using outfit detail and pose to let the subject carry the story. The overall feel is polished and urban, with the visual rhythm doing as much storytelling as the character itself.</p><ul><li><strong>Krita:</strong> used for the composition setup, pose sketch, and early planning.</li><li><strong>Paint Tool SAI:</strong> used for rendering, color treatment, surface detail, and final cleanup.</li></ul>",
  },
  5: {
    title: "Birthday Surprise",
    image: "art/5.jpg",
    processImages: ["art/5.jpg", "art/5_1.png", "art/5_2.png"],
    description:
      "<p>A narrative-focused artwork designed to feel like part of a larger scene, using composition, gesture, and atmosphere to imply what happens beyond the frame. It balances painterly softness with enough structure to keep the storytelling clear at a glance.</p><ul><li><strong>Krita:</strong> used for the initial storyboard-like sketch and layout planning.</li><li><strong>Paint Tool SAI:</strong> used for painting, shadow work, color blending, and the final visual polish.</li></ul>",
  },
  6: {
    title: "Authentic Kian",
    image: "art/6.png",
    processImages: ["art/6.png", "art/6_1.png", "art/6_2.png"],
    description:
      "<p>Selfie illustration of Kian with a nonchalant look. The piece is built to feel personal and grounded, with the expression doing most of the storytelling while the lighting and finish keep the image crisp and modern. The goal was to preserve attitude and likeness without losing the stylized edge of the final render.</p><ul><li><strong>Krita:</strong> used for concept sketching, base planning, and rough visual direction.</li><li><strong>Paint Tool SAI:</strong> used for the full render, lighting effects, color shaping, and final detailing.</li></ul>",
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
  descEl.innerHTML = art.description;
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
