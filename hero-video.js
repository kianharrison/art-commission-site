window.KLB_HERO_VIDEO_READY = true;

(() => {
  const video = document.querySelector(".hero-background-video");
  if (!video) return;

  if (!window.KLB_HERO_VIDEO_READY) {
    document.querySelector(".cinematic-hero")?.classList.add("video-missing");
    return;
  }

  [
    { url: video.dataset.webm, type: "video/webm" },
    { url: video.dataset.mp4, type: "video/mp4" },
  ].filter((source) => source.url).forEach((source) => {
    const node = document.createElement("source");
    node.src = source.url;
    node.type = source.type;
    video.append(node);
  });

  video.addEventListener("error", () => {
    document.querySelector(".cinematic-hero")?.classList.add("video-missing");
  });
  video.preload = "metadata";
  video.load();
  video.play().catch(() => {});
})();
