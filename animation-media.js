window.KLB_ANIMATION_MEDIA = [
  {
    mp4: "assets/Animation/Animation_01.mp4",
    alt: "Character-driven animation preview"
  },
  {
    mp4: "assets/Animation/Animation_02.mp4",
    alt: "Animated storytelling preview"
  }
];

(() => {
  const media = Array.isArray(window.KLB_ANIMATION_MEDIA) ? window.KLB_ANIMATION_MEDIA : [];
  const createVideo = (item, { controls = false } = {}) => {
    const video = document.createElement("video");
    video.className = "animation-preview-video";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.controls = controls;
    video.poster = item.poster || "";
    video.setAttribute("aria-label", item.alt || "Animation preview");

    if (item.webm) {
      const source = document.createElement("source");
      source.dataset.src = item.webm;
      source.type = "video/webm";
      video.append(source);
    }
    if (item.mp4) {
      const source = document.createElement("source");
      source.dataset.src = item.mp4;
      source.type = "video/mp4";
      video.append(source);
    }
    return video;
  };

  const activate = (video) => {
    if (!video.dataset.loaded) {
      video.querySelectorAll("source[data-src]").forEach((source) => {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
      });
      video.dataset.loaded = "true";
      video.load();
    }
    video.play().catch(() => {});
  };

  const videoViewer = document.createElement("div");
  videoViewer.className = "animation-lightbox";
  videoViewer.setAttribute("aria-hidden", "true");
  videoViewer.innerHTML = '<button class="animation-lightbox-close" type="button" aria-label="Close animation viewer">CLOSE <span aria-hidden="true">×</span></button><div class="animation-lightbox-stage" role="dialog" aria-modal="true" aria-label="Animation viewer"></div>';

  const closeViewer = () => {
    videoViewer.classList.remove("open");
    videoViewer.setAttribute("aria-hidden", "true");
    videoViewer.querySelector(".animation-lightbox-stage").replaceChildren();
    document.body.style.overflow = "";
  };

  const openViewer = (item) => {
    const expandedVideo = createVideo(item, { controls: true });
    expandedVideo.muted = false;
    expandedVideo.preload = "metadata";
    expandedVideo.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });
    const stage = videoViewer.querySelector(".animation-lightbox-stage");
    stage.replaceChildren(expandedVideo);
    videoViewer.classList.add("open");
    videoViewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    expandedVideo.load();
    expandedVideo.play().catch(() => {});
    videoViewer.querySelector(".animation-lightbox-close").focus();
  };

  document.body.append(videoViewer);
  videoViewer.querySelector(".animation-lightbox-close").addEventListener("click", closeViewer);
  videoViewer.addEventListener("click", (event) => {
    if (event.target === videoViewer) closeViewer();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoViewer.classList.contains("open")) closeViewer();
  });

  const feature = document.querySelector("[data-animation-feature]");
  if (feature && media.length) {
    const video = createVideo(media[0]);
    video.autoplay = true;
    feature.replaceChildren(video);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(video);
          } else {
            video.pause();
          }
        });
      }, { rootMargin: "180px 0px" });
      observer.observe(feature);
    } else {
      activate(video);
    }
  }

  const gallery = document.querySelector("[data-animation-gallery]");
  if (gallery) {
    if (!media.length) {
      const empty = document.createElement("p");
      empty.className = "animation-gallery-empty";
      empty.textContent = "Animation previews will appear here when media is added.";
      gallery.append(empty);
      return;
    }

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              activate(video);
            } else {
              video.pause();
            }
          });
        }, { rootMargin: "240px 0px" })
      : null;

    media.forEach((item) => {
      const figure = document.createElement("figure");
      figure.className = "animation-gallery-item";
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", `Open ${item.alt || "animation"}`);
      const video = createVideo(item);
      figure.append(video);
      gallery.append(figure);
      figure.addEventListener("click", () => openViewer(item));
      figure.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openViewer(item);
        }
      });
      if (observer) {
        observer.observe(video);
      } else {
        activate(video);
      }
    });
  }
})();
