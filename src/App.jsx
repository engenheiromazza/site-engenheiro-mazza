import { useState, useEffect, useRef } from "react";

const C = {
  peach:    "#FFBD59",
  black:    "#000000",
  graphite: "#1A1A1A",
  grayMid:  "#A6A6A6",
  grayLight:"#F5F5F5",
  white:    "#FFFFFF",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:#F5F5F5;color:#1A1A1A;overflow-x:hidden}
  h1,h2,h3,h4,h5{font-family:'Manrope',sans-serif;font-weight:800}
  ::selection{background:#FFBD59;color:#000}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:#F5F5F5}
  ::-webkit-scrollbar-thumb{background:#FFBD59;border-radius:2px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 64px;transition:background .3s,box-shadow .3s}
  nav.scrolled{background:rgba(245,245,245,.97);box-shadow:0 1px 0 rgba(0,0,0,.08);backdrop-filter:blur(8px)}
  .nav-logo{font-family:'Manrope',sans-serif;font-weight:900;font-size:17px;color:#1A1A1A;text-decoration:none;letter-spacing:-0.5px}
  .nav-logo span{color:#FFBD59}
  .nav-links{display:flex;gap:32px;list-style:none}
  .nav-links a{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#1A1A1A;text-decoration:none;position:relative;transition:color .2s}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:#FFBD59;transition:width .25s}
  .nav-links a:hover::after{width:100%}
  .nav-cta{background:#FFBD59;color:#000!important;padding:9px 22px;border-radius:2px;font-weight:700!important}
  .nav-cta:hover{background:#e6a93e!important}
  .nav-cta::after{display:none!important}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
  .hamburger span{display:block;width:24px;height:2px;background:#1A1A1A;transition:all .3s}
  section{padding:96px 64px}
  .section-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#FFBD59;display:flex;align-items:center;gap:10px;margin-bottom:16px}
  .section-label::before{content:'';display:block;width:28px;height:2px;background:#FFBD59}
  .btn-primary{display:inline-flex;align-items:center;gap:8px;background:#FFBD59;color:#000;font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;letter-spacing:.04em;padding:14px 28px;border:none;cursor:pointer;text-decoration:none;transition:background .2s,transform .15s,box-shadow .2s;border-radius:2px}
  .btn-primary:hover{background:#e6a93e;transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,189,89,.35)}
  .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#1A1A1A;font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;letter-spacing:.04em;padding:13px 27px;border:1.5px solid #1A1A1A;cursor:pointer;text-decoration:none;transition:all .2s;border-radius:2px}
  .btn-outline:hover{background:#1A1A1A;color:#F5F5F5}
  @media(max-width:900px){
    nav{padding:18px 24px}
    section{padding:72px 24px}
    .hamburger{display:flex}
    .nav-links{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#F5F5F5;flex-direction:column;align-items:center;justify-content:center;gap:40px;z-index:99}
    .nav-links.open{display:flex}
    .nav-links a{font-size:20px}
  }
`;

function StyleInjector() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = globalCSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return null;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Sobre",       href: "#sobre" },
    { label: "Serviços",    href: "#servicos" },
    { label: "Cursos",      href: "#cursos" },
    { label: "Mentoria",    href: "#mentoria" },
    { label: "Livro",       href: "#livro" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Clientes",    href: "#clientes" },
    { label: "Contato",     href: "#contato", cta: true },
  ];
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">@engenheiro<span>mazza</span></a>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={l.cta ? "nav-cta" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: "120px",
      background: "linear-gradient(135deg,#F5F5F5 60%,#FFF8EC 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* geometric accents */}
      <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"520px", height:"520px", border:"1px solid rgba(255,189,89,.13)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"60px", right:"60px", width:"340px", height:"340px", border:"1px solid rgba(255,189,89,.07)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"300px", height:"300px", border:"1px solid rgba(255,189,89,.07)", borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ maxWidth:"820px", animation:"fadeUp .9s ease both", animationDelay:".1s" }}>
        <div className="section-label">IA aplicada ao trabalho real</div>
        <h1 style={{ fontSize:"clamp(44px,6vw,80px)", lineHeight:1.02, letterSpacing:"-2.5px", color:C.graphite, marginBottom:"32px" }}>
          Inteligência Artificial<br />com <span style={{ color:C.peach }}>método, clareza</span><br />e responsabilidade.
        </h1>

        <div style={{ display:"flex", gap:"48px", marginBottom:"40px", flexWrap:"wrap" }}>
          <p style={{ fontSize:"17px", lineHeight:1.85, color:"#555", maxWidth:"520px" }}>
            Ajudo profissionais, líderes e empresas a compreender e aplicar inteligência artificial
            com profundidade — traduzindo tecnologia em decisões melhores, equipes mais produtivas
            e impacto real no trabalho.
          </p>
        </div>

        <p style={{ fontSize:"14px", lineHeight:1.7, color:C.grayMid, marginBottom:"44px", fontStyle:"italic", borderLeft:`3px solid ${C.peach}`, paddingLeft:"16px", maxWidth:"440px" }}>
          "A IA só gera valor quando sai da teoria e entra no fluxo real de trabalho.<br />Nem hype, nem pânico. Método, contexto e aplicação."
        </p>

        <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", marginBottom:"64px" }}>
          <a href="#servicos" className="btn-primary">Ver serviços →</a>
          <a href="#sobre" className="btn-outline">Sobre William Mazza</a>
        </div>

        <div style={{ display:"flex", gap:"48px", flexWrap:"wrap", paddingTop:"32px", borderTop:"1px solid rgba(0,0,0,.08)" }}>
          {[
            { num:"20+",  label:"Anos de experiência" },
            { num:"500+", label:"Profissionais formados" },
            { num:"B2B",  label:"Clientes corporativos" },
            { num:"B2C",  label:"Profissionais de mercado" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"28px", color:C.graphite, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:"11px", color:C.grayMid, marginTop:"5px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SOBRE ── */
function Sobre() {
  const ref = useReveal();
  return (
    <section id="sobre" style={{ background:C.white }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto", display:"grid", gridTemplateColumns:"420px 1fr", gap:"80px", alignItems:"center" }}>

        {/* Foto */}
        <div style={{ position:"relative" }}>
          <div style={{
            borderRadius:"4px",
            overflow:"hidden",
            aspectRatio:"1/1",
            background:C.grayLight,
            position:"relative",
          }}>
            <img
              src="https://raw.githubusercontent.com/engenheiromazza/site-engenheiro-mazza/main/Foto_WMazza.png"
              alt="William Mazza"
              onError={(e) => { e.target.style.display='none'; }}
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
            />
            {/* barra pêssego inferior */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"4px", background:C.peach }} />
          </div>
          {/* tag flutuante */}
          <div style={{ position:"absolute", top:"-14px", right:"-14px", background:C.peach, padding:"10px 16px", borderRadius:"2px", boxShadow:"0 4px 12px rgba(0,0,0,.12)" }}>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"11px", color:C.black, letterSpacing:".07em" }}>@engenheiromazza</div>
          </div>
        </div>

        {/* Texto */}
        <div>
          <div className="section-label">Sobre</div>
          <h2 style={{ fontSize:"clamp(24px,2.6vw,38px)", lineHeight:1.1, letterSpacing:"-1px", marginBottom:"20px" }}>
            Engenheiro. Professor.<br /><span style={{ color:C.peach }}>Especialista em IA aplicada.</span>
          </h2>

          <p style={{ fontSize:"15px", lineHeight:1.85, color:"#555", marginBottom:"20px" }}>
            Engenheiro pela USP, com MBA em Finanças e pós-graduação em Data Science.
            Professor de Inteligência Artificial nos programas de MBA da <strong>Exame/Saint Paul</strong> e <strong>XP Educação</strong>.
          </p>

          <p style={{ fontSize:"15px", lineHeight:1.85, color:"#555", marginBottom:"28px" }}>
            Atuo com palestras, consultorias, treinamentos e mentorias voltados a <strong>executivos e empresários</strong> que precisam compreender e aplicar IA com clareza, segurança e resultado real — sem depender de equipes técnicas.
          </p>

          <p style={{ fontSize:"15px", lineHeight:1.7, color:C.graphite, marginBottom:"32px", fontStyle:"italic", borderLeft:`3px solid ${C.peach}`, paddingLeft:"16px", fontWeight:500 }}>
            "Traduzo Inteligência Artificial para quem precisa usar, liderar e decidir."
          </p>

          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"36px" }}>
            {["Palestras","Treinamentos","Mentorias","Consultorias","MBA Exame/Saint Paul","XP Educação"].map((tag) => (
              <span key={tag} style={{ fontSize:"11px", fontWeight:600, padding:"5px 12px", border:`1px solid rgba(0,0,0,.12)`, borderRadius:"2px", color:C.graphite, letterSpacing:".05em" }}>{tag}</span>
            ))}
          </div>

          <a href="#servicos" className="btn-primary">Conheça minha atuação →</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){#sobre .reveal{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}

/* ── SERVIÇOS ── */
const servicos = [
  {
    num:"01",
    title:"Palestras Executivas",
    desc:"Palestras sob medida para eventos corporativos, lideranças e equipes que precisam compreender o impacto da IA no trabalho, na gestão e nos negócios. Linguagem clara, visão estratégica e exemplos aplicáveis.",
    tags:["Keynote","Executivos","Eventos"],
  },
  {
    num:"02",
    title:"Treinamentos para Equipes",
    desc:"Capacitação prática em IA generativa para equipes de RH, Jurídico, Financeiro, Operações, Marketing e áreas administrativas. Conteúdos adaptados ao nível técnico do público, com foco em uso real, segurança e produtividade.",
    tags:["In-company","EAD","Customizado"],
  },
  {
    num:"03",
    title:"Mentoria em IA para Líderes",
    desc:"Acompanhamento individual para executivos e empresários que desejam entender, aplicar e orientar o uso da IA em suas rotinas, decisões e equipes. Formato VIP, com atenção exclusiva ao contexto de cada liderança.",
    tags:["1:1","Estratégia","Liderança"],
  },
  {
    num:"04",
    title:"Consultoria em IA Aplicada",
    desc:"Diagnóstico, estratégia e orientação para adoção de Inteligência Artificial em escritórios, áreas administrativas e equipes corporativas. Foco em processos reais, produtividade e aplicação segura no dia a dia.",
    tags:["Diagnóstico","Roadmap","Adoção prática"],
  },
];

function Servicos() {
  const ref = useReveal();
  return (
    <section id="servicos" style={{ background:C.graphite }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"52px", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <div className="section-label">Serviços</div>
            <h2 style={{ fontSize:"clamp(26px,3vw,44px)", letterSpacing:"-1px", color:C.white, lineHeight:1.1 }}>
              Inteligência Artificial<br />aplicada ao cotidiano<br />das empresas.
            </h2>
          </div>
          <a href="https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA" target="_blank" rel="noopener noreferrer" className="btn-primary">Solicite uma proposta →</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px" }}>
          {servicos.map((s, i) => (
            <div key={s.num} style={{ background: i%2===0?"#222":"#1e1e1e", padding:"36px 28px", borderRadius:"2px", transition:"background .2s", cursor:"default" }}
              onMouseEnter={(e)=>e.currentTarget.style.background="#2a2a2a"}
              onMouseLeave={(e)=>e.currentTarget.style.background=i%2===0?"#222":"#1e1e1e"}
            >
              <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"44px", color:"rgba(255,189,89,.12)", lineHeight:1, marginBottom:"20px" }}>{s.num}</div>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"18px", fontWeight:800, color:C.white, marginBottom:"12px" }}>{s.title}</h3>
              <p style={{ fontSize:"13px", lineHeight:1.75, color:C.grayMid, marginBottom:"20px" }}>{s.desc}</p>
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                {s.tags.map((t)=>(
                  <span key={t} style={{ fontSize:"10px", fontWeight:600, letterSpacing:".08em", padding:"4px 10px", border:"1px solid rgba(255,189,89,.3)", color:C.peach, borderRadius:"2px" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CURSOS ── */
const cursos = [
  {
    title:"Claude para Negócios",
    level:"Intermediário",
    format:"Presencial · Joinville",
    desc:"Treinamento prático e intensivo sobre o Claude aplicado ao contexto empresarial — Claude Chat, Cowork, Office, Chrome, Celular e Code. Para executivos e empresários que querem dominar a ferramenta mais avançada do mercado.",
    badge:"Esgotado",
    badgeBg:"#888",
    data:"11 de julho",
    link:"#contato",
    externo: false,
    esgotado: true,
  },
  {
    title:"Claude para Negócios",
    level:"Intermediário",
    format:"Presencial · Joinville",
    desc:"Treinamento prático e intensivo sobre o Claude aplicado ao contexto empresarial — Claude Chat, Cowork, Office, Chrome, Celular e Code. Para executivos e empresários que querem dominar a ferramenta mais avançada do mercado.",
    badge:"2ª Turma",
    badgeBg:"#FFBD59",
    data:"18 de julho",
    link:"#contato",
    externo: false,
    esgotado: false,
  },
  {
    title:"Claude para RH",
    level:"Intermediário",
    format:"Online · Síncrono",
    desc:"4 encontros ao vivo (13, 15, 20 e 22/jul) com 8h de conteúdo prático: do básico do Claude até Skills, Projetos, Cowork e agentes aplicados a recrutamento, avaliação de desempenho e People Analytics.",
    badge:"Novo",
    badgeBg:"#FFBD59",
    data:"13 a 22 de julho",
    link:"https://www.sympla.com.br/evento-online/claude-para-rh/3462696",
    externo: true,
    esgotado: false,
  },
];

function Cursos() {
  const ref = useReveal();
  return (
    <section id="cursos" style={{ background:C.grayLight }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div className="section-label">Cursos</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", flexWrap:"wrap", gap:"14px" }}>
          <h2 style={{ fontSize:"clamp(26px,3vw,42px)", letterSpacing:"-1px", lineHeight:1.1, maxWidth:"600px" }}>
            Formar pessoas para usar<br />IA com critério é uma das<br /><span style={{ color:C.peach }}>competências centrais</span><br />das empresas modernas.
          </h2>
          <a href="https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA" target="_blank" rel="noopener noreferrer" className="btn-outline">Mais informações →</a>
          <a href="/cursos" className="btn-primary">Ver todos os cursos →</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px" }}>
          {cursos.map((c) => (
            <div key={c.title} style={{ background:C.white, borderRadius:"4px", padding:"36px 28px", border:"1px solid rgba(0,0,0,.06)", position:"relative", transition:"transform .2s,box-shadow .2s", cursor:"default", display:"flex", flexDirection:"column" }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.1)"}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
            >
              {c.badge && <div style={{ position:"absolute", top:"20px", right:"20px", background:c.badgeBg||C.peach, color:c.esgotado?"#fff":"#000", padding:"3px 10px", fontSize:"10px", fontWeight:700, borderRadius:"2px" }}>{c.badge}</div>}
              {c.data && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background: c.esgotado ? "#eee" : C.graphite, color: c.esgotado ? "#999" : C.peach, fontSize:"11px", fontWeight:700, padding:"5px 12px", borderRadius:"2px", marginBottom:"12px", textDecoration: c.esgotado ? "line-through" : "none" }}>
                  📅 {c.data}{c.esgotado ? " — Esgotado" : ""}
                </div>
              )}
              <div style={{ display:"flex", gap:"6px", marginBottom:"16px" }}>
                <span style={{ fontSize:"10px", fontWeight:600, color:C.grayMid, border:"1px solid #e0e0e0", padding:"3px 9px", borderRadius:"2px" }}>{c.level}</span>
                <span style={{ fontSize:"10px", fontWeight:600, color:C.grayMid, border:"1px solid #e0e0e0", padding:"3px 9px", borderRadius:"2px" }}>{c.format}</span>
              </div>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"17px", fontWeight:800, marginBottom:"10px", lineHeight:1.25 }}>{c.title}</h3>
              <p style={{ fontSize:"13px", lineHeight:1.75, color:"#666", marginBottom:"24px", flexGrow:1 }}>{c.desc}</p>
              <a href={c.link} target={c.externo ? "_blank" : "_self"} rel={c.externo ? "noopener noreferrer" : ""} style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"13px", color:C.graphite, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px", marginTop:"auto" }}>
                {c.externo ? "Acessar curso →" : "Saiba mais →"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MENTORIA ── */
function Mentoria() {
  const ref = useReveal();
  return (
    <section id="mentoria" style={{ background:C.white }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div className="section-label">Mentoria Individual</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:"clamp(26px,3vw,42px)", letterSpacing:"-1px", lineHeight:1.1, marginBottom:"20px" }}>
              Compreensão estratégica<br />da IA — para você<br /><span style={{ color:C.peach }}>e sua organização.</span>
            </h2>
            <p style={{ fontSize:"15px", lineHeight:1.85, color:"#555", marginBottom:"16px" }}>
              A mentoria individual é voltada a empresários e executivos que querem entender,
              com profundidade, onde a inteligência artificial se aplica à sua trajetória profissional
              e ao funcionamento do seu negócio.
            </p>
            <p style={{ fontSize:"15px", lineHeight:1.85, color:"#555", marginBottom:"16px" }}>
              O programa clássico contempla 4 encontros de 1 hora, adaptáveis às necessidades
              e ao ritmo de cada executivo.
            </p>
            <p style={{ fontSize:"14px", lineHeight:1.7, color:C.grayMid, marginBottom:"32px", fontStyle:"italic" }}>
              Atendimento presencial em Joinville e região · Online para todo o Brasil.
            </p>
            <a href="#contato" className="btn-primary">Solicitar mentoria →</a>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            {[
              { num:"01", title:"Diagnóstico individual", desc:"Avaliação do nível atual de compreensão e uso de IA — e o que faz sentido para o seu perfil e contexto." },
              { num:"02", title:"IA aplicada ao negócio", desc:"Mapeamento das oportunidades reais de aplicação nos processos, decisões e estratégia da sua empresa." },
              { num:"03", title:"Plano de ação", desc:"Roteiro prático e personalizado — você sai com próximos passos claros, não com conceitos abstratos." },
              { num:"04", title:"Formato adaptável", desc:"4 encontros de 1h é o ponto de partida. O programa se ajusta à sua agenda e objetivos específicos." },
            ].map((item) => (
              <div key={item.num} style={{ background:C.grayLight, borderRadius:"4px", padding:"18px 22px", display:"flex", gap:"18px", alignItems:"flex-start", borderLeft:`3px solid transparent`, transition:"border-color .2s,box-shadow .2s" }}
                onMouseEnter={(e)=>{e.currentTarget.style.borderLeftColor=C.peach;e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.06)"}}
                onMouseLeave={(e)=>{e.currentTarget.style.borderLeftColor="transparent";e.currentTarget.style.boxShadow="none"}}
              >
                <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"12px", color:C.peach, flexShrink:0, marginTop:"2px" }}>{item.num}</div>
                <div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"14px", marginBottom:"4px" }}>{item.title}</div>
                  <div style={{ fontSize:"13px", lineHeight:1.65, color:"#666" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){#mentoria .reveal>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── LIVRO ── */
function Livro() {
  const ref = useReveal();
  return (
    <section id="livro" style={{ background:C.graphite }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"center" }}>

        {/* Capa real do livro */}
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ position:"relative", width:"260px" }}>
            <img
              src="https://raw.githubusercontent.com/engenheiromazza/site-engenheiro-mazza/main/livro.png"
              alt="Prompting Sem Segredos — William Mazza"
              style={{ width:"100%", borderRadius:"4px", display:"block", boxShadow:"16px 16px 48px rgba(0,0,0,.6)" }}
              onError={(e)=>e.target.style.display="none"}
            />
            <div style={{ position:"absolute", bottom:"-12px", right:"-12px", background:C.peach, padding:"8px 16px", borderRadius:"2px" }}>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"11px", color:C.black }}>NOV 2025</div>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div>
          <div className="section-label">Livro</div>
          <h2 style={{ fontSize:"clamp(24px,2.8vw,40px)", letterSpacing:"-1px", color:C.white, lineHeight:1.1, marginBottom:"20px" }}>
            Prompting<br /><span style={{ color:C.peach }}>Sem Segredos</span>
          </h2>

          <p style={{ fontSize:"15px", lineHeight:1.85, color:C.grayMid, marginBottom:"16px" }}>
            Se você não é profissional de tecnologia mas quer dominar a inteligência artificial,
            este livro foi escrito para você. 15 técnicas de prompting com exemplos práticos
            de <strong style={{ color:"rgba(255,255,255,.7)" }}>12 áreas corporativas</strong> — do Financeiro ao Jurídico, do RH ao Marketing.
          </p>
          <p style={{ fontSize:"15px", lineHeight:1.85, color:C.grayMid, marginBottom:"28px" }}>
            Você não vai decorar prompts prontos. Vai aprender a construir os seus —
            e aplicar imediatamente na sua rotina de trabalho, com qualquer ferramenta:
            ChatGPT, Claude, Gemini ou Copilot.
          </p>

          <p style={{ fontSize:"15px", lineHeight:1.7, color:C.white, marginBottom:"32px", fontStyle:"italic", borderLeft:`3px solid ${C.peach}`, paddingLeft:"16px", fontWeight:500 }}>
            "Se você usa IA mas não sabe como pedir o que realmente precisa, este livro resolve isso — agora."
          </p>

          {/* Diferenciais */}
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"36px" }}>
            {[
              "15 técnicas — do básico ao avançado",
              "Exemplos prontos para copiar e adaptar",
              "Aplicável a qualquer IA do mercado",
              "Foco em áreas administrativas e de escritório",
            ].map((item) => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"18px", height:"2px", background:C.peach, flexShrink:0 }} />
                <span style={{ fontSize:"13px", color:C.grayMid }}>{item}</span>
              </div>
            ))}
          </div>

          <a
            href="https://loja.gpcon.com.br/livro-prompting-sem-segredos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Adquirir o livro →
          </a>
        </div>
      </div>
      <style>{`@media(max-width:900px){#livro .reveal{grid-template-columns:1fr!important}#livro .reveal>div:first-child{display:none}}`}</style>
    </section>
  );
}

/* ── DEPOIMENTOS ── */
const depoimentos = [
  {
    quote:"Quando o assunto é Inteligência Artificial, William Mazza é uma referência. Profundo conhecedor do tema, alia sólido conhecimento técnico, visão estratégica e uma rara capacidade de transformar conceitos complexos em aplicações práticas e acessíveis.",
    name:"Pedro Luiz Pereira",
    role:"Diretor de Cultura Organizacional",
    company:"Metal Group",
    link: null,
  },
  {
    quote:"Tive a oportunidade de contratar William Mazza e também participar de seus treinamentos. Sua didática clara e prática torna a Inteligência Artificial acessível e aplicável desde o primeiro contato. Com profundo conhecimento e forte visão de negócios, William é uma das principais referências em IA para executivos e organizações que buscam resultados concretos.",
    name:"Leandro José Soares",
    role:"Fundador",
    company:"Líder com Alma",
    link: null,
  },
  {
    quote:"Conhecer o trabalho de William Mazza foi uma experiência transformadora. Sua capacidade de traduzir a Inteligência Artificial em aplicações práticas e geradoras de resultados, aliada ao profundo conhecimento técnico e à visão estratégica, faz dele uma referência para profissionais e empresas que desejam utilizar a IA de forma eficiente, ética e com impacto real.",
    name:"Mário Lúcio Floriani",
    role:"Sócio Fundador",
    company:"Floriani Síndicos Profissionais Ltda.",
    link: null,
  },
  {
    quote:"Tive a oportunidade de fazer 2 formações com o Mazza em IA e automações para RH. Além da preparação técnica e estar sempre antenado, ele aborda os temas de forma prática, didática e com todas as provocações necessárias para um uso responsável da tecnologia. Recomendo demais!",
    name:"Miguel Nisembaum",
    role:"Fundador",
    company:"Mapa de Talentos",
    link: null,
  },
  {
    quote:"Como profissional da área, valorizo quem tem conteúdo de verdade e fala com honestidade. O Mazza traduz conceitos complexos de um jeito acessível pra quem está começando, mas com a solidez técnica que segura uma conversa com quem é do ramo. Não promete milagre, não engana — diz o que é e o que não é. Tem o meu respaldo.",
    name:"Luis Ricardo Sabino",
    role:"Head de Dados & IA",
    company:"nstech",
    link: null,
  },
  {
    quote:"Realizar o curso de Inteligência Artificial com William Mazza foi uma experiência extremamente enriquecedora para minha formação profissional. O conteúdo é apresentado de forma clara, prática e acessível, permitindo a aplicação concreta no dia a dia. Recomendo fortemente para todos que desejam se atualizar e se destacar em um mercado cada vez mais conectado e inovador.",
    name:"Ticiane Machado Belmonte do Prado",
    role:"Gerente Administrativo",
    company:"Irineu Imóveis Ltda.",
    link: null,
  },
  {
    quote:"O que mais admiro no Mazza é a forma como ele tira a inteligência artificial do campo da promessa e leva para a aplicação real. Ele tem uma escuta prática e assertiva: entende primeiro a dor, o contexto e a realidade de cada área/empresa para, só então, apontar como a tecnologia pode gerar valor. Essa visão vem de quem já viveu a operação por dentro e sabe que ferramenta nenhuma resolve problema mal compreendido. Mazza comunica com clareza, objetividade e profundidade na medida certa. É direto, didático e conectado aos desafios reais das empresas.",
    name:"Maria Regina Runze",
    role:"CEO",
    company:"WeShine Consulting",
    link: "https://weshine.com.br/",
  },
  {
    quote:"William Mazza atuou conosco como professor em temáticas relacionadas à Inteligência Artificial, conduzindo diversas aulas com excelente domínio técnico, clareza didática e grande capacidade de conectar teoria e prática. Ao longo de sua participação, demonstrou profundo conhecimento sobre o tema, postura colaborativa e constante disponibilidade para contribuir com a XP Educação, agregando valor à formação dos nossos alunos e às iniciativas acadêmicas da instituição.",
    name:"Luis Fernando Conduta",
    role:"Coordenador Acadêmico Geral",
    company:"XP Educação",
    link: null,
  },
  {
    quote:"O 'mais RH' dos 'não RH'. É assim que eu costumo me referir ao Mazza. Nos conhecemos através do LinkedIn — foram suas postagens que despertaram minha curiosidade para decifrar o algoritmo da plataforma, e também foi inspirado por suas contribuições sobre liderança e carreira que me animei a compartilhar minhas ideias na rede. Hoje, ambos somos Top Voice. Foi a admiração mútua que nos tornou parceiros em várias iniciativas de educação para a comunidade de RH. É um prazer ver a dedicação, disciplina e sabedoria que o Mazza coloca em tudo que faz. Nossos alunos aprendem de forma divertida, didática e muito prática — vimos produtos, serviços e parcerias de negócios nascerem nas nossas salas de aula.",
    name:"Marcelo Nóbrega",
    role:"IA, Inovação e Tecnologia em RH",
    company:"Investidor, Conselheiro de HRTechs e Palestrante Internacional",
    link: null,
  },
];

function Depoimentos() {
  const ref = useReveal();
  const [atual, setAtual] = useState(0);
  const [saindo, setSaindo] = useState(false);

  const ir = (idx) => {
    if (idx === atual) return;
    setSaindo(true);
    setTimeout(() => {
      setAtual(idx);
      setSaindo(false);
    }, 300);
  };

  const anterior = () => ir((atual - 1 + depoimentos.length) % depoimentos.length);
  const proximo  = () => ir((atual + 1) % depoimentos.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setSaindo(true);
      setTimeout(() => {
        setAtual((a) => (a + 1) % depoimentos.length);
        setSaindo(false);
      }, 300);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const d = depoimentos[atual];

  return (
    <section id="depoimentos" style={{ background:C.grayLight }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"860px", margin:"0 auto" }}>
        <div className="section-label">Depoimentos</div>
        <h2 style={{ fontSize:"clamp(26px,3vw,44px)", letterSpacing:"-1px", lineHeight:1.1, marginBottom:"48px" }}>
          O impacto na prática<br /><span style={{ color:C.peach }}>de quem já aplicou.</span>
        </h2>

        {/* Card carrossel */}
        <div style={{
          background: C.white,
          borderRadius: "4px",
          padding: "48px 56px",
          borderLeft: `4px solid ${C.peach}`,
          minHeight: "280px",
          position: "relative",
          opacity: saindo ? 0 : 1,
          transform: saindo ? "translateY(8px)" : "translateY(0)",
          transition: "opacity .3s ease, transform .3s ease",
        }}>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"52px", fontWeight:900, color:C.peach, lineHeight:.8, marginBottom:"20px", opacity:.4 }}>"</div>
          <p style={{ fontSize:"16px", lineHeight:1.85, color:"#444", fontStyle:"italic", marginBottom:"32px", maxWidth:"680px" }}>
            {d.quote}
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:C.graphite, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ color:C.peach, fontWeight:800, fontSize:"15px" }}>{d.name.charAt(0)}</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"15px", color:C.graphite }}>
                {d.link ? (
                  <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ color:C.graphite, textDecoration:"underline", textDecorationColor:C.peach, textUnderlineOffset:"3px" }}>{d.name}</a>
                ) : d.name}
              </div>
              <div style={{ fontSize:"12px", color:C.grayMid, marginTop:"2px" }}>{d.role} · {d.company}</div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"28px" }}>
          {/* Dots */}
          <div style={{ display:"flex", gap:"8px" }}>
            {depoimentos.map((_, i) => (
              <button key={i} onClick={() => ir(i)} style={{
                width: i === atual ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === atual ? C.peach : "#ccc",
                border: "none",
                cursor: "pointer",
                transition: "all .3s ease",
                padding: 0,
              }} />
            ))}
          </div>

          {/* Setas */}
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={anterior} style={{
              width:"40px", height:"40px", borderRadius:"2px",
              background:"transparent", border:`1.5px solid ${C.graphite}`,
              cursor:"pointer", fontSize:"16px", display:"flex",
              alignItems:"center", justifyContent:"center",
              transition:"all .2s",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background=C.graphite;e.currentTarget.style.color=C.white}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.graphite}}
            >←</button>
            <button onClick={proximo} style={{
              width:"40px", height:"40px", borderRadius:"2px",
              background:C.graphite, border:`1.5px solid ${C.graphite}`,
              cursor:"pointer", fontSize:"16px", color:C.white,
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .2s",
            }}
              onMouseEnter={(e)=>e.currentTarget.style.background="#333"}
              onMouseLeave={(e)=>e.currentTarget.style.background=C.graphite}
            >→</button>
          </div>
        </div>

        {/* Contador */}
        <div style={{ marginTop:"16px", fontSize:"12px", color:C.grayMid, textAlign:"right" }}>
          {atual + 1} / {depoimentos.length}
        </div>
      </div>
    </section>
  );
}

/* ── CLIENTES ── */
const TOTAL_LOGOS = 38;

function Clientes() {
  const ref = useReveal();
  const [atual, setAtual] = useState(0);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisivel(false);
      setTimeout(() => {
        setAtual((a) => (a + 1) % TOTAL_LOGOS);
        setVisivel(true);
      }, 200);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="clientes" style={{ background:C.white }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div className="section-label">Clientes</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", flexWrap:"wrap", gap:"16px" }}>
          <h2 style={{ fontSize:"clamp(24px,2.8vw,40px)", letterSpacing:"-1px", lineHeight:1.1 }}>
            Empresas e organizações<br />que já <span style={{ color:C.peach }}>aplicaram IA</span><br />com William Mazza.
          </h2>
          <div style={{ fontSize:"13px", color:C.grayMid, maxWidth:"280px", lineHeight:1.6, textAlign:"right" }}>
            Palestrante, professor e consultor em organizações de diferentes setores e portes.
          </div>
        </div>

        {/* Carrossel de logos */}
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          gap:"24px",
        }}>
          <div style={{
            width:"100%",
            maxWidth:"320px",
            aspectRatio:"1/1",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            border:"1px solid rgba(0,0,0,.08)",
            borderRadius:"4px",
            background:C.grayLight,
            overflow:"hidden",
          }}>
            <img
              src={`/clientes/${atual + 1}.png`}
              alt={`Cliente ${atual + 1}`}
              style={{
                width:"100%",
                height:"100%",
                objectFit:"contain",
                opacity: visivel ? 1 : 0,
                transition:"opacity .2s ease",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          {/* Dots de progresso */}
          <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", justifyContent:"center", maxWidth:"100%" }}>
            {Array.from({ length: TOTAL_LOGOS }).map((_, i) => (
              <div key={i} style={{
                width: i === atual ? "16px" : "5px",
                height:"5px",
                borderRadius:"3px",
                background: i === atual ? C.peach : "#ddd",
                transition:"all .25s ease",
              }} />
            ))}
          </div>

          <div style={{ fontSize:"12px", color:C.grayMid }}>
            {atual + 1} / {TOTAL_LOGOS}
          </div>
        </div>

        {/* Separador visual */}
        <div style={{ marginTop:"48px", paddingTop:"32px", borderTop:"1px solid rgba(0,0,0,.08)", display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ width:"28px", height:"2px", background:C.peach }} />
          <span style={{ fontSize:"13px", color:C.grayMid, fontStyle:"italic" }}>
            Setores: Indústria · Advocacia · Educação · Imóveis · Saúde · Varejo · Tecnologia · Construção · Associações
          </span>
        </div>
      </div>
    </section>
  );
}


function Contato() {
  const ref = useReveal();
  const [form, setForm] = useState({ nome:"", email:"", empresa:"", mensagem:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!form.nome || !form.email) return;
    window.open('https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA', '_blank');
    setSent(true);
  };
  const fieldStyle = { width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:"2px", padding:"13px 15px", color:C.white, fontSize:"14px", fontFamily:"'Inter',sans-serif", outline:"none", transition:"border-color .2s" };
  const labelStyle = { display:"block", fontSize:"11px", fontWeight:600, color:C.grayMid, marginBottom:"7px", letterSpacing:".06em", textTransform:"uppercase" };
  return (
    <section id="contato" style={{ background:C.graphite, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", bottom:"-120px", right:"-120px", width:"440px", height:"440px", background:C.peach, borderRadius:"50%", opacity:.05, pointerEvents:"none" }} />
      <div ref={ref} className="reveal" style={{ maxWidth:"860px", margin:"0 auto", position:"relative" }}>
        <div className="section-label">Contato</div>
        <h2 style={{ fontSize:"clamp(28px,4vw,52px)", letterSpacing:"-1.5px", color:C.white, lineHeight:1.05, marginBottom:"14px" }}>
          Vamos conversar<br />sobre <span style={{ color:C.peach }}>IA aplicada</span><br />ao seu contexto.
        </h2>
        <p style={{ color:C.grayMid, fontSize:"15px", lineHeight:1.75, marginBottom:"44px", maxWidth:"480px" }}>
          Palestras, consultorias, treinamentos e mentorias.
          Preencha o formulário e retornarei em até 24 horas.
        </p>
        {sent ? (
          <div style={{ background:"rgba(255,189,89,.1)", border:`1px solid ${C.peach}`, borderRadius:"4px", padding:"40px", textAlign:"center" }}>
            <div style={{ fontSize:"28px", marginBottom:"12px", color:C.peach }}>✓</div>
            <h3 style={{ color:C.white, fontFamily:"'Manrope',sans-serif", marginBottom:"8px" }}>Mensagem recebida.</h3>
            <p style={{ color:C.grayMid }}>Em breve entrarei em contato, {form.nome.split(" ")[0]}.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div>
              <label style={labelStyle}>Nome completo</label>
              <input type="text" placeholder="Seu nome" style={fieldStyle} value={form.nome}
                onChange={(e)=>setForm({...form,nome:e.target.value})}
                onFocus={(e)=>e.target.style.borderColor=C.peach}
                onBlur={(e)=>e.target.style.borderColor="rgba(255,255,255,.12)"} />
            </div>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input type="email" placeholder="seu@email.com" style={fieldStyle} value={form.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}
                onFocus={(e)=>e.target.style.borderColor=C.peach}
                onBlur={(e)=>e.target.style.borderColor="rgba(255,255,255,.12)"} />
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={labelStyle}>Empresa / Organização</label>
              <input type="text" placeholder="Nome da empresa" style={fieldStyle} value={form.empresa}
                onChange={(e)=>setForm({...form,empresa:e.target.value})}
                onFocus={(e)=>e.target.style.borderColor=C.peach}
                onBlur={(e)=>e.target.style.borderColor="rgba(255,255,255,.12)"} />
            </div>
            <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px" }}>
              <div style={{ fontSize:"12px", color:C.grayMid }}>
                Ou: <a href="mailto:william@wmazza.com" style={{ color:C.peach, textDecoration:"none" }}>william@wmazza.com</a>
              </div>
              <a
                href="https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enviar mensagem →
              </a>
            </div>
          </div>
        )}
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:rgba(166,166,166,.4)}@media(max-width:600px){#contato .reveal>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background:C.black, padding:"36px 64px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
      <div>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"15px", color:C.white }}>
          @engenheiro<span style={{ color:C.peach }}>mazza</span>
        </div>
        <div style={{ fontSize:"11px", color:C.grayMid, marginTop:"3px", letterSpacing:".07em" }}>
          Tecnologia com sentido. Conhecimento com impacto.
        </div>
      </div>
      <div style={{ display:"flex", gap:"20px" }}>
        {[
          { label:"LinkedIn", url:"https://www.linkedin.com/in/engenheiromazza/" },
          { label:"Instagram", url:"https://www.instagram.com/engenheiromazza" },
          { label:"YouTube", url:"https://www.youtube.com/@engenheiromazza" },
        ].map((s)=>(
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:"12px", color:C.grayMid, textDecoration:"none", fontWeight:500, transition:"color .2s" }}
            onMouseOver={(e)=>e.target.style.color=C.peach}
            onMouseOut={(e)=>e.target.style.color=C.grayMid}>{s.label}</a>
        ))}
      </div>
      <div style={{ fontSize:"11px", color:C.grayMid }}>© 2026 William Mazza · @engenheiromazza</div>
      <div style={{ fontSize:"11px", color:"rgba(166,166,166,.45)", letterSpacing:".04em" }}>
        Site elaborado com <span style={{ color:C.peach }}>Claude</span>
      </div>
      <style>{`@media(max-width:600px){footer{padding:28px 24px;flex-direction:column;text-align:center}}`}</style>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <StyleInjector />
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Cursos />
        <Mentoria />
        <Livro />
        <Depoimentos />
        <Clientes />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
