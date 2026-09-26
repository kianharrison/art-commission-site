(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Remove old fixed booking/about and icon-rail navigation from legacy templates.
  document.querySelectorAll(".quick-dm-links, .nav-grid, .nav-grid2, .feed-grid").forEach((node) => node.remove());

  const hero = document.querySelector(".cinematic-hero");
  const updateContrast = () => {
    const pageScroll = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
    const heroPassed = hero
      ? hero.getBoundingClientRect().bottom <= header.offsetHeight
      : pageScroll > 32;
    header.classList.toggle("is-scrolled", heroPassed || (!hero && pageScroll > 32));
  };
  updateContrast();
  window.addEventListener("scroll", updateContrast, { passive: true });
  document.addEventListener("scroll", updateContrast, { passive: true, capture: true });
  window.addEventListener("resize", updateContrast, { passive: true });

  if (hero && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const heroPassed = entry.boundingClientRect.bottom <= header.offsetHeight;
        header.classList.toggle("is-scrolled", heroPassed);
      });
    }, { threshold: 0 });
    heroObserver.observe(hero);
  }
})();
