// --- 1. CONFIGURAÇÕES ---
const NUMERO_WHATSAPP = "5571999092470";

// --- 2. BANCO DE DADOS (Projetos em Destaque) ---
const portfolio = [
  {
    id: 1,
    nome: "Site Institucional Premium",
    desc: "Design de alto padrão e responsivo para posicionar sua empresa como autoridade no mercado.",
    img: "img/portfolio-institucional.png",
    tipo: "Site Institucional Premium",
  },
  {
    id: 2,
    nome: "E-commerce de Alta Conversão",
    desc: "Loja virtual robusta com foco total na experiência do usuário para multiplicar suas vendas online.",
    img: "img/portfolio-ecommerce.png",
    tipo: "E-commerce / Loja Virtual",
  },
  {
    id: 3,
    nome: "Landing Page Estratégica",
    desc: "Página desenhada cientificamente para capturar leads qualificados e impulsionar suas campanhas.",
    img: "img/portfolio-landingpage.png",
    tipo: "Landing Page de Alta Conversão",
  },
];

let projetoSelecionado = null;

// --- 3. INICIALIZAÇÃO ---
function carregarPortfolio() {
  const grid = document.getElementById("grid-projetos");
  grid.innerHTML = "";

  portfolio.forEach((item) => {
    grid.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.nome}">
                <div class="card-info">
                    <h3>${item.nome}</h3>
                    <p class="desc">${item.desc}</p>
                    <div class="card-footer">
                        <button class="btn-add" onclick="abrirModalComProjeto('${item.tipo}')">
                            Saber Mais
                        </button>
                    </div>
                </div>
            </div>
        `;
  });
}

// --- 4. FUNÇÕES DO MODAL DE CONTATO ---
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

// --- 5. ENVIAR PARA O ZAP (ORÇAMENTO) ---
function enviarOrcamentoZap() {
  if (!projetoSelecionado)
    return alert("Por favor, selecione um interesse para prosseguirmos.");

  // Copywriting Premium
  const mensagem = `*Olá, Michell!* 🚀%0A%0AEstive no site da *França Web & Criativa* e decidi elevar o nível do meu negócio.%0A%0ATenho interesse no desenvolvimento de um(a) *${projetoSelecionado}*.%0A%0APodemos conversar sobre os próximos passos?`;

  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
  toggleContatoModal();
}

// --- 6. ZAP DO FOOTER ---
function abrirZapFooter() {
  const mensagem =
    "*Olá, Michell!* Conheci o trabalho da França Web & Criativa e gostaria de uma consultoria para o meu negócio. Podemos conversar?";
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
}

document.addEventListener("DOMContentLoaded", carregarPortfolio);
