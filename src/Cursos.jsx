import { useEffect } from "react";

const C = {
  peach:    "#FFBD59",
  black:    "#000000",
  graphite: "#1A1A1A",
  grayMid:  "#A6A6A6",
  grayLight:"#F5F5F5",
  white:    "#FFFFFF",
};

const cursos = [
  {
    titulo: "Curso Completo de ChatGPT",
    descricao: "Do zero ao uso avançado do ChatGPT para profissionais de escritório, gestores e equipes administrativas. Prático, direto e aplicável ao dia a dia corporativo.",
    nivel: "Básico",
    ferramenta: "ChatGPT",
    link: "https://hotmart.com/pt-br/marketplace/produtos/hagsxd-curso-completo-de-chatgpt-5a05n/S102029842V",
  },
  {
    titulo: "Curso Completo de Copilot",
    descricao: "Domine o Microsoft Copilot integrado ao Word, Excel, Outlook, Teams e PowerPoint. Para profissionais que usam o pacote Office no dia a dia.",
    nivel: "Básico",
    ferramenta: "Microsoft Copilot",
    link: "https://hotmart.com/pt-br/marketplace/produtos/curso-completo-de-copilot/A102691428Y",
  },
  {
    titulo: "AgenteIA: O fim do trabalho braçal na era digital",
    descricao: "Como usar agentes de inteligência artificial para eliminar tarefas repetitivas, automatizar processos e recuperar tempo para o que realmente importa.",
    nivel: "Básico",
    ferramenta: "Agentes de IA",
    link: "https://hotmart.com/pt-br/marketplace/produtos/agenteia-liberte-se-do-invisivel/A104597946M",
  },
  {
    titulo: "Prompting Sem Segredos",
    descricao: "15 técnicas de prompting com exemplos práticos de 12 áreas corporativas. Aprenda a construir seus próprios prompts e aplique imediatamente com qualquer IA.",
    nivel: "Básico",
    ferramenta: "ChatGPT · Claude · Gemini",
    link: "https://hotmart.com/pt-br/marketplace/produtos/prompting-sem-segredos/B100885453K",
  },
  {
    titulo: "SamuRHai",
    descricao: "Programa avançado de IA aplicada ao universo de Recursos Humanos. Para profissionais que querem dominar o uso estratégico da inteligência artificial na gestão de pessoas.",
    nivel: "Intermediário",
    ferramenta: "IA para RH",
    link: "https://hotmart.com/pt-br/marketplace/produtos/samurhai/I103629783E",
  },
  {
    titulo: "RobôIA — Crie sua primeira automação com IA em minutos",
    descricao: "Crie automações com inteligência artificial sem precisar programar. Para profissionais que querem automatizar tarefas repetitivas do trabalho de forma simples e rápida.",
    nivel: "Básico",
    ferramenta: "Automação com IA",
    link: "https://hotmart.com/pt-br/marketplace/produtos/roboia-crie-sua-primeira-automacao-com-ia-em-minutos-sem-precisar-programar/J104641645U",
  },
];

const nivelCor = {
  "Básico": { bg: "#F5F5F5", color: "#1A1A1A" },
  "Intermediário": { bg: "#FFBD59", color: "#000" },
};

export default function PaginaCursos() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cursos — Engenheiro Mazza";
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;background:#F5F5F5;color:#1A1A1A;overflow-x:hidden}
        h1,h2,h3{font-family:'Manrope',sans-serif;font-weight:800}
        ::selection{background:#FFBD59;color:#000}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#FFBD59;border-radius:2px}
        .card-curso{background:#fff;border-radius:4px;border:1px solid rgba(0,0,0,.07);padding:36px 32px;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
        .card-curso:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.1)}
        .btn-acessar{display:inline-flex;align-items:center;gap:8px;background:#FFBD59;color:#000;font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;padding:13px 24px;border-radius:2px;text-decoration:none;transition:background .2s,transform .15s;margin-top:auto}
        .btn-acessar:hover{background:#e6a93e;transform:translateY(-1px)}
        .btn-voltar{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#1A1A1A;font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;padding:12px 24px;border:1.5px solid #1A1A1A;border-radius:2px;text-decoration:none;transition:all .2s}
        .btn-voltar:hover{background:#1A1A1A;color:#F5F5F5}
      `}</style>

      {/* Header */}
      <header style={{ background:C.white, borderBottom:"1px solid rgba(0,0,0,.08)", padding:"20px 64px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
        <a href="/" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"17px", color:C.graphite, textDecoration:"none" }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </a>
        <a href="/" className="btn-voltar">← Voltar ao site</a>
      </header>

      {/* Hero da página */}
      <section style={{ background:`linear-gradient(135deg,${C.graphite} 60%,#2a2a2a 100%)`, padding:"80px 64px" }}>
        <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
          <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:C.peach, display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
            <span style={{ width:"28px", height:"2px", background:C.peach, display:"block" }} />
            Cursos Online
          </div>
          <h1 style={{ fontSize:"clamp(32px,4vw,56px)", color:C.white, lineHeight:1.05, letterSpacing:"-1.5px", marginBottom:"16px" }}>
            Aprenda IA no seu<br /><span style={{ color:C.peach }}>ritmo e contexto.</span>
          </h1>
          <p style={{ fontSize:"16px", color:C.grayMid, lineHeight:1.8, maxWidth:"520px" }}>
            Cursos práticos e objetivos para profissionais que querem usar inteligência artificial
            com clareza, segurança e resultado — sem depender de equipes técnicas.
          </p>
        </div>
      </section>

      {/* Grid de cursos */}
      <section style={{ padding:"72px 64px", maxWidth:"1124px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"24px" }}>
          {cursos.map((c, i) => (
            <div key={i} className="card-curso">
              {/* Nível + ferramenta */}
              <div style={{ display:"flex", gap:"8px", marginBottom:"16px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"10px", fontWeight:700, padding:"4px 10px", borderRadius:"2px", background:nivelCor[c.nivel].bg, color:nivelCor[c.nivel].color }}>
                  {c.nivel}
                </span>
                <span style={{ fontSize:"10px", fontWeight:600, color:C.grayMid, border:"1px solid #e0e0e0", padding:"4px 10px", borderRadius:"2px" }}>
                  {c.ferramenta}
                </span>
              </div>

              {/* Título */}
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, lineHeight:1.25, marginBottom:"12px", color:C.graphite }}>
                {c.titulo}
              </h3>

              {/* Descrição */}
              <p style={{ fontSize:"13px", lineHeight:1.75, color:"#666", marginBottom:"28px", flexGrow:1 }}>
                {c.descricao}
              </p>

              {/* Botão */}
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn-acessar">
                Acessar curso →
              </a>
            </div>
          ))}
        </div>

        {/* Rodapé da página */}
        <div style={{ marginTop:"64px", paddingTop:"32px", borderTop:"1px solid rgba(0,0,0,.08)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
          <div style={{ fontSize:"13px", color:C.grayMid }}>
            Novos cursos em desenvolvimento. Acompanhe em{" "}
            <a href="https://www.instagram.com/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color:C.peach, textDecoration:"none" }}>@engenheiromazza</a>
          </div>
          <a href="/" className="btn-voltar">← Voltar ao site</a>
        </div>
      </section>

      {/* Footer simples */}
      <footer style={{ background:C.black, padding:"28px 64px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"14px", color:C.white }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </div>
        <div style={{ fontSize:"11px", color:C.grayMid }}>© 2026 William Mazza</div>
      </footer>

      <style>{`@media(max-width:768px){header,section,footer{padding-left:24px!important;padding-right:24px!important}}`}</style>
    </>
  );
}
