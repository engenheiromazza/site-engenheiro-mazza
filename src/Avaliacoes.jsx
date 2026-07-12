import { useState, useEffect } from "react";

const C = {
  peach:"#FFBD59", black:"#000000", graphite:"#1A1A1A",
  grayMid:"#A6A6A6", grayLight:"#F5F5F5", white:"#FFFFFF",
};

const STORAGE_KEY = "wmazza_avaliacoes_v1";

const EVENTOS = [
  { id:"claude-negocios-t1", nome:"Claude para Negócios — Turma 1", tipo:"presencial", data:"11/07/2026" },
  { id:"claude-negocios-t2", nome:"Claude para Negócios — Turma 2", tipo:"presencial", data:"18/07/2026" },
  { id:"claude-rh-t1",       nome:"Claude para RH — Turma 1",       tipo:"online",     data:"13-22/07/2026" },
];

const CRITERIOS = [
  { id:"conteudo",    label:"Conteúdo do curso" },
  { id:"aplicacao",   label:"Aplicabilidade prática" },
  { id:"preparo",     label:"Preparo do instrutor" },
  { id:"conducao",    label:"Condução e didática" },
  { id:"carga",       label:"Carga horária" },
  { id:"expectativa", label:"Expectativa vs. entrega" },
  { id:"evolucao",    label:"Sentiu evolução após o curso?" },
  { id:"indicaria",   label:"Indicaria para um colega?" },
  { id:"local",       label:"Local do evento", somentePresencial: true },
  { id:"coffee",      label:"Qualidade do coffee break", somentePresencial: true },
  { id:"formato",     label:"Equilíbrio teoria e prática" },
];

