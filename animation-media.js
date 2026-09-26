window.KLB_ANIMATION_MEDIA = [
  {
    mp4: "assets/Animation/Animation_01.mp4",
    poster: "art/3.png",
    alt: "Character-driven animation preview"
  },
  {
    mp4: "assets/Animation/Animation_02.mp4",
    poster: "art/6.png",
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
      const video = createVideo(item);
      figure.append(video);
      gallery.append(figure);
      if (observer) {
        observer.observe(video);
      } else {
        activate(video);
      }
    });
  }
})();
