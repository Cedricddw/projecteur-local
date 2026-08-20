document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Envoi en cours…";
  status.className = "status";
  status.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      form.reset();
      status.className = "status success";
      status.textContent = "✓ Merci ! Votre demande a bien été envoyée. Réponse sous 48 h ouvrées.";
    } else {
      status.className = "status error";
      status.textContent = "L’envoi n’a pas abouti. Réessayez dans quelques instants.";
    }
  } catch (error) {
    status.className = "status error";
    status.textContent = "Impossible d’envoyer la demande pour le moment. Vérifiez votre connexion puis réessayez.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "✈ Envoyer ma demande";
  }
});

const dialogs = {
  legalBtn: document.getElementById("legalDialog"),
  privacyBtn: document.getElementById("privacyDialog")
};

Object.entries(dialogs).forEach(([btnId, dialog]) => {
  document.getElementById(btnId).addEventListener("click", () => dialog.showModal());
});

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => document.getElementById(btn.dataset.close).close());
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".navlinks a")];

window.addEventListener("scroll", () => {
  let current = "accueil";
  for (const section of sections) {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  }
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});

const privacyInlineBtn = document.getElementById("privacyInlineBtn");
if (privacyInlineBtn) {
  privacyInlineBtn.addEventListener("click", () => document.getElementById("privacyDialog").showModal());
}
