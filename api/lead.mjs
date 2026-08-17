/**
 * POST /api/lead
 * Recebe o formulário da landing page do Claude para Negócios (turma 31/08).
 * Cria (ou atualiza) o contato e abre um negócio em "Lead capturado"
 * no pipeline B2C.
 *
 * Variável de ambiente obrigatória na Vercel:
 *   HUBSPOT_TOKEN — token de um Private App do HubSpot com os escopos
 *                   crm.objects.contacts.write e crm.objects.deals.write
 *
 * Regra de ouro desta função: ela NUNCA pode travar a venda.
 * Se o CRM falhar, devolvemos 200 com ok:false e a página segue
 * para o checkout do Asaas assim mesmo.
 */

const HS = 'https://api.hubapi.com';

const PIPELINE_B2C = 'default';
const FASE_LEAD    = 'appointmentscheduled'; // "Lead capturado"
const FECHAMENTO   = '2026-08-31T22:00:00Z'; // início do curso (19h BRT) — fecham as inscrições aqui

const PRECO = 497;

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

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    console.error('[lead] HUBSPOT_TOKEN ausente');
    return res.status(200).json({ ok: false, erro: 'HUBSPOT_TOKEN não configurado' });
  }

  const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { nome = '', email = '', fone = '', cargo = '', empresa = '' } = corpo;

  if (!String(nome).trim() || !String(email).trim()) {
    return res.status(400).json({ erro: 'nome e email são obrigatórios' });
  }

  const partes    = String(nome).trim().split(/\s+/);
  const firstname = partes[0];
  const lastname  = partes.slice(1).join(' ') || partes[0];

  const propsContato = {
    firstname,
    lastname,
    email: String(email).trim().toLowerCase(),
    phone: fone,
    jobtitle: cargo,
    company: empresa,
    parceiro_origem: 'Direto',
  };

  try {
    // ---------- contato ----------
    const busca = await hubspot('/crm/v3/objects/contacts/search', 'POST', {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: propsContato.email }] }],
      properties: ['email'],
      limit: 1,
    }, token);

    let contatoId;
    if (busca && busca.total > 0) {
      contatoId = busca.results[0].id;
      await hubspot(`/crm/v3/objects/contacts/${contatoId}`, 'PATCH', { properties: propsContato }, token);
    } else {
      const criado = await hubspot('/crm/v3/objects/contacts', 'POST', { properties: propsContato }, token);
      contatoId = criado.id;
    }

    // ---------- negócio ----------
    // Nome determinístico: evita duplicar se a pessoa enviar o formulário duas vezes.
    const nomeNegocio = `Claude para Negócios 31/08 — ${String(nome).trim()}`;

    const jaExiste = await hubspot('/crm/v3/objects/deals/search', 'POST', {
      filterGroups: [{ filters: [
        { propertyName: 'dealname', operator: 'EQ', value: nomeNegocio },
        { propertyName: 'pipeline', operator: 'EQ', value: PIPELINE_B2C },
      ] }],
      properties: ['dealname'],
      limit: 1,
    }, token);

    let negocioId = (jaExiste && jaExiste.total > 0) ? jaExiste.results[0].id : null;

    if (!negocioId) {
      const negocio = await hubspot('/crm/v3/objects/deals', 'POST', {
        properties: {
          dealname: nomeNegocio,
          pipeline: PIPELINE_B2C,
          dealstage: FASE_LEAD,
          amount: String(PRECO),
          closedate: FECHAMENTO,
          parceiro_origem: 'Direto',
        },
        associations: [{
          to: { id: contatoId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }], // negócio → contato
        }],
      }, token);
      negocioId = negocio.id;
    }

    return res.status(200).json({ ok: true, contatoId, negocioId });

  } catch (e) {
    // Falha no CRM não pode impedir o pagamento.
    console.error('[lead]', e.message);
    return res.status(200).json({ ok: false, erro: e.message });
  }
}
