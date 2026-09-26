(() => {
  const form = document.getElementById("commission-form");
  const service = document.getElementById("commission-service");
  const packageSelect = document.getElementById("commission-package");
  const packageLabel = document.getElementById("commission-package-label");
  const description = document.getElementById("commission-description");
  const descriptionHint = document.getElementById("commission-description-hint");

  const options = {
    illustration: ["Headshot", "Bust", "Torso", "Full Body", "Other"],
    animation: ["Short Film", "Music Video", "Animated Short", "Storytime Animation", "Other"]
  };

  const updatePackages = () => {
    const selectedService = service.value;
    packageLabel.textContent = selectedService === "animation" ? "Animation type" : "Package";
    packageSelect.replaceChildren(...options[selectedService].map((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      return option;
    }));
    updateDescriptionState();
  };

  const updateDescriptionState = () => {
    const isOther = packageSelect.value === "Other";
    description.required = isOther;
    description.placeholder = isOther
      ? "Tell me what you want, the scope, references and any special requirements."
      : "Describe your idea, references or project goals";
    descriptionHint.textContent = isOther
      ? "A short description is required for custom projects."
      : "Add references, scope and anything else that helps describe the project.";
  };

  if (form && service && packageSelect && packageLabel && description && descriptionHint) {
    service.addEventListener("change", updatePackages);
    packageSelect.addEventListener("change", updateDescriptionState);
    updatePackages();
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const nextState = !item.classList.contains("open");
      item.classList.toggle("open", nextState);
      button.setAttribute("aria-expanded", String(nextState));
    });
  });
})();
