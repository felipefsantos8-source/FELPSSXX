
const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector("nav");

menu.addEventListener("click",()=>{
  const aberto=nav.classList.toggle("aberto");
  menu.setAttribute("aria-expanded",aberto);
  menu.setAttribute("aria-label",aberto?"Fechar menu":"Abrir menu");
  menu.textContent=aberto?"✕":"☰";
});

nav.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("aberto");
    menu.textContent="☰";
    menu.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-label","Abrir menu");
  });
});

document.querySelectorAll(".flip-card").forEach(card=>{
  card.addEventListener("click",e=>{
    if(e.target.closest("a"))return;
    card.classList.toggle("virada");
  });
  card.addEventListener("keydown",e=>{
    if(e.target.closest("a"))return;
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      card.classList.toggle("virada");
    }
  });
});

document.querySelectorAll(".card-btn").forEach(link=>{
  link.addEventListener("click",()=>{
    const assunto=document.querySelector("#addon");
    if(assunto)assunto.value=link.dataset.assunto;
  });
});

document.querySelector("#contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  document.querySelector("#form-message").textContent=
    "Formulário demonstrativo: a mensagem não foi enviada. Conecte um serviço de envio para receber mensagens.";
  e.target.reset();
});

const banner=document.querySelector("#banner-cookies");
const aceitar=document.querySelector("#btn-aceitar-cookies");

try{
  if(localStorage.getItem("cookiesAceitos")==="sim")banner.classList.add("oculto");
  aceitar.addEventListener("click",()=>{
    try{localStorage.setItem("cookiesAceitos","sim");}catch{}
    banner.classList.add("oculto");
  });
}catch{
  aceitar.addEventListener("click",()=>banner.classList.add("oculto"));
}
