import { useState, useEffect } from "react";

const C = {
  peach:"#FFBD59", black:"#000000", graphite:"#1A1A1A",
  grayMid:"#A6A6A6", grayLight:"#F5F5F5", white:"#FFFFFF",
};

const STORAGE_KEY     = "wmazza_avaliacoes_v2";
const AVALIADOS_KEY   = "wmazza_avaliados_v2";

const ALUNOS_T1 = [
  { primeiro:"Altair",   completo:"Altair Ribeiro" },
  { primeiro:"Braulio",  completo:"Braulio Barbosa" },
  { primeiro:"Douglas",  completo:"Douglas Antunes Back" },
  { primeiro:"Jessica",  completo:"Jessica Sell" },
  { primeiro:"Lidiane",  completo:"Lidiane Medeiros Jacinto" },
  { primeiro:"Luciano",  completo:"Luciano Gulgen" },
  { primeiro:"Renata",   completo:"Renata Jacob" },
  { primeiro:"Renato",   completo:"Renato Aragonez" },
  { primeiro:"Ricardo",  completo:"Ricardo Guizoni dos Anjos" },
  { primeiro:"Vitor",    completo:"Vitor Gustavo Lotoski" },
];

const EVENTOS = [
  { id:"claude-negocios-t1", nome:"Claude para Negócios — Turma 1", tipo:"presencial", data:"11/07/2026", alunos: ALUNOS_T1 },
  { id:"claude-negocios-t2", nome:"Claude para Negócios — Turma 2", tipo:"presencial", data:"18/07/2026", alunos: [] },
  { id:"claude-rh-t1",       nome:"Claude para RH — Turma 1",       tipo:"online",     data:"13-22/07/2026", alunos: [] },
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

function loadData()     { try { return JSON.parse(localStorage.getItem(STORAGE_KEY))   || []; } catch { return []; } }
function loadAvaliados(){ try { return JSON.parse(localStorage.getItem(AVALIADOS_KEY)) || []; } catch { return []; } }
function saveData(arr)  { localStorage.setItem(STORAGE_KEY,   JSON.stringify(arr)); }
function saveAvaliados(arr){ localStorage.setItem(AVALIADOS_KEY, JSON.stringify(arr)); }

/* ════════════════════════════════
   CERTIFICADO
════════════════════════════════ */
export function PaginaCertificado() {
  const params  = new URLSearchParams(window.location.search);
  const eventoId = params.get("evento") || "claude-negocios-t1";
  const alunoIdx = parseInt(params.get("aluno") || "0", 10);
  const evento   = EVENTOS.find(e => e.id === eventoId) || EVENTOS[0];
  const aluno    = evento.alunos[alunoIdx];

  useEffect(() => {
    document.title = `Certificado — ${aluno?.completo || ""}`;
    window.scrollTo(0, 0);
  }, []);

  if (!aluno) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
      <p>Certificado não encontrado.</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800;900&family=Inter:wght@400;500&family=Dancing+Script:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#222;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 16px}
        @media print{
          body{background:transparent;padding:0}
          .no-print{display:none!important}
          .cert-wrap{box-shadow:none!important;width:100%!important;max-width:none!important}
        }
      `}</style>

      {/* Botões */}
      <div className="no-print" style={{ display:"flex", gap:"12px", marginBottom:"28px" }}>
        <a href="/" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"13px", color:"#fff", textDecoration:"none", padding:"10px 20px", border:"1px solid rgba(255,255,255,.2)", borderRadius:"4px" }}>
          ← Voltar ao site
        </a>
        <button onClick={() => window.print()} style={{ fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"13px", background:C.peach, color:C.black, border:"none", padding:"10px 24px", borderRadius:"4px", cursor:"pointer" }}>
          Baixar como PDF →
        </button>
      </div>

      {/* Certificado */}
      <div className="cert-wrap" style={{
        width:"100%", maxWidth:"900px",
        aspectRatio:"1.414/1",
        background:"#0a0a0a",
        borderRadius:"8px",
        boxShadow:"0 32px 80px rgba(0,0,0,.8)",
        position:"relative",
        overflow:"hidden",
        display:"flex",
        alignItems:"center",
        padding:"0 7% 0 8%",
      }}>

        {/* Decoração dourada superior direita */}
        <svg style={{ position:"absolute", top:0, right:0, width:"45%", height:"55%" }} viewBox="0 0 400 300" preserveAspectRatio="none">
          <polygon points="120,0 400,0 400,300" fill="#FFBD59" opacity="0.9"/>
          <polygon points="200,0 400,0 400,180" fill="#1a1a1a" opacity="0.6"/>
        </svg>

        {/* Decoração dourada inferior esquerda */}
        <svg style={{ position:"absolute", bottom:0, left:0, width:"45%", height:"40%" }} viewBox="0 0 400 200" preserveAspectRatio="none">
          <polygon points="0,200 400,200 0,0" fill="#FFBD59" opacity="0.9"/>
          <polygon points="0,200 220,200 0,60" fill="#1a1a1a" opacity="0.6"/>
        </svg>

        {/* Conteúdo principal */}
        <div style={{ position:"relative", zIndex:2, flex:1 }}>
          {/* Título */}
          <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"clamp(28px,5vw,56px)", color:C.peach, letterSpacing:"0.08em", textTransform:"uppercase", lineHeight:1, marginBottom:"4px" }}>
            CERTIFICADO
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(12px,1.8vw,18px)", color:"rgba(255,255,255,.7)", marginBottom:"clamp(20px,4vw,44px)", letterSpacing:"0.04em" }}>
            de conclusão de curso
          </div>

          {/* Nome do aluno */}
          <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(22px,3.8vw,48px)", color:C.white, marginBottom:"6px" }}>
            {aluno.completo}
          </div>
          <div style={{ width:"min(280px,55%)", height:"1px", background:"rgba(255,255,255,.3)", marginBottom:"clamp(12px,2.5vw,24px)" }} />

          {/* Texto */}
          <div style={{ fontSize:"clamp(10px,1.5vw,15px)", color:"rgba(255,255,255,.8)", lineHeight:1.75, maxWidth:"420px", marginBottom:"clamp(20px,4vw,44px)" }}>
            No dia {evento.data.replace("/","/20")} concluiu o curso <strong style={{ color:C.white }}>{evento.nome.split("—")[0].trim()}</strong>,<br/>
            presencialmente com o Engenheiro William Mazza,<br/>
            com carga horária de <strong style={{ color:C.white }}>6 horas</strong> de duração.
          </div>

          {/* Assinatura */}
          <div>
            <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(16px,2.4vw,28px)", color:C.white, marginBottom:"4px" }}>
              William Mazza
            </div>
            <div style={{ fontSize:"clamp(9px,1.1vw,12px)", color:C.peach, letterSpacing:"0.12em" }}>
              @engenheiromazza
            </div>
          </div>
        </div>

        {/* Foto circular */}
        <div style={{ position:"relative", zIndex:2, flexShrink:0, marginLeft:"5%" }}>
          <div style={{
            width:"clamp(100px,16vw,160px)",
            height:"clamp(100px,16vw,160px)",
            borderRadius:"50%",
            border:`4px solid ${C.peach}`,
            overflow:"hidden",
            background:"#333",
          }}>
            <img
              src="https://raw.githubusercontent.com/engenheiromazza/site-engenheiro-mazza/main/Foto_WMazza.png"
              alt="William Mazza"
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
              onError={(e) => e.target.style.display="none"}
            />
          </div>
        </div>
      </div>

      <p className="no-print" style={{ color:"rgba(255,255,255,.4)", fontSize:"12px", marginTop:"16px", fontFamily:"'Inter',sans-serif" }}>
        Use Ctrl+P (ou Cmd+P) → "Salvar como PDF" para baixar o certificado.
      </p>
    </>
  );
}

/* ════════════════════════════════
   FORMULÁRIO DE AVALIAÇÃO
════════════════════════════════ */
export function PaginaAvaliacao() {
  const [eventoId,   setEventoId]   = useState("");
  const [alunoIdx,   setAlunoIdx]   = useState("");
  const [notas,      setNotas]      = useState({});
  const [criticas,   setCriticas]   = useState("");
  const [topicos,    setTopicos]    = useState("");
  const [enviado,    setEnviado]    = useState(false);
  const [certUrl,    setCertUrl]    = useState("");

  const avaliados  = loadAvaliados();
  const evento     = EVENTOS.find(e => e.id === eventoId);
  const presencial = evento?.tipo === "presencial";
  const temAlunos  = evento?.alunos?.length > 0;

  const alunosDisponiveis = (evento?.alunos || []).filter(
    (a, i) => !avaliados.includes(`${eventoId}:${i}`)
  );

  const criteriosVisiveis = CRITERIOS.filter(c =>
    !c.somentePresencial || presencial
  );

  const handleNota = (id, v) => setNotas(n => ({ ...n, [id]: v }));

  const completo = eventoId &&
    (!temAlunos || alunoIdx !== "") &&
    criteriosVisiveis.every(c => notas[c.id]);

  const handleSubmit = () => {
    if (!completo) return;
    const arr = loadData();
    const aluno = temAlunos ? evento.alunos[parseInt(alunoIdx)] : null;
    arr.push({
      eventoId,
      alunoNome: aluno?.primeiro || null,
      notas,
      criticas,
      topicos,
      ts: new Date().toISOString(),
    });
    saveData(arr);

    if (temAlunos && alunoIdx !== "") {
      const avs = loadAvaliados();
      avs.push(`${eventoId}:${alunoIdx}`);
      saveAvaliados(avs);
      const url = `/certificado?evento=${eventoId}&aluno=${alunoIdx}`;
      setCertUrl(url);
    }
    setEnviado(true);
  };

  useEffect(() => {
    document.title = "Avaliação — Engenheiro Mazza";
    window.scrollTo(0, 0);
  }, []);

  const inputStyle = {
    width:"100%", padding:"14px 16px",
    border:"1.5px solid #ddd", borderRadius:"4px",
    fontSize:"14px", fontFamily:"'Inter',sans-serif",
    outline:"none", cursor:"pointer",
  };

  if (enviado) return (
    <div style={{ minHeight:"100vh", background:C.graphite, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", padding:"24px" }}>
      <div style={{ textAlign:"center", padding:"48px 32px", maxWidth:"520px" }}>
        <div style={{ fontSize:"52px", marginBottom:"24px" }}>✅</div>
        <h2 style={{ fontFamily:"'Manrope',sans-serif", color:C.white, fontSize:"28px", marginBottom:"12px" }}>
          Obrigado pela avaliação!
        </h2>
        <p style={{ color:C.grayMid, fontSize:"15px", lineHeight:1.7, marginBottom:"32px" }}>
          Seu feedback é fundamental para melhorar continuamente os treinamentos.
        </p>
        {certUrl && (
          <a href={certUrl} style={{
            display:"inline-block", background:C.peach, color:C.black,
            fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"15px",
            padding:"16px 32px", borderRadius:"4px", textDecoration:"none",
          }}>
            Acessar meu certificado →
          </a>
        )}
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
          Sua opinião<br /><span style={{ color:C.peach }}>libera seu certificado.</span>
        </h1>
        <p style={{ color:"#666", fontSize:"14px", lineHeight:1.7, marginBottom:"40px" }}>
          Preencha a avaliação e acesse seu certificado de conclusão na sequência.
        </p>

        {/* Selecionar evento */}
        <div style={{ marginBottom:"24px" }}>
          <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.grayMid, display:"block", marginBottom:"8px" }}>
            Qual treinamento você participou?
          </label>
          <select value={eventoId} onChange={e => { setEventoId(e.target.value); setAlunoIdx(""); setNotas({}); }}
            style={inputStyle}>
            <option value="">Selecione o treinamento...</option>
            {EVENTOS.map(e => (
              <option key={e.id} value={e.id}>{e.nome} ({e.data})</option>
            ))}
          </select>
        </div>

        {/* Selecionar nome (somente eventos com lista de alunos) */}
        {eventoId && temAlunos && (
          <div style={{ marginBottom:"32px" }}>
            <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.grayMid, display:"block", marginBottom:"8px" }}>
              Qual é o seu nome?
            </label>
            {alunosDisponiveis.length === 0 ? (
              <div style={{ padding:"14px 16px", background:"#f0f0f0", borderRadius:"4px", fontSize:"14px", color:C.grayMid }}>
                Todos os participantes desta turma já avaliaram. Obrigado!
              </div>
            ) : (
              <select value={alunoIdx} onChange={e => setAlunoIdx(e.target.value)} style={inputStyle}>
                <option value="">Selecione seu primeiro nome...</option>
                {alunosDisponiveis.map((a) => {
                  const idx = evento.alunos.indexOf(a);
                  return <option key={idx} value={idx}>{a.primeiro}</option>;
                })}
              </select>
            )}
          </div>
        )}

        {/* Critérios */}
        {eventoId && (!temAlunos || alunoIdx !== "") && (
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
                        background:  notas[c.id] === s.v ? C.peach : C.white,
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

            <div>
              <label style={{ fontWeight:600, fontSize:"14px", display:"block", marginBottom:"8px" }}>
                Críticas ou sugestões <span style={{ color:C.grayMid, fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={criticas} onChange={e => setCriticas(e.target.value)} rows={4}
                placeholder="Compartilhe o que poderia melhorar ou o que mais gostou..."
                style={{ ...inputStyle, resize:"vertical" }}
                onFocus={e => e.target.style.borderColor=C.peach}
                onBlur={e => e.target.style.borderColor="#ddd"}
              />
            </div>

            <div>
              <label style={{ fontWeight:600, fontSize:"14px", display:"block", marginBottom:"8px" }}>
                Algum tópico que gostaria de ver incluído? <span style={{ color:C.grayMid, fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={topicos} onChange={e => setTopicos(e.target.value)} rows={3}
                placeholder="Ex: uso do Claude em contratos, análise financeira com IA..."
                style={{ ...inputStyle, resize:"vertical" }}
                onFocus={e => e.target.style.borderColor=C.peach}
                onBlur={e => e.target.style.borderColor="#ddd"}
              />
            </div>

            <button onClick={handleSubmit} disabled={!completo}
              style={{
                background: completo ? C.peach : "#ddd",
                color:      completo ? C.black : "#999",
                border:"none", borderRadius:"4px", padding:"16px 32px",
                fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:"15px",
                cursor: completo ? "pointer" : "not-allowed",
                transition:"all .2s", alignSelf:"flex-start",
              }}>
              Enviar e acessar certificado →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ════════════════════════════════
   DASHBOARD
════════════════════════════════ */
function BarraCriterio({ label, media }) {
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
  const [dados, setDados]           = useState([]);
  const [filtroEvento, setFiltro]   = useState("todos");

  useEffect(() => {
    document.title = "Avaliações — Engenheiro Mazza";
    window.scrollTo(0, 0);
    setDados(loadData());
    const iv = setInterval(() => setDados(loadData()), 5000);
    return () => clearInterval(iv);
  }, []);

  const dadosFiltrados = filtroEvento === "todos"
    ? dados : dados.filter(d => d.eventoId === filtroEvento);

  const total = dadosFiltrados.length;

  const mediaGeral = total === 0 ? 0 : (() => {
    let soma = 0, count = 0;
    dadosFiltrados.forEach(d => Object.values(d.notas).forEach(v => { soma += v; count++; }));
    return count > 0 ? soma / count : 0;
  })();

  const mediasPorCriterio = CRITERIOS.map(c => {
    const vals = dadosFiltrados.map(d => d.notas[c.id]).filter(v => v !== undefined);
    return { ...c, media: vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null };
  }).filter(c => c.media !== null).sort((a,b) => b.media - a.media);

  // Comentários ANÔNIMOS — sem nome
  const comentarios = dadosFiltrados.filter(d => d.criticas?.trim()).slice(-10).reverse();
  const topicos     = dadosFiltrados.filter(d => d.topicos?.trim()).slice(-10).reverse();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#F5F5F5;color:#1A1A1A}
        select{appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%23999'/%3E%3C/svg%3E") no-repeat right 14px center;background-size:10px;cursor:pointer}
      `}</style>

      <header style={{ background:C.white, borderBottom:"1px solid rgba(0,0,0,.08)", padding:"18px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <a href="/" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"16px", color:C.graphite, textDecoration:"none" }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </a>
        <select value={filtroEvento} onChange={e => setFiltro(e.target.value)}
          style={{ padding:"10px 36px 10px 14px", border:"1.5px solid #ddd", borderRadius:"4px", fontSize:"13px", fontFamily:"'Inter',sans-serif" }}>
          <option value="todos">Todos os eventos</option>
          {EVENTOS.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>
      </header>

      <div style={{ maxWidth:"920px", margin:"0 auto", padding:"48px 24px 80px" }}>
        <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:".18em", color:C.peach, marginBottom:"12px", textTransform:"uppercase" }}>Avaliações</div>
        <h1 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:900, lineHeight:1.05, marginBottom:"40px" }}>
          Resultado dos<br /><span style={{ color:C.peach }}>treinamentos.</span>
        </h1>

        {total === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 24px", color:C.grayMid, fontSize:"15px" }}>
            Nenhuma avaliação registrada ainda.
          </div>
        ) : (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"16px", marginBottom:"48px" }}>
              {[
                { label:"Avaliações recebidas", valor:total },
                { label:"Nota média geral",     valor:mediaGeral.toFixed(1)+"  / 5" },
                { label:"Eventos avaliados",    valor:[...new Set(dados.map(d=>d.eventoId))].length },
              ].map((k,i) => (
                <div key={i} style={{ background:i===1?C.graphite:C.white, borderRadius:"4px", padding:"28px 24px", border:"1px solid rgba(0,0,0,.07)" }}>
                  <div style={{ fontSize:"34px", fontFamily:"'Manrope',sans-serif", fontWeight:900, color:i===1?C.peach:C.graphite }}>{k.valor}</div>
                  <div style={{ fontSize:"12px", color:C.grayMid, marginTop:"6px" }}>{k.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background:C.white, borderRadius:"4px", padding:"36px 32px", border:"1px solid rgba(0,0,0,.07)", marginBottom:"24px" }}>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"28px" }}>Médias por critério</h3>
              {mediasPorCriterio.map(c => <BarraCriterio key={c.id} label={c.label} media={c.media} />)}
            </div>

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

            {topicos.length > 0 && (
              <div style={{ background:C.white, borderRadius:"4px", padding:"36px 32px", border:"1px solid rgba(0,0,0,.07)" }}>
                <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"24px" }}>Tópicos sugeridos</h3>
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