const ESCALA = [
  { v:1, label:"Muito insatisfeito" },
  { v:2, label:"Insatisfeito" },
  { v:3, label:"Neutro" },
  { v:4, label:"Satisfeito" },
  { v:5, label:"Muito satisfeito" },
];

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveData(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/* ─── FORMULÁRIO ─── */
export function PaginaAvaliacao() {
  const [eventoId, setEventoId] = useState("");
  const [notas, setNotas]       = useState({});
  const [criticas, setCriticas] = useState("");
  const [topicos, setTopicos]   = useState("");
  const [enviado, setEnviado]   = useState(false);

  const evento = EVENTOS.find(e => e.id === eventoId);
  const presencial = evento?.tipo === "presencial";

  const criteriosVisiveis = CRITERIOS.filter(c =>
    !c.somentePresencial || presencial
  );

  const handleNota = (id, v) => setNotas(n => ({ ...n, [id]: v }));

  const completo = eventoId &&
    criteriosVisiveis.every(c => notas[c.id]);

  const handleSubmit = () => {
    if (!completo) return;
    const arr = loadData();
    arr.push({
      eventoId, notas, criticas, topicos,
      ts: new Date().toISOString(),
    });
    saveData(arr);
    setEnviado(true);
  };

  useEffect(() => {
    document.title = "Avaliação — Engenheiro Mazza";
    window.scrollTo(0, 0);
  }, []);

  if (enviado) return (
    <div style={{ minHeight:"100vh", background:C.graphite, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ textAlign:"center", padding:"48px 32px", maxWidth:"480px" }}>
        <div style={{ fontSize:"48px", marginBottom:"24px" }}>✅</div>
        <h2 style={{ fontFamily:"'Manrope',sans-serif", color:C.white, fontSize:"28px", marginBottom:"12px" }}>
          Obrigado pela avaliação!
        </h2>
        <p style={{ color:C.grayMid, fontSize:"15px", lineHeight:1.7 }}>
          Seu feedback é fundamental para melhorar continuamente os treinamentos.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#F5F5F5;color:#1A1A1A}
        ::selection{background:#FFBD59;color:#000}
        select{appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%23999'/%3E%3C/svg%3E") no-repeat right 14px center;background-size:10px}
      `}</style>

      {/* Header */}
      <header style={{ background:C.white, borderBottom:"1px solid rgba(0,0,0,.08)", padding:"18px 40px" }}>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"16px" }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </div>
      </header>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"48px 24px 80px" }}>
        <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:".18em", color:C.peach, marginBottom:"12px", textTransform:"uppercase" }}>
          Avaliação de Treinamento
        </div>
        <h1 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:900, lineHeight:1.1, marginBottom:"8px" }}>
          Sua opinião<br /><span style={{ color:C.peach }}>faz a diferença.</span>
        </h1>
        <p style={{ color:"#666", fontSize:"14px", lineHeight:1.7, marginBottom:"40px" }}>
          Avaliação anônima. Leva menos de 3 minutos.
        </p>

        {/* Selecionar evento */}
        <div style={{ marginBottom:"32px" }}>
          <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.grayMid, display:"block", marginBottom:"8px" }}>
            Qual treinamento você participou?
          </label>
          <select value={eventoId} onChange={e => { setEventoId(e.target.value); setNotas({}); }}
            style={{ width:"100%", padding:"14px 40px 14px 16px", border:"1.5px solid #ddd", borderRadius:"4px", fontSize:"14px", fontFamily:"'Inter',sans-serif", cursor:"pointer" }}>
            <option value="">Selecione o treinamento...</option>
            {EVENTOS.map(e => (
              <option key={e.id} value={e.id}>{e.nome} ({e.data})</option>
            ))}
          </select>
        </div>

        {/* Critérios */}
        {eventoId && (
          <div style={{ display:"flex", flexDirection:"column", gap:"28px", marginBottom:"36px" }}>
            {criteriosVisiveis.map(c => (
              <div key={c.id}>
                <div style={{ fontWeight:600, fontSize:"14px", marginBottom:"10px" }}>{c.label}</div>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {ESCALA.map(s => (
                    <button key={s.v} onClick={() => handleNota(c.id, s.v)}
                      title={s.label}
                      style={{
                        width:"48px", height:"48px", borderRadius:"4px", border:"1.5px solid",
                        borderColor: notas[c.id] === s.v ? C.peach : "#ddd",
                        background: notas[c.id] === s.v ? C.peach : C.white,
                        fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"16px",
                        cursor:"pointer", transition:"all .15s",
                        color: notas[c.id] === s.v ? C.black : "#999",
                      }}>
                      {s.v}
                    </button>
                  ))}
                </div>
                {notas[c.id] && (
                  <div style={{ fontSize:"11px", color:C.grayMid, marginTop:"5px" }}>
                    {ESCALA.find(s => s.v === notas[c.id])?.label}
                  </div>
                )}
              </div>
            ))}

            {/* Campo aberto — críticas */}
            <div>
              <label style={{ fontWeight:600, fontSize:"14px", display:"block", marginBottom:"8px" }}>
                Críticas ou sugestões <span style={{ color:C.grayMid, fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={criticas} onChange={e => setCriticas(e.target.value)} rows={4}
                placeholder="Compartilhe o que poderia melhorar ou o que mais gostou..."
                style={{ width:"100%", padding:"14px 16px", border:"1.5px solid #ddd", borderRadius:"4px", fontSize:"14px", fontFamily:"'Inter',sans-serif", resize:"vertical", outline:"none" }}
                onFocus={e => e.target.style.borderColor=C.peach}
                onBlur={e => e.target.style.borderColor="#ddd"}
              />
            </div>

            {/* Campo aberto — tópicos */}
            <div>
              <label style={{ fontWeight:600, fontSize:"14px", display:"block", marginBottom:"8px" }}>
                Algum tópico que gostaria de ver incluído? <span style={{ color:C.grayMid, fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={topicos} onChange={e => setTopicos(e.target.value)} rows={3}
                placeholder="Ex: uso do Claude em contratos, análise financeira com IA..."
                style={{ width:"100%", padding:"14px 16px", border:"1.5px solid #ddd", borderRadius:"4px", fontSize:"14px", fontFamily:"'Inter',sans-serif", resize:"vertical", outline:"none" }}
                onFocus={e => e.target.style.borderColor=C.peach}
                onBlur={e => e.target.style.borderColor="#ddd"}
              />
            </div>

            <button onClick={handleSubmit} disabled={!completo}
              style={{
                background: completo ? C.peach : "#ddd",
                color: completo ? C.black : "#999",
                border:"none", borderRadius:"4px", padding:"16px 32px",
                fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"15px",
                cursor: completo ? "pointer" : "not-allowed",
                transition:"all .2s", alignSelf:"flex-start",
              }}>
              Enviar avaliação →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── DASHBOARD ─── */
function Estrelas({ media }) {
  return (
    <div style={{ display:"flex", gap:"3px", alignItems:"center" }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width:"14px", height:"14px", borderRadius:"2px",
          background: i <= Math.round(media) ? C.peach : "#e0e0e0",
        }} />
      ))}
      <span style={{ fontSize:"13px", fontWeight:700, marginLeft:"6px" }}>{media.toFixed(1)}</span>
    </div>
  );
}

function BarraCriterio({ label, media, total }) {
  const pct = (media / 5) * 100;
  return (
    <div style={{ marginBottom:"16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
        <span style={{ fontSize:"13px", fontWeight:500 }}>{label}</span>
        <span style={{ fontSize:"13px", fontWeight:700, color:C.peach }}>{media.toFixed(1)}</span>
      </div>
      <div style={{ height:"8px", background:"#e8e8e8", borderRadius:"4px", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:C.peach, borderRadius:"4px", transition:"width .6s ease" }} />
      </div>
    </div>
  );
}

export function PaginaDashboard() {
  const [dados, setDados] = useState([]);
  const [filtroEvento, setFiltroEvento] = useState("todos");

  useEffect(() => {
    document.title = "Avaliações — Engenheiro Mazza";
    window.scrollTo(0, 0);
    setDados(loadData());
    const interval = setInterval(() => setDados(loadData()), 5000);
    return () => clearInterval(interval);
  }, []);

  const dadosFiltrados = filtroEvento === "todos"
    ? dados
    : dados.filter(d => d.eventoId === filtroEvento);

  const totalRespostas = dadosFiltrados.length;

  const mediaGeral = totalRespostas === 0 ? 0 : (() => {
    let soma = 0, count = 0;
    dadosFiltrados.forEach(d => {
      Object.values(d.notas).forEach(v => { soma += v; count++; });
    });
    return count > 0 ? soma / count : 0;
  })();

  const mediasPorCriterio = CRITERIOS.map(c => {
    const vals = dadosFiltrados
      .map(d => d.notas[c.id])
      .filter(v => v !== undefined);
    return {
      ...c,
      media: vals.length > 0 ? vals.reduce((a,b)=>a+b,0)/vals.length : null,
      total: vals.length,
    };
  }).filter(c => c.media !== null);

  const comentarios = dadosFiltrados
    .filter(d => d.criticas?.trim())
    .slice(-10).reverse();

  const topicos = dadosFiltrados
    .filter(d => d.topicos?.trim())
    .slice(-10).reverse();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#F5F5F5;color:#1A1A1A}
        select{appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%23999'/%3E%3C/svg%3E") no-repeat right 14px center;background-size:10px;cursor:pointer}
      `}</style>

      {/* Header */}
      <header style={{ background:C.white, borderBottom:"1px solid rgba(0,0,0,.08)", padding:"18px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <a href="/" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"16px", color:C.graphite, textDecoration:"none" }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </a>
        <select value={filtroEvento} onChange={e => setFiltroEvento(e.target.value)}
          style={{ padding:"10px 36px 10px 14px", border:"1.5px solid #ddd", borderRadius:"4px", fontSize:"13px", fontFamily:"'Inter',sans-serif" }}>
          <option value="todos">Todos os eventos</option>
          {EVENTOS.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>
      </header>

      <div style={{ maxWidth:"920px", margin:"0 auto", padding:"48px 24px 80px" }}>
        <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:".18em", color:C.peach, marginBottom:"12px", textTransform:"uppercase" }}>
          Avaliações
        </div>
        <h1 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:900, lineHeight:1.05, marginBottom:"40px" }}>
          Resultado dos<br /><span style={{ color:C.peach }}>treinamentos.</span>
        </h1>

        {totalRespostas === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 24px", color:C.grayMid, fontSize:"15px" }}>
            Nenhuma avaliação registrada ainda.
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"16px", marginBottom:"48px" }}>
              {[
                { label:"Avaliações recebidas", valor:totalRespostas, sufixo:"" },
                { label:"Nota média geral", valor:mediaGeral.toFixed(1), sufixo:"/ 5" },
                { label:"Eventos avaliados", valor:[...new Set(dados.map(d=>d.eventoId))].length, sufixo:"" },
              ].map((k,i) => (
                <div key={i} style={{ background:i===1?C.graphite:C.white, borderRadius:"4px", padding:"28px 24px", border:"1px solid rgba(0,0,0,.07)" }}>
                  <div style={{ fontSize:"36px", fontFamily:"'Manrope',sans-serif", fontWeight:900, color:i===1?C.peach:C.graphite }}>
                    {k.valor}<span style={{ fontSize:"16px", fontWeight:600, color:i===1?C.grayMid:C.grayMid }}>{k.sufixo && ` ${k.sufixo}`}</span>
                  </div>
                  <div style={{ fontSize:"12px", color:i===1?C.grayMid:C.grayMid, marginTop:"6px" }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Médias por critério */}
            <div style={{ background:C.white, borderRadius:"4px", padding:"36px 32px", border:"1px solid rgba(0,0,0,.07)", marginBottom:"24px" }}>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"28px" }}>Médias por critério</h3>
              {mediasPorCriterio
                .sort((a,b) => b.media - a.media)
                .map(c => <BarraCriterio key={c.id} label={c.label} media={c.media} total={c.total} />)}
            </div>

            {/* Comentários */}
            {comentarios.length > 0 && (
              <div style={{ background:C.white, borderRadius:"4px", padding:"36px 32px", border:"1px solid rgba(0,0,0,.07)", marginBottom:"24px" }}>
                <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"24px" }}>Críticas e sugestões</h3>
                {comentarios.map((d,i) => (
                  <div key={i} style={{ padding:"16px 0", borderBottom:i<comentarios.length-1?"1px solid #f0f0f0":"none" }}>
                    <div style={{ fontSize:"13px", color:"#444", lineHeight:1.7, fontStyle:"italic" }}>"{d.criticas}"</div>
                    <div style={{ fontSize:"11px", color:C.grayMid, marginTop:"6px" }}>
                      {EVENTOS.find(e=>e.id===d.eventoId)?.nome} · {new Date(d.ts).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tópicos sugeridos */}
            {topicos.length > 0 && (
              <div style={{ background:C.white, borderRadius:"4px", padding:"36px 32px", border:"1px solid rgba(0,0,0,.07)" }}>
                <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"24px" }}>Tópicos sugeridos pelos participantes</h3>
                {topicos.map((d,i) => (
                  <div key={i} style={{ padding:"12px 0", borderBottom:i<topicos.length-1?"1px solid #f0f0f0":"none", fontSize:"13px", color:"#444", lineHeight:1.7 }}>
                    → {d.topicos}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
