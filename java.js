const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#menu-principal");
const dropdown = document.querySelector(".nav-dropdown");
const dropdownButton = document.querySelector(".dropdown-toggle");

menu?.addEventListener("click", () => {
  const aberto = nav.classList.toggle("aberto");
  menu.setAttribute("aria-expanded", String(aberto));
  menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  menu.textContent = aberto ? "✕" : "☰";
});

nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("aberto");
  menu?.setAttribute("aria-expanded", "false");
  if (menu) { menu.textContent = "☰"; menu.setAttribute("aria-label", "Abrir menu"); }
  dropdown?.classList.remove("aberto");
  dropdownButton?.setAttribute("aria-expanded", "false");
}));

dropdownButton?.addEventListener("click", () => {
  const aberto = dropdown.classList.toggle("aberto");
  dropdownButton.setAttribute("aria-expanded", String(aberto));
});

document.querySelectorAll(".flip-card").forEach(card => {
  const alternar = () => {
    const virou = card.classList.toggle("virada");
    card.setAttribute("aria-pressed", String(virou));
  };
  card.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    alternar();
  });
  card.addEventListener("keydown", event => {
    if (event.target.closest("a")) return;
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); alternar(); }
  });
});

document.querySelectorAll(".card-btn").forEach(link => link.addEventListener("click", () => {
  const assunto = document.querySelector("#addon");
  if (assunto) assunto.value = link.dataset.assunto;
}));

const form = document.querySelector("#contact-form");
form?.addEventListener("submit", event => {
  event.preventDefault();
  const mensagem = document.querySelector("#form-message");
  if (!form.checkValidity()) {
    form.reportValidity();
    mensagem.textContent = "Confira os campos destacados antes de continuar.";
    return;
  }
  mensagem.textContent = "Validação concluída! Este formulário é demonstrativo e não enviou a mensagem para um servidor.";
  form.reset();
});

const banner = document.querySelector("#banner-cookies");
const aceitar = document.querySelector("#btn-aceitar-cookies");
try {
  if (localStorage.getItem("cookiesAceitos") === "sim") banner?.classList.add("oculto");
  aceitar?.addEventListener("click", () => {
    try { localStorage.setItem("cookiesAceitos", "sim"); } catch (erro) { console.warn("Preferência não pôde ser salva.", erro); }
    banner?.classList.add("oculto");
  });
} catch (erro) {
  aceitar?.addEventListener("click", () => banner?.classList.add("oculto"));
}
