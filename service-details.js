const SERVICE_DATA = {
  headshot: {
    name: "HeadShot",
    price: "USD $45",
    description:
      "A shoulders-up portrait focused on expression and face detail. Great for profile images, personal branding, and stream overlays.",
    delivery: "Estimated delivery: 2 to 4 days",
    includes: [
      "High-resolution PNG export",
      "Clean background treatment",
      "Sketch preview before final render",
      "Up to 2 revisions",
    ],
    featuredImage: "art/1.jpg",
    processImages: ["art/2.jpg", "art/4.png", "art/5.jpg"],
    samples: ["art/1.jpg", "art/5.jpg", "art/2.jpg", "art/4.png"],
  },
  bust: {
    name: "Bust",
    price: "USD $70",
    description:
      "A chest-up composition that captures emotion, pose, hairstyle, and styling details while keeping the artwork clean and impactful.",
    delivery: "Estimated delivery: 3 to 5 days",
    includes: [
      "High-resolution PNG export",
      "Simple or soft gradient background",
      "Sketch approval before color phase",
      "Up to 3 revisions",
    ],
    featuredImage: "art/2.jpg",
    processImages: ["art/1.jpg", "art/5.jpg", "art/3.png"],
    samples: ["art/2.jpg", "art/5.jpg", "art/1.jpg", "art/3.png"],
  },
  torso: {
    name: "Torso",
    price: "USD $95",
    description:
      "Head-to-waist illustration with stronger storytelling through posture and costume detail. Ideal for character intros and promo posts.",
    delivery: "Estimated delivery: 4 to 6 days",
    includes: [
      "High-resolution PNG export",
      "Detailed clothing and pose rendering",
      "Optional stylized background",
      "Up to 3 revisions",
    ],
    featuredImage: "art/3.png",
    processImages: ["art/1.jpg", "art/2.jpg", "art/4.png"],
    samples: ["art/3.png", "art/4.png", "art/1.jpg", "art/2.jpg"],
  },
  "full-body": {
    name: "Full Body",
    price: "USD $140",
    description:
      "A complete character piece from head to toe with full posing and prop support. Best for posters, key visuals, and portfolio art.",
    delivery: "Estimated delivery: 5 to 8 days",
    includes: [
      "High-resolution PNG export",
      "Full character and outfit detail",
      "Props and optional scene elements",
      "Up to 3 revisions",
    ],
    featuredImage: "art/4.png",
    processImages: ["art/5.jpg", "art/3.png", "art/1.jpg"],
    samples: ["art/4.png", "art/5.jpg", "art/3.png", "art/1.jpg"],
  },
};

const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("service");
const service = SERVICE_DATA[serviceKey] || SERVICE_DATA.headshot;

document.title = `${service.name} Commission | KianLooksBetter`;

const titleElement = document.getElementById("service-title");
const priceElement = document.getElementById("service-price");
const descriptionElement = document.getElementById("service-description");
const deliveryElement = document.getElementById("service-delivery");
const includesElement = document.getElementById("service-includes");
const samplesElement = document.getElementById("service-samples");
const serviceNameLabelElement = document.getElementById("service-name-label");
const selectedImageElement = document.querySelector(".selected-img");
const processImageElements = document.querySelectorAll(".process-image");
const instagramOrderLink = document.getElementById("order-instagram");
const whatsappOrderLink = document.getElementById("order-whatsapp");

if (titleElement) {
  titleElement.textContent = `${service.name} Commission`;
}

if (priceElement) {
  priceElement.textContent = `Starting from ${service.price}`;
}

if (serviceNameLabelElement) {
  serviceNameLabelElement.textContent = service.name;
}

if (descriptionElement) {
  descriptionElement.textContent = service.description;
}

if (deliveryElement) {
  deliveryElement.textContent = service.delivery;
}

if (includesElement) {
  includesElement.innerHTML = "";
  service.includes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    includesElement.appendChild(li);
  });
}

if (samplesElement) {
  samplesElement.innerHTML = "";
  service.samples.forEach((imagePath, index) => {
    const artIdMatch = imagePath.match(/art\/(\d+)\.(jpg|png)/i);
    const artId = artIdMatch ? artIdMatch[1] : "1";

    const link = document.createElement("a");
    link.href = `art-details.html?art=${artId}`;
    link.className = "art-link";

    const card = document.createElement("article");
    card.className = "sample-card";

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = `${service.name} sample ${index + 1}`;
    image.loading = "lazy";

    card.appendChild(image);
    link.appendChild(card);
    samplesElement.appendChild(link);
  });
}

if (selectedImageElement) {
  selectedImageElement.src = service.featuredImage;
  selectedImageElement.alt = `${service.name} featured artwork`;
}

if (processImageElements.length) {
  processImageElements.forEach((image, index) => {
    const processSrc = service.processImages[index] || service.featuredImage;
    image.src = processSrc;
    image.alt = `${service.name} process step ${index + 1}`;
    image.loading = "lazy";
  });
}

if (instagramOrderLink) {
  instagramOrderLink.href = "https://www.instagram.com/direct/t/17841401387039399";
}

if (whatsappOrderLink) {
  whatsappOrderLink.href = "https://wa.me/237676636111";
}
