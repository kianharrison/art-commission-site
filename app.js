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

const commissionTriggerBtn = document.getElementById("commission-trigger-btn");
const commissionStatusModal = document.getElementById("commission-status-modal");
const commissionStatusClose = document.getElementById("commission-status-close");

if (commissionTriggerBtn && commissionStatusModal && commissionStatusClose) {
  const openCommissionModal = () => {
    commissionStatusModal.classList.add("open");
    commissionStatusModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeCommissionModal = () => {
    commissionStatusModal.classList.remove("open");
    commissionStatusModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  commissionTriggerBtn.addEventListener("click", openCommissionModal);
  commissionStatusClose.addEventListener("click", closeCommissionModal);

  commissionStatusModal.addEventListener("click", (event) => {
    if (event.target === commissionStatusModal) {
      closeCommissionModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && commissionStatusModal.classList.contains("open")) {
      closeCommissionModal();
    }
  });
}

document.querySelectorAll('.nav-grid a[href^="#"], .nav-grid2 a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", link.getAttribute("href"));
  });
});

const revealSelectors = [
  "#gallery",
  "#services",
  "#contact",
  "#footer",
  ".section-title",
  ".gallery-filter-row",
  ".photo-gallery > div",
  ".photo-gallery2 .card",
  "#services .service-item",
  "#contact .contact-item",
  ".button",
  ".terms-service-block",
  ".terms-service-block li",
  ".selected-img-section",
  ".art-detail-image-wrap",
  ".art-detail-info-wrap",
  ".service-detail-panel",
  ".service-samples-title",
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

const hydrateSmoothImages = (selectors) => {
  document.querySelectorAll(selectors).forEach((img) => {
    if (img.dataset.smoothHydrated === "true") {
      return;
    }

    img.dataset.smoothHydrated = "true";
    img.style.opacity = "0";
    img.style.transition = "opacity 260ms ease";

    const showImage = () => {
      img.style.opacity = "1";
    };

    const hideFailed = () => {
      img.style.opacity = "0";
      img.style.display = "none";
    };

    if (img.complete && img.naturalWidth > 0) {
      showImage();
    } else {
      img.addEventListener("load", showImage, { once: true });
      img.addEventListener("error", hideFailed, { once: true });
    }
  });
};

hydrateSmoothImages(".selected-img, .process-image, #art-detail-image");

const galleryCategorySelect = document.getElementById("gallery-category");
const artSubcategorySelect = document.getElementById("art-subcategory");
const artSubcategoryGroup = document.getElementById("art-subcategory-group");
const galleryGrid = document.getElementById("gallery-grid");
const galleryEmptyState = document.getElementById("gallery-empty-state");

if (galleryCategorySelect && artSubcategorySelect && galleryGrid) {
  const YOUTUBE_ANIMATION_CONFIG = {
    apiKey: "AIzaSyDrzZBSBVhDkenFhkfDObQy2kA1TEEPWe0",
    playlistId: "PLL4LZEOkS-eozTZvO_SPA7SKsc-n8DlEn",
    maxResults: 24,
  };

  const modalEl = document.getElementById("animation-detail-modal");
  const modalPlayerEl = document.getElementById("animation-detail-player");
  const modalCloseEl = document.getElementById("animation-detail-close");
  const modalTitleEl = document.getElementById("animation-detail-title");
  const modalCategoryEl = document.getElementById("animation-detail-category");
  const modalArtTypeEl = document.getElementById("animation-detail-art-type");
  const modalDescriptionEl = document.getElementById("animation-detail-description");

  const apiCache = new Map();
  let animationsRendered = false;

  const getVideoType = (videoId, snippet = {}) => {
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const shortsUrl = `https://www.youtube.com/shorts/${videoId}`;
    const markerText = `${snippet.title || ""} ${snippet.description || ""}`.toLowerCase();

    if (
      shortsUrl.includes("/shorts/") &&
      (markerText.includes("/shorts/") ||
        markerText.includes("#shorts") ||
        markerText.includes("shorts"))
    ) {
      return "shorts";
    }
    if (watchUrl.includes("watch?v=")) {
      return "long_form";
    }
    return "unknown";
  };

  const memoizedYoutubeJson = (endpoint, params) => {
    const paramKey = JSON.stringify(Object.keys(params).sort().reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {}));
    const cacheKey = `${endpoint}::${paramKey}`;

    if (!apiCache.has(cacheKey)) {
      const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
      url.search = new URLSearchParams({
        ...params,
        key: YOUTUBE_ANIMATION_CONFIG.apiKey,
      }).toString();

      apiCache.set(
        cacheKey,
        fetch(url.toString()).then((response) => {
          if (!response.ok) {
            throw new Error(`Unable to load YouTube ${endpoint}.`);
          }
          return response.json();
        })
      );
    }

    return apiCache.get(cacheKey);
  };

  const hydrateGalleryImages = (scope = document) => {
    scope.querySelectorAll("img.gallery-media").forEach((img) => {
      if (img.dataset.mediaHydrated === "true") {
        return;
      }

      img.dataset.mediaHydrated = "true";
      img.alt = "";
      img.classList.remove("is-ready");
      img.classList.add("is-pending");

      const markReady = () => {
        img.classList.remove("is-pending");
        img.classList.add("is-ready");
      };

      const markFailed = () => {
        img.classList.remove("is-pending");
        img.classList.add("is-error");
        img.style.display = "none";
      };

      if (img.complete && img.naturalWidth > 0) {
        markReady();
      } else {
        img.addEventListener("load", markReady, { once: true });
        img.addEventListener("error", markFailed, { once: true });
      }
    });
  };

  const createVideoCard = (video, index) => {
    const card = document.createElement("div");
    card.className = "card video-card";
    card.dataset.category = "animation";
    card.dataset.artType = "motion";
    card.dataset.videoId = video.videoId;
    card.dataset.videoTitle = video.title;
    card.dataset.videoDescription = video.description;
    card.dataset.videoCategory = "Animation";
    card.dataset.videoArtType = "Motion";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Open animation details for ${video.title}`);

    const imageLoading = index < 2 ? "eager" : "lazy";
    const imagePriority = index < 2 ? "high" : "low";

    card.innerHTML = `
      <div class="animation-thumb-shell">
        <img
          class="gallery-media animation-thumb"
          src="${video.thumbnail}"
          loading="${imageLoading}"
          fetchpriority="${imagePriority}"
          decoding="async"
          alt=""
        >
      </div>
      <p class="animation-thumb-title">${video.title}</p>
    `;
    return card;
  };

  const openAnimationDetail = (videoData) => {
    if (!modalEl || !modalPlayerEl) {
      return;
    }

    const videoId = videoData.videoId || "";
    const title = videoData.videoTitle || "Animation";
    const category = videoData.videoCategory || "Animation";
    const artType = videoData.videoArtType || "Motion";
    const description = videoData.videoDescription || "No description available.";

    modalTitleEl.textContent = title;
    modalCategoryEl.textContent = category;
    modalArtTypeEl.textContent = artType;
    modalDescriptionEl.textContent = description;

    modalPlayerEl.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0"
        title="${title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;

    modalEl.classList.add("open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeAnimationDetail = () => {
    if (!modalEl || !modalPlayerEl) {
      return;
    }
    modalEl.classList.remove("open");
    modalEl.setAttribute("aria-hidden", "true");
    modalPlayerEl.innerHTML = "";
    document.body.style.overflow = "";
  };

  const getPlaylistVideos = async () => {
    if (!YOUTUBE_ANIMATION_CONFIG.apiKey || !YOUTUBE_ANIMATION_CONFIG.playlistId) {
      return [];
    }

    const collected = [];
    const seen = new Set();
    let pageToken = "";

    while (collected.length < YOUTUBE_ANIMATION_CONFIG.maxResults) {
      const data = await memoizedYoutubeJson("playlistItems", {
        part: "snippet,contentDetails",
        playlistId: YOUTUBE_ANIMATION_CONFIG.playlistId,
        maxResults: "50",
        pageToken,
      });

      const items = data.items || [];
      items.forEach((item) => {
        const videoId =
          (item.contentDetails && item.contentDetails.videoId) ||
          (item.snippet &&
            item.snippet.resourceId &&
            item.snippet.resourceId.videoId);

        if (!videoId || seen.has(videoId)) {
          return;
        }

        const snippet = item.snippet || {};
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const videoType = getVideoType(videoId, snippet);
        if (videoType !== "long_form") {
          return;
        }
        const thumbnail =
          (snippet.thumbnails &&
            (snippet.thumbnails.maxres ||
              snippet.thumbnails.high ||
              snippet.thumbnails.medium ||
              snippet.thumbnails.default) &&
            (snippet.thumbnails.maxres ||
              snippet.thumbnails.high ||
              snippet.thumbnails.medium ||
              snippet.thumbnails.default).url) ||
          "";

        seen.add(videoId);
        collected.push({
          videoId,
          title: snippet.title || "Animation Video",
          description: snippet.description || "No description available.",
          thumbnail,
          watchUrl,
          videoType,
        });
      });

      if (!data.nextPageToken || !items.length) {
        break;
      }
      pageToken = data.nextPageToken;
    }

    return collected.slice(0, YOUTUBE_ANIMATION_CONFIG.maxResults);
  };

  const loadAnimationCards = async () => {
    if (animationsRendered) {
      return;
    }

    try {
      const videos = await getPlaylistVideos();
      videos.forEach((video, index) => {
        galleryGrid.appendChild(createVideoCard(video, index));
      });
      animationsRendered = true;
      hydrateGalleryImages(galleryGrid);
    } catch (error) {
      animationsRendered = true;
    }
  };

  const getGalleryCards = () => galleryGrid.querySelectorAll(".card");

  const applyGalleryFilters = () => {
    const category = galleryCategorySelect.value;
    const artType = artSubcategorySelect.value;

    if (artSubcategoryGroup) {
      artSubcategoryGroup.style.display = category === "art" ? "flex" : "none";
    }
    galleryGrid.classList.toggle("animation-layout", category === "animation");

    let visibleCount = 0;
    getGalleryCards().forEach((card) => {
      const cardCategory = card.dataset.category || "art";
      const cardArtType = card.dataset.artType || "portrait";
      const matchesCategory = cardCategory === category;
      const matchesArtType =
        category !== "art" || artType === "all" || cardArtType === artType;
      const showCard = matchesCategory && matchesArtType;

      card.classList.toggle("gallery-hidden", !showCard);
      if (showCard) {
        visibleCount += 1;
      }
    });

    if (galleryEmptyState) {
      galleryEmptyState.textContent =
        category === "animation"
          ? "No animation videos available yet. Check back soon."
          : "No items in this category yet. Please check back soon.";
      galleryEmptyState.classList.toggle("show", visibleCount === 0);
    }
  };

  galleryGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card || !galleryGrid.contains(card)) {
      return;
    }

    if (card.dataset.category === "animation") {
      event.preventDefault();
      openAnimationDetail(card.dataset);
      return;
    }

    if (card.dataset.category === "art") {
      const destination = card.querySelector(".art-link");
      if (destination && destination.href) {
        event.preventDefault();
        window.location.href = destination.href;
      }
    }
  });

  galleryGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const card = event.target.closest(".card");
    if (!card || card.dataset.category !== "animation") {
      return;
    }
    event.preventDefault();
    openAnimationDetail(card.dataset);
  });

  if (modalCloseEl) {
    modalCloseEl.addEventListener("click", closeAnimationDetail);
  }
  if (modalEl) {
    modalEl.addEventListener("click", (event) => {
      if (event.target === modalEl) {
        closeAnimationDetail();
      }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalEl && modalEl.classList.contains("open")) {
      closeAnimationDetail();
    }
  });

  galleryCategorySelect.addEventListener("change", applyGalleryFilters);
  artSubcategorySelect.addEventListener("change", applyGalleryFilters);

  hydrateGalleryImages(galleryGrid);
  loadAnimationCards().finally(() => {
    applyStagger(".photo-gallery2 .card", 70);
    applyGalleryFilters();
  });
}
