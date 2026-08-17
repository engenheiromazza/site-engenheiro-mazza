/**
 * POST /api/asaas-webhook
 * Recebe os eventos de pagamento do Asaas e fecha o negócio no HubSpot.
 *
 * Configurar no Asaas em Integrações > Webhooks:
 *   URL     : https://engenheiromazza.ia.br/api/asaas-webhook
 *   Eventos : PAYMENT_CONFIRMED e PAYMENT_RECEIVED
 *   Token   : o mesmo valor de ASAAS_WEBHOOK_TOKEN
 *
 * Variáveis de ambiente na Vercel:
 *   HUBSPOT_TOKEN        (obrigatória) — Private App do HubSpot
 *   ASAAS_API_KEY        (obrigatória) — para descobrir o e-mail do pagador
 *   ASAAS_WEBHOOK_TOKEN  (recomendada) — segredo compartilhado
 *
 * O Asaas reenvia o evento enquanto não receber 2xx. Por isso, qualquer
 * situação que não seja erro nosso responde 200 — reenviar não resolveria.
 */

const HS    = 'https://api.hubapi.com';
const ASAAS = 'https://api.asaas.com/v3';

const PIPELINE_B2C = 'default';
const FASE_PAGO    = 'closedwon'; // "Inscrito (pago)"

const EVENTOS_DE_PAGAMENTO = ['PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED'];

async function hubspot(caminho, metodo, corpo, token) {
  const r = await fetch(HS + caminho, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const txt = await r.text();
  let json = null;
  try { json = txt ? JSON.parse(txt) : null; } catch { /* resposta vazia */ }
  if (!r.ok) throw new Error(`HubSpot ${r.status} em ${caminho}: ${txt.slice(0, 300)}`);
  return json;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  // ---------- autenticação ----------
  const segredo = process.env.ASAAS_WEBHOOK_TOKEN;
  if (segredo && req.headers['asaas-access-token'] !== segredo) {
    console.warn('[asaas] token do webhook inválido');
    return res.status(401).json({ erro: 'token inválido' });
  }

  const token    = process.env.HUBSPOT_TOKEN;
  const asaasKey = process.env.ASAAS_API_KEY;
  if (!token) {
    console.error('[asaas] HUBSPOT_TOKEN ausente');
    return res.status(500).json({ erro: 'HUBSPOT_TOKEN não configurado' });
  }

  const corpo   = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const evento  = corpo.event;
  const pgto    = corpo.payment;

  if (!EVENTOS_DE_PAGAMENTO.includes(evento) || !pgto) {
    return res.status(200).json({ ignorado: evento || null });
  }

  try {
    // ---------- e-mail do pagador ----------
    let email = pgto.customerEmail || null;

    if (!email && pgto.customer && asaasKey) {
      const c = await fetch(`${ASAAS}/customers/${pgto.customer}`, {
        headers: { access_token: asaasKey },
      });
      if (c.ok) {
        const cliente = await c.json();
        email = cliente.email || null;
      } else {
        console.warn('[asaas] falha ao buscar cliente', c.status);
      }
    }

    if (!email) {
      // Sem e-mail não há como casar com o CRM. Registra e encerra sem reenvio.
      console.warn('[asaas] pagamento sem e-mail identificável', pgto.id);
      return res.status(200).json({ ok: false, motivo: 'sem e-mail do pagador', pagamento: pgto.id });
    }

    email = String(email).trim().toLowerCase();
    const valor    = Number(pgto.value || 0);
    const parceiro = 'Direto';

    // ---------- contato ----------
    const busca = await hubspot('/crm/v3/objects/contacts/search', 'POST', {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email', 'firstname', 'lastname', 'parceiro_origem'],
      limit: 1,
    }, token);

    let contatoId, nomeContato, parceiroDoContato;

    if (busca && busca.total > 0) {
      const c = busca.results[0];
      contatoId         = c.id;
      nomeContato       = [c.properties.firstname, c.properties.lastname].filter(Boolean).join(' ') || email;
      parceiroDoContato = c.properties.parceiro_origem || parceiro;
    } else {
      // Pagou sem passar pelo formulário. Cria o contato para não perder a venda no CRM.
      const criado = await hubspot('/crm/v3/objects/contacts', 'POST', {
        properties: { email, firstname: pgto.customerName || 'Inscrito', parceiro_origem: parceiro },
      }, token);
      contatoId         = criado.id;
      nomeContato       = pgto.customerName || email;
      parceiroDoContato = parceiro;
    }

    // ---------- negócio ----------
    const assoc = await hubspot(
      `/crm/v3/objects/contacts/${contatoId}/associations/deals`, 'GET', null, token
    );
    const idsNegocios = (assoc && assoc.results ? assoc.results : []).map(a => a.toObjectId || a.id);

    let negocioId = null;
    for (const id of idsNegocios) {
      const d = await hubspot(`/crm/v3/objects/deals/${id}?properties=pipeline,dealstage`, 'GET', null, token);
      if (d && d.properties && d.properties.pipeline === PIPELINE_B2C) { negocioId = id; break; }
    }

    if (negocioId) {
      await hubspot(`/crm/v3/objects/deals/${negocioId}`, 'PATCH', {
        properties: { dealstage: FASE_PAGO, amount: String(valor) },
      }, token);
    } else {
      const novo = await hubspot('/crm/v3/objects/deals', 'POST', {
        properties: {
          dealname: `Claude para Negócios 31/08 — ${nomeContato}`,
          pipeline: PIPELINE_B2C,
          dealstage: FASE_PAGO,
          amount: String(valor),
          parceiro_origem: parceiroDoContato,
        },
        associations: [{
          to: { id: contatoId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
        }],
      }, token);
      negocioId = novo.id;
    }

    console.log(`[asaas] ${evento} R$${valor} → negócio ${negocioId} marcado como pago`);
    return res.status(200).json({ ok: true, contatoId, negocioId, valor });

  } catch (e) {
    // Devolve 500 de propósito: aqui o erro é nosso, e o Asaas reenvia.
    console.error('[asaas]', e.message);
    return res.status(500).json({ ok: false, erro: e.message });
  }
}
