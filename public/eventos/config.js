/* =====================================================================
   CONFIGURACAO — o unico arquivo que voce precisa editar.
   Preencha FORM_GUID depois de publicar o formulario no HubSpot.
   ===================================================================== */

window.EVENTOS_CONFIG = {

  /* ---- HubSpot ---------------------------------------------------- */
  PORTAL_ID: "51594684",

  // Cole aqui o GUID do formulario publicado no HubSpot.
  // Ele aparece na URL do editor, no formato:
  // app.hubspot.com/forms/51594684/editor/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
  // Enquanto estiver vazio, a pagina entra em MODO DE TESTE (avisa na tela,
  // nao envia nada, mas permite validar todo o fluxo).
  FORM_GUID: "aea50d41-67e9-487b-b535-503b410040ed",

  /* ---- Onde o formulario esta hospedado ---------------------------- */
  BASE_URL: "https://engenheiromazza.ia.br/eventos/",

  /* ---- Ofertas ----------------------------------------------------- */
  OFERTAS: {
    online: {
      titulo: "Claude para Negocios — turma online",
      data: "29 de agosto",
      preco: "R$ 997",
      descricao: "Turma online com Raquel Amaral. Quatro frentes de atuacao do Claude, ao vivo, com gravacao."
    },
    presencial: {
      titulo: "Claude para Negocios — presencial",
      data: "19 de setembro",
      preco: "R$ 997",
      descricao: "Dia inteiro, apenas 10 pessoas. Implementacao assistida: voce traz o seu problema real e sai com a solucao funcionando."
    },
    incompany: {
      titulo: "Turma fechada na sua empresa",
      data: "agenda sob consulta",
      preco: "",
      descricao: "Programa desenhado para o seu time, com os casos de uso da sua operacao."
    },
    diagnostico: {
      titulo: "Conversa de 30 minutos",
      data: "",
      preco: "",
      descricao: "Uma conversa curta para mapear onde a IA gera resultado no seu contexto — sem compromisso."
    }
  },

  /* ---- Eventos ----------------------------------------------------- */
  /* A chave e o valor usado no parametro ?e= da URL do QR code.        */
  EVENTOS: {
    rh: {
      nome: "Claude para RH — Blumenau",
      data: "11/08/2026",
      local: "Blumenau (ACIB)",
      // Publico de RH: compra PARA O TIME. In-company primeiro.
      escada: ["incompany", "presencial", "online"]
    },
    sc: {
      nome: "IA aplicada a Supply Chain — Conectyvydade",
      data: "13/08/2026",
      local: "Conectyvydade (palestra)",
      // Topo de funil, frio, volume. Online primeiro.
      escada: ["online", "diagnostico", "incompany"]
    },
    ws: {
      nome: "Workshop Claude para Negocios — Conectyvydade",
      data: "13/08/2026",
      local: "Conectyvydade (workshop)",
      // Ja experimentaram o produto. NUNCA oferecer o online primeiro.
      escada: ["presencial", "incompany", "diagnostico"]
    }
  },

  /* ---- Sobreposicao por intencao declarada -------------------------
     O que a pessoa marca em "proximo passo" tem prioridade sobre a
     escada padrao do evento. A regra critica: quem vem do WORKSHOP e
     quer se capacitar ve o PRESENCIAL, nunca o online.
     ------------------------------------------------------------------ */
  ROTEAMENTO: {
    capacitar_time: "incompany",
    me_capacitar_ws: "presencial",
    me_capacitar_rh: "presencial",
    me_capacitar_sc: "online",
    avaliar_projeto: "diagnostico",
    so_material: null
  }
};
