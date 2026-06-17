// --- 1. CONFIGURAÇÕES ---
const NUMERO_WHATSAPP = "5571999092470";

// --- 2. BANCO DE DADOS (Projetos em Destaque agora apenas com Ícones) ---
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
// Variáveis para controle de toque (Swipe no mobile)
let touchStartX = 0;
let touchEndX = 0;

function initCarrossel() {
  const track = document.getElementById("slider-track");
  if (!track) return;

  // Inicia o auto-play (passa a cada 4 segundos)
  autoSlideInterval = setInterval(() => mudarSlide(1), 4000);

  // Pausa se o mouse passar por cima (Desktop)
  track.parentElement.addEventListener("mouseenter", () =>
    clearInterval(autoSlideInterval),
  );
  track.parentElement.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => mudarSlide(1), 4000);
  });

  // Eventos de Toque (Swipe) para Mobile com otimização de performance (passive)
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval); // Pausa o slide automático ao tocar
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlideInterval = setInterval(() => mudarSlide(1), 4000); // Retoma o automático ao soltar
    },
    { passive: true },
  );
}

// Função para detectar a direção do swipe no mobile
function handleSwipe() {
  const swipeThreshold = 50; // Distância mínima para considerar um swipe válido
  if (touchEndX < touchStartX - swipeThreshold) {
    mudarSlide(1); // Deslizou para esquerda (próximo)
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    mudarSlide(-1); // Deslizou para direita (anterior)
  }
}

function mudarSlide(direcao) {
  const track = document.getElementById("slider-track");
  const slides = document.querySelectorAll(".slide");
  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;
  slideIndex = (slideIndex + direcao + totalSlides) % totalSlides;

  // Move a "fita" do carrossel usando o eixo X
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// --- 5. FUNÇÕES DO MODAL DE CONTATO ---
function toggleContatoModal() {
  const modal = document.getElementById("modal-contato");
  const isVisible = modal.style.display === "flex";
  modal.style.display = isVisible ? "none" : "flex";

  if (!isVisible) {
    resetarSelecao();
  }
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

// --- 6. ENVIAR PARA O ZAP (ORÇAMENTO COM RASTREAMENTO UTM) ---
function enviarOrcamentoZap() {
  if (!projetoSelecionado)
    return alert("Por favor, selecione um interesse para prosseguirmos.");

  // Captura parâmetros da URL (útil para rastrear Tráfego Pago)
  const urlParams = new URLSearchParams(window.location.search);
  const origem = urlParams.get("utm_source") || "Orgânico";
  const campanha = urlParams.get("utm_campaign") || "";

  // Formata o texto de rastreio de forma oculta apenas se vier de anúncio
  const rastreioTexto =
    origem !== "Orgânico"
      ? `%0A%0A_(Origem: ${origem} | Campanha: ${campanha})_`
      : "";

  const mensagem = `*Olá, Michell!* 🚀%0A%0AEstive no site da *França Web & Criativa* e decidi elevar o nível do meu negócio.%0A%0ATenho interesse no desenvolvimento de um(a) *${projetoSelecionado}*.%0A%0APodemos conversar sobre os próximos passos?${rastreioTexto}`;

  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
  toggleContatoModal();
}

// --- 7. ZAP DO FOOTER ---
function abrirZapFooter() {
  const mensagem =
    "*Olá, Michell!* Conheci o trabalho da França Web & Criativa e gostaria de uma consultoria para o meu negócio. Podemos conversar?";
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
}

// --- 8. ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER) ---
function iniciarAnimacoesScroll() {
  // Configura o observador
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Se o elemento entrou na tela (pelo menos 10% dele)
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          // Para de observar depois que aparece a primeira vez, para não ficar piscando
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Seleciona tudo que queremos animar
  const elementosAnimados = document.querySelectorAll(
    ".fade-in-up, .titulo-secao, .subtitulo-secao",
  );

  // Manda o observador vigiar cada um desses elementos
  elementosAnimados.forEach((el) => observer.observe(el));
}

// --- INICIALIZAÇÃO GERAL DA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
  carregarPortfolio();
  initCarrossel();
  iniciarAnimacoesScroll();
});
