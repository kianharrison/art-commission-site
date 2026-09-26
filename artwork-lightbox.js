(() => {
  const viewer = document.getElementById("artwork-lightbox");
  const gallery = document.querySelector(".illustration-gallery");
  if (!viewer || !gallery) return;

  const imageEl = viewer.querySelector(".lightbox-image");
  const countEl = viewer.querySelector(".lightbox-count");
  const closeButton = viewer.querySelector(".lightbox-close");
  const previousButton = viewer.querySelector(".lightbox-previous");
  const nextButton = viewer.querySelector(".lightbox-next");
  const artworkButtons = [...gallery.querySelectorAll(".gallery-art")];
  if (!imageEl || !closeButton || !previousButton || !nextButton || !artworkButtons.length) return;

  let activeIndex = 0;
  let returnFocus = null;
  let previousScrollY = 0;

  const showArtwork = (index) => {
    activeIndex = (index + artworkButtons.length) % artworkButtons.length;
    const sourceImage = artworkButtons[activeIndex].querySelector("img");
    imageEl.src = sourceImage.currentSrc || sourceImage.src;
    imageEl.alt = sourceImage.alt;
    if (countEl) countEl.textContent = `${activeIndex + 1} / ${artworkButtons.length}`;
  };

  const closeViewer = () => {
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    imageEl.removeAttribute("src");
    window.scrollTo(0, previousScrollY);
    returnFocus?.focus({ preventScroll: true });
  };

  artworkButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      returnFocus = button;
      previousScrollY = window.scrollY;
      showArtwork(index);
      viewer.classList.add("open");
      viewer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener("click", closeViewer);
  previousButton.addEventListener("click", () => showArtwork(activeIndex - 1));
  nextButton.addEventListener("click", () => showArtwork(activeIndex + 1));
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });
  document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("open")) return;
    if (event.key === "Escape") closeViewer();
    if (event.key === "ArrowLeft") showArtwork(activeIndex - 1);
    if (event.key === "ArrowRight") showArtwork(activeIndex + 1);
  });
})();
