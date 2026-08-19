
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Le formulaire est prêt. Il reste à le relier à votre adresse e-mail ou à votre service d’envoi avant publication.";
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
