const ART_DATA = {
  1: {
    title: "Expressive Portrait I",
    image: "art/1.jpg",
    description:
      "A bright and expressive headshot centered on emotion, clean lighting, and character personality.",
  },
  2: {
    title: "Expressive Portrait II",
    image: "art/2.jpg",
    description:
      "A festive portrait piece with soft tonal blending and playful color atmosphere.",
  },
  3: {
    title: "Character Concept",
    image: "art/3.png",
    description:
      "Stylized character artwork with stronger contrast and cinematic framing.",
  },
  4: {
    title: "City Vibes Illustration",
    image: "art/4.png",
    description:
      "A confident composition combining mood, costume detail, and polished digital rendering.",
  },
  5: {
    title: "Story Panel Artwork",
    image: "art/5.jpg",
    description:
      "Narrative-focused artwork with a balanced composition and smooth painterly finish.",
  },
};

const params = new URLSearchParams(window.location.search);
const artId = params.get("art");
const art = ART_DATA[artId] || ART_DATA[1];

const imageEl = document.getElementById("art-detail-image");
const titleEl = document.getElementById("art-detail-title");
const descEl = document.getElementById("art-detail-description");

if (imageEl) {
  imageEl.src = art.image;
  imageEl.alt = art.title;
}

if (titleEl) {
  titleEl.textContent = art.title;
}

if (descEl) {
  descEl.textContent = art.description;
}

document.title = `${art.title} | KianLooksBetter`;
