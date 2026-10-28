
(function () {
  if (window.chatbotInicializado) return;

  const estilos = `
    #faq-chatbot-widget {
      font-family: Poppins, sans-serif !important;
      position: fixed !important;
      right: 20px !important;
      bottom: 20px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 60px !important;
      height: 60px !important;
      border: none !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg,#68ff32,#35b90b) !important;
      color: #06110d !important;
      font-size: 25px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 18px #0008 !important;
    }

    #faq-chat-window {
      position: fixed !important;
      right: 20px !important;
      bottom: 95px !important;
      width: 360px !important;
      max-width: calc(100vw - 30px) !important;
      height: 500px !important;
      max-height: calc(100vh - 120px) !important;
      background: #10201a !important;
      border: 1px solid #68ff3260 !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      box-shadow: 0 10px 35px #0009 !important;
      z-index: 99999999 !important;
    }

    /* Esta regra corrige o problema de não conseguir fechar */
    #faq-chat-window.faq-hidden {
      display: none !important;
    }

    .faq-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 10px !important;
      padding: 15px !important;
      background: #06110d !important;
      border-bottom: 1px solid #68ff3250 !important;
      color: #68ff32 !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      color: #68ff32 !important;
      font-family: Orbitron, sans-serif !important;
      font-size: 14px !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
    }

    .faq-icon-btn {
      padding: 3px !important;
      border: none !important;
      background: transparent !important;
      color: #68ff32 !important;
      font-size: 21px !important;
      cursor: pointer !important;
    }

    #faq-messages {
      flex: 1 !important;
      min-height: 0 !important;
      overflow-y: auto !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      padding: 14px !important;
      background: #06110d !important;
    }

    .faq-msg {
      max-width: 85% !important;
      padding: 10px 12px !important;
      border-radius: 12px !important;
      font-size: 13px !important;
      line-height: 1.5 !important;
      overflow-wrap: anywhere !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background: #10201a !important;
      color: #edf5ef !important;
      border: 1px solid #294331 !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background: #68ff32 !important;
      color: #06110d !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      color: #b7ff9e !important;
      font-size: 11px !important;
      text-align: center !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 7px !important;
    }

    .faq-chip {
      padding: 8px 10px !important;
      border: 1px solid #356b2b !important;
      border-radius: 18px !important;
      background: #18351f !important;
      color: #b7ff9e !important;
      font: inherit !important;
      font-size: 11px !important;
      cursor: pointer !important;
    }

    .faq-chip:hover {
      background: #244b28 !important;
    }

    .faq-footer {
      padding: 12px !important;
      background: #10201a !important;
      border-top: 1px solid #294331 !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      align-items: center !important;
    }

    #faq-input {
      flex: 1 !important;
      min-width: 0 !important;
      padding: 11px !important;
      border: 1px solid #356b2b !important;
      border-radius: 20px !important;
      background: #06110d !important;
      color: #edf5ef !important;
      font: inherit !important;
      font-size: 13px !important;
      outline: none !important;
    }

    #faq-send-btn {
      flex-shrink: 0 !important;
      width: 40px !important;
      height: 40px !important;
      border: none !important;
      border-radius: 50% !important;
      background: #68ff32 !important;
      color: #06110d !important;
      font-size: 20px !important;
      cursor: pointer !important;
    }

    @media(max-width:480px) {
      #faq-chatbot-widget {
        right: 12px !important;
        bottom: 12px !important;
      }

      #faq-chat-window {
        right: 10px !important;
        bottom: 82px !important;
        width: calc(100vw - 20px) !important;
        max-width: none !important;
        height: min(500px,calc(100vh - 110px)) !important;
      }
    }
  `;

  const modeloHTML = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir chatbot" aria-expanded="false">💬</button>

    <div id="faq-chat-window" class="faq-hidden" aria-label="Chat de atendimento">
      <div class="faq-header">
        <h3>OMNITORRINCO BOT</h3>
        <div class="faq-header-actions">
          <label for="faq-json-file" class="faq-icon-btn" title="Carregar base JSON">📁</label>
          <input type="file" id="faq-json-file" accept=".json,application/json" hidden>
          <button type="button" id="faq-close-btn" class="faq-icon-btn" aria-label="Fechar chatbot">✕</button>
        </div>
      </div>

      <div id="faq-messages" aria-live="polite"></div>

      <div class="faq-footer">
        <div class="faq-input-area">
          <input id="faq-input" type="text" placeholder="Pergunte sobre Minecraft..." autocomplete="off">
          <button id="faq-send-btn" type="button" aria-label="Enviar mensagem">➤</button>
        </div>
      </div>
    </div>
  `;

  const FAQ_PADRAO = [
    {
      titulo: "🎮 O que é o Omnitorrinco?",
      pergunta: "O que é o Omnitorrinco?",
      keywords: ["omnitorrinco", "site", "sobre", "quem somos"],
      resposta: "O Omnitorrinco é um site dedicado a reunir conteúdos e informações sobre Minecraft, como addons, texturas, mapas e ferramentas."
    },
    {
      titulo: "🧩 O que são addons?",
      pergunta: "O que são addons?",
      keywords: ["addon", "addons", "modificacoes", "criaturas", "itens"],
      resposta: "Addons podem adicionar ou alterar elementos do Minecraft, como criaturas, itens, comportamentos e mecânicas. Confira a compatibilidade antes de instalar."
    },
    {
      titulo: "🎨 O que são texturas?",
      pergunta: "O que são texturas?",
      keywords: ["textura", "texturas", "visual", "grafico", "aparencia"],
      resposta: "Pacotes de texturas mudam a aparência de blocos, itens e outros elementos visuais. A compatibilidade varia conforme a edição e a versão do Minecraft."
    },
    {
      titulo: "🗺️ Onde encontro mapas?",
      pergunta: "Onde encontro mapas?",
      keywords: ["mapa", "mapas", "mundo", "aventura", "download"],
      resposta: "Explore a seção Conteúdos do site para conhecer mapas e aventuras. Os links individuais de download ainda precisam ser configurados."
    },
    {
      titulo: "📱 Qual versão é compatível?",
      pergunta: "Qual versão do Minecraft é compatível?",
      keywords: ["versao", "compatibilidade", "bedrock", "java", "celular", "pc"],
      resposta: "A compatibilidade depende de cada conteúdo. Verifique se ele funciona na sua edição e versão do Minecraft antes de instalar."
    },
    {
      titulo: "🛠️ Como instalar conteúdos?",
      pergunta: "Como instalar addons e conteúdos?",
      keywords: ["instalar", "instalacao", "baixar", "download", "importar"],
      resposta: "O processo varia conforme o tipo de arquivo e a edição do Minecraft. Siga as instruções do conteúdo e baixe arquivos somente de fontes confiáveis."
    },
    {
      titulo: "📩 Como entrar em contato?",
      pergunta: "Como entrar em contato?",
      keywords: ["contato", "mensagem", "falar", "email", "sugestao"],
      resposta: "Você pode usar o formulário na seção Contato. Atualmente, ele é demonstrativo e ainda não envia mensagens para um servidor."
    },
    {
      titulo: "🔒 Segurança",
      pergunta: "Preciso informar senha ou pagar?",
      keywords: ["senha", "pagamento", "pagar", "pix", "seguranca", "conta"],
      resposta: "Nunca informe sua senha do Minecraft no chatbot. Esta página demonstrativa não processa pagamentos. Confira sempre a origem dos arquivos."
    }
  ];

  let baseConhecimento = [...FAQ_PADRAO];

  window.initChatbot = function (opcoes = {}) {
    if (window.chatbotInicializado) return;
    window.chatbotInicializado = true;

    const style = document.createElement("style");
    style.textContent = estilos;
    document.head.appendChild(style);

    const widget = document.createElement("div");
    widget.id = "faq-chatbot-widget";
    widget.innerHTML = modeloHTML;
    document.body.appendChild(widget);

    const toggleBtn = widget.querySelector("#faq-toggle-btn");
    const closeBtn = widget.querySelector("#faq-close-btn");
    const chatWindow = widget.querySelector("#faq-chat-window");
    const messages = widget.querySelector("#faq-messages");
    const input = widget.querySelector("#faq-input");
    const sendBtn = widget.querySelector("#faq-send-btn");
    const jsonFile = widget.querySelector("#faq-json-file");

    function adicionarMensagem(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;

      // Permite negrito sem inserir HTML recebido diretamente.
      const seguro = String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;"
      })[c]);

      div.innerHTML = seguro.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function normalizar(texto) {
      return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "");
    }

    function renderizarOpcoes() {
      const antigas = messages.querySelector(".faq-options");
      if (antigas) antigas.remove();

      const opcoesDiv = document.createElement("div");
      opcoesDiv.className = "faq-options";

      baseConhecimento.forEach(item => {
        if (!item.titulo || !item.resposta) return;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "faq-chip";
        botao.textContent = item.titulo;

        botao.addEventListener("click", () => {
          adicionarMensagem(item.titulo, "user");
          adicionarMensagem(item.resposta, "bot");
        });

        opcoesDiv.appendChild(botao);
      });

      messages.appendChild(opcoesDiv);
      messages.scrollTop = messages.scrollHeight;
    }

    function carregarMenuInicial() {
      messages.innerHTML = "";
      adicionarMensagem("Olá! 👋 Sou o Omnitorrinco Bot. Como posso ajudar sobre Minecraft?", "bot");
      renderizarOpcoes();
    }

    function buscarResposta(perguntaUsuario) {
      const pergunta = normalizar(perguntaUsuario);
      const palavras = pergunta.split(/\s+/).filter(p => p.length > 2);
      let melhor = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach(item => {
        let pontos = 0;
        const titulo = normalizar(item.titulo || "");
        const perguntaBase = normalizar(item.pergunta || "");
        const resposta = normalizar(item.resposta || "");

        if (pergunta && (titulo.includes(pergunta) || perguntaBase.includes(pergunta))) {
          pontos += 10;
        }

        palavras.forEach(palavra => {
          if (titulo.includes(palavra)) pontos += 3;
          if (perguntaBase.includes(palavra)) pontos += 4;
          if (resposta.includes(palavra)) pontos += 1;

          if (Array.isArray(item.keywords)) {
            item.keywords.forEach(keyword => {
              if (normalizar(keyword).includes(palavra)) pontos += 4;
            });
          }
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhor = item;
        }
      });

      if (melhor && maiorPontuacao >= 3) return melhor.resposta;

      return "Não encontrei essa informação na minha base. 😅 Tente perguntar sobre addons, texturas, mapas, versões ou instalação.";
    }

    function enviarMensagem() {
      const texto = input.value.trim();
      if (!texto) return;

      adicionarMensagem(texto, "user");
      input.value = "";
      input.focus();

      window.setTimeout(() => {
        adicionarMensagem(buscarResposta(texto), "bot");
      }, 250);
    }

    function abrirChat() {
      chatWindow.classList.remove("faq-hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Fechar chatbot");
      toggleBtn.textContent = "✕";
      input.focus();
    }

    function fecharChat() {
      chatWindow.classList.add("faq-hidden");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Abrir chatbot");
      toggleBtn.textContent = "💬";
    }

    function alternarChat() {
      if (chatWindow.classList.contains("faq-hidden")) {
        abrirChat();
      } else {
        fecharChat();
      }
    }

    toggleBtn.addEventListener("click", alternarChat);
    closeBtn.addEventListener("click", fecharChat);
    sendBtn.addEventListener("click", enviarMensagem);

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        enviarMensagem();
      }

      if (event.key === "Escape") fecharChat();
    });

    jsonFile.addEventListener("change", event => {
      const arquivo = event.target.files[0];
      if (!arquivo) return;

      const leitor = new FileReader();

      leitor.onload = () => {
        try {
          const dados = JSON.parse(leitor.result);

          if (!Array.isArray(dados)) {
            throw new Error("O JSON precisa conter uma lista.");
          }

          baseConhecimento = [...FAQ_PADRAO, ...dados];
          adicionarMensagem(`Base adicional carregada: ${dados.length} itens.`, "system-info");
          renderizarOpcoes();
        } catch (erro) {
          adicionarMensagem("Não foi possível carregar o JSON. Confira o formato do arquivo.", "bot");
          console.error("Erro ao ler JSON:", erro);
        }

        jsonFile.value = "";
      };

      leitor.onerror = () => adicionarMensagem("Erro ao ler o arquivo JSON.", "bot");
      leitor.readAsText(arquivo);
    });

    carregarMenuInicial();

    if (opcoes.jsonUrl) {
      fetch(opcoes.jsonUrl)
        .then(resposta => {
          if (!resposta.ok) throw new Error("Não foi possível carregar a base JSON.");
          return resposta.json();
        })
        .then(dados => {
          if (!Array.isArray(dados)) throw new Error("A base JSON precisa ser uma lista.");

          baseConhecimento = [...FAQ_PADRAO, ...dados];
          renderizarOpcoes();
          adicionarMensagem(`Base de conhecimento carregada: ${dados.length} itens adicionais.`, "system-info");
        })
        .catch(erro => {
          console.error("Erro ao carregar minha-base-de-dados.json:", erro);
          adicionarMensagem("Não consegui carregar a base extra. As perguntas padrão continuam disponíveis.", "system-info");
        });
    }
  };
})();
