// --- 1. CONFIGURAÇÕES ---
const NUMERO_WHATSAPP = "5571999092470";

// --- 2. BANCO DE DADOS (4 Serviços) ---
const portfolio = [
  {
    id: 1,
    nome: "Site Institucional Premium",
    desc: "Design de alto padrão e responsivo para posicionar sua empresa como autoridade no mercado.",
    icone: "fas fa-building",
    tipo: "Site Institucional Premium",
  },
  {
    id: 2,
    nome: "E-commerce de Alta Conversão",
    desc: "Loja virtual robusta com foco total na experiência do usuário para multiplicar suas vendas online.",
    icone: "fas fa-shopping-cart",
    tipo: "E-commerce / Loja Virtual",
  },
  {
    id: 3,
    nome: "Landing Page Estratégica",
    desc: "Página desenhada cientificamente para capturar leads qualificados e impulsionar suas campanhas.",
    icone: "fas fa-rocket",
    tipo: "Landing Page de Alta Conversão",
  },
  {
    id: 4,
    nome: "Sistema de Gestão",
    desc: "Plataformas sob medida e sistemas integrados para automatizar e escalar os processos da sua empresa.",
    icone: "fas fa-laptop-code",
    tipo: "Sistema de Gestão",
  },
];

let projetoSelecionado = null;

// --- 3. INICIALIZAÇÃO DE SERVIÇOS ---
function carregarPortfolio() {
  const grid = document.getElementById("grid-servicos");
  if (!grid) return;
  grid.innerHTML = "";

  portfolio.forEach((item) => {
    grid.innerHTML += `
      <div class="servico-card fade-in-up"> 
        <div class="servico-icone">
          <i class="${item.icone}"></i>
        </div>
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
        <button class="btn-add" onclick="abrirModalComProjeto('${item.tipo}')">
          Eu quero este
        </button>
      </div>
    `;
  });
}

// --- 4. FUNÇÕES DO CARROSSEL DE PROJETOS ---
let slideIndex = 0;
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;

function initCarrossel() {
  const track = document.getElementById("slider-track");
  if (!track) return;

  autoSlideInterval = setInterval(() => mudarSlide(1), 4000);

  track.parentElement.addEventListener("mouseenter", () =>
    clearInterval(autoSlideInterval),
  );
  track.parentElement.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => mudarSlide(1), 4000);
  });

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlideInterval = setInterval(() => mudarSlide(1), 4000);
    },
    { passive: true },
  );
}

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    mudarSlide(1);
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    mudarSlide(-1);
  }
}

function mudarSlide(direcao) {
  const track = document.getElementById("slider-track");
  const slides = document.querySelectorAll(".slide");
  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;
  slideIndex = (slideIndex + direcao + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// --- 5. FUNÇÕES DO MODAL DE CONTATO ---
function toggleContatoModal() {
  const modal = document.getElementById("modal-contato");
  const isVisible = modal.style.display === "flex";
  modal.style.display = isVisible ? "none" : "flex";
  if (!isVisible) resetarSelecao();
}

function abrirModalComProjeto(tipoProjeto) {
  toggleContatoModal();
  selecionarProjeto(tipoProjeto);
}

function selecionarProjeto(tipo) {
  projetoSelecionado = tipo;
  const botoes = document.querySelectorAll(".btn-opcao");
  botoes.forEach((btn) => {
    if (btn.innerText === tipo || tipo.includes(btn.innerText)) {
      btn.classList.add("selecionado");
    } else {
      btn.classList.remove("selecionado");
    }
  });
  document.getElementById("projeto-selecionado").style.display = "block";
  document.getElementById("nome-projeto").innerText = tipo;
  document.getElementById("btn-enviar-orcamento").disabled = false;
}

function resetarSelecao() {
  projetoSelecionado = null;
  const botoes = document.querySelectorAll(".btn-opcao");
  botoes.forEach((btn) => btn.classList.remove("selecionado"));
  document.getElementById("projeto-selecionado").style.display = "none";
  document.getElementById("btn-enviar-orcamento").disabled = true;
}

// --- 6. ENVIAR PARA O ZAP (RASTREAMENTO BLINDADO) ---
function enviarOrcamentoZap() {
  if (!projetoSelecionado)
    return alert("Por favor, selecione um interesse para prosseguirmos.");

  const urlParams = new URLSearchParams(window.location.search);
  const origem = urlParams.get("utm_source") || "Orgânico";
  const campanha = urlParams.get("utm_campaign") || "";

  // Limpando os dados antes de montar a URL
  const rastreioTexto =
    origem !== "Orgânico"
      ? `\n\n_(Origem: ${origem} | Campanha: ${campanha})_`
      : "";

  const mensagem = `*Olá, Michell!* 🚀\n\nEstive no site da *França Web & Criativa* e decidi elevar o nível do meu negócio.\n\nTenho interesse no desenvolvimento de um(a) *${projetoSelecionado}*.\n\nPodemos conversar sobre os próximos passos?${rastreioTexto}`;

  // A codificação segura acontece aqui
  const mensagemCodificada = encodeURIComponent(mensagem);

  window.open(
    `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`,
    "_blank",
  );
  toggleContatoModal();
}

// --- 7. ZAP DO FOOTER ---
function abrirZapFooter() {
  const mensagem =
    "*Olá, Michell!* Conheci o trabalho da França Web & Criativa e gostaria de uma consultoria para o meu negócio. Podemos conversar?";
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
}

// --- 8. ANIMAÇÕES ---
function iniciarAnimacoesScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  const elementosAnimados = document.querySelectorAll(
    ".fade-in-up, .titulo-secao, .subtitulo-secao",
  );
  elementosAnimados.forEach((el) => observer.observe(el));
}

// --- 9. MENU MOBILE ---
function toggleMenuMobile() {
  document.getElementById("main-nav").classList.toggle("ativo");
}

function fecharMenuMobile() {
  document.getElementById("main-nav").classList.remove("ativo");
}

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
  carregarPortfolio();
  initCarrossel();
  iniciarAnimacoesScroll();
});
