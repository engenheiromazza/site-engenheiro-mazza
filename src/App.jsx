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
          <a href="https://forms.gle/JsvTMFe3p7a79VaK6" target="_blank" rel="noopener noreferrer" className="btn-primary">Solicite uma proposta →</a>
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
  { title:"IA Aplicada ao RH", level:"Intermediário", format:"Online · Ao vivo", desc:"Como profissionais de RH podem estruturar o uso de IA generativa em recrutamento, onboarding, avaliação de desempenho e People Analytics — com critério e responsabilidade.", badge:"Novo" },
  { title:"Prompting Sem Segredos", level:"Iniciante", format:"Online · Gravado", desc:"Comunicação eficaz com ferramentas de IA generativa para profissionais de escritório. Sem programação, sem tecnicismo — com método e aplicação imediata no dia a dia.", badge:null },
  { title:"IA Generativa para Gestores", level:"Intermediário", format:"In-company", desc:"Formação executiva em IA: como líderes compreendem, avaliam e incorporam inteligência artificial à gestão, à tomada de decisão e ao desenvolvimento das equipes.", badge:"Destaque" },
];

function Cursos() {
  const ref = useReveal();
  return (
    <section id="cursos" style={{ background:C.grayLight }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div className="section-label">Cursos & Formações</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", flexWrap:"wrap", gap:"14px" }}>
          <h2 style={{ fontSize:"clamp(26px,3vw,42px)", letterSpacing:"-1px", lineHeight:1.1 }}>
            Formar pessoas para usar<br />IA com critério é uma das<br /><span style={{ color:C.peach }}>competências centrais</span><br />das empresas modernas.
          </h2>
          <a href="#contato" className="btn-outline">Mais informações →</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px" }}>
          {cursos.map((c) => (
            <div key={c.title} style={{ background:C.white, borderRadius:"4px", padding:"36px 28px", border:"1px solid rgba(0,0,0,.06)", position:"relative", transition:"transform .2s,box-shadow .2s", cursor:"default" }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.1)"}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
            >
              {c.badge && <div style={{ position:"absolute", top:"20px", right:"20px", background:C.peach, padding:"3px 10px", fontSize:"10px", fontWeight:700, borderRadius:"2px" }}>{c.badge}</div>}
              <div style={{ display:"flex", gap:"6px", marginBottom:"16px" }}>
                <span style={{ fontSize:"10px", fontWeight:600, color:C.grayMid, border:"1px solid #e0e0e0", padding:"3px 9px", borderRadius:"2px" }}>{c.level}</span>
                <span style={{ fontSize:"10px", fontWeight:600, color:C.grayMid, border:"1px solid #e0e0e0", padding:"3px 9px", borderRadius:"2px" }}>{c.format}</span>
              </div>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"18px", fontWeight:800, marginBottom:"10px", lineHeight:1.25 }}>{c.title}</h3>
              <p style={{ fontSize:"13px", lineHeight:1.75, color:"#666", marginBottom:"24px" }}>{c.desc}</p>
              <a href="#contato" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"13px", color:C.graphite, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
                Saiba mais →
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
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ width:"260px", aspectRatio:"2/3", background:"linear-gradient(145deg,#222,#111)", borderRadius:"4px", padding:"36px 28px", position:"relative", overflow:"hidden", boxShadow:"16px 16px 48px rgba(0,0,0,.5),-4px -4px 16px rgba(255,189,89,.06)" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"5px", background:C.peach }} />
            <div style={{ position:"absolute", bottom:"-40px", right:"-40px", width:"180px", height:"180px", background:C.peach, borderRadius:"50%", opacity:.06 }} />
            <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"10px", letterSpacing:".18em", textTransform:"uppercase", color:C.peach, marginBottom:"28px" }}>Engenheiro Mazza</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:900, fontSize:"22px", color:C.white, lineHeight:1.2, marginBottom:"14px" }}>
              Prompting<br /><span style={{ color:C.peach }}>Sem</span><br />Segredos
            </div>
            <div style={{ width:"28px", height:"2px", background:C.peach, marginBottom:"14px" }} />
            <div style={{ fontSize:"11px", color:C.grayMid, lineHeight:1.6 }}>Como se comunicar corretamente com as IAs</div>
            <div style={{ position:"absolute", bottom:"24px", right:"24px", fontSize:"10px", color:"rgba(255,189,89,.45)", fontWeight:700, letterSpacing:".1em" }}>NOV 2025</div>
          </div>
        </div>

        <div>
          <div className="section-label">Livro</div>
          <h2 style={{ fontSize:"clamp(26px,3vw,44px)", letterSpacing:"-1px", color:C.white, lineHeight:1.1, marginBottom:"20px" }}>
            Prompting<br /><span style={{ color:C.peach }}>Sem Segredos</span>
          </h2>
          <p style={{ fontSize:"15px", lineHeight:1.85, color:C.grayMid, marginBottom:"16px" }}>
            Publicado em novembro de 2025, o livro foi escrito para profissionais que precisam
            se comunicar com eficácia com as ferramentas de inteligência artificial — sem precisar
            saber programar ou ter formação técnica.
          </p>
          <p style={{ fontSize:"15px", lineHeight:1.85, color:C.grayMid, marginBottom:"32px" }}>
            Uma leitura objetiva, com método e aplicação direta ao trabalho cotidiano.
            Do iniciante ao profissional que quer extrair mais resultado das IAs generativas.
          </p>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"32px" }}>
            {["Profissionais de escritório","Gestores","Equipes corporativas","Sem requisito técnico"].map((t) => (
              <span key={t} style={{ fontSize:"11px", fontWeight:600, letterSpacing:".06em", padding:"5px 12px", border:"1px solid rgba(255,189,89,.3)", color:C.peach, borderRadius:"2px" }}>{t}</span>
            ))}
          </div>
          <a href="https://loja.gpcon.com.br/livro-prompting-sem-segredos" target="_blank" rel="noopener noreferrer" className="btn-primary">
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
  { quote:"O Engenheiro Mazza tem o dom de tornar a IA compreensível para qualquer gestor. Saímos com um plano real, não apenas com conceitos.", name:"Diretora de RH", company:"Indústria multinacional · SC" },
  { quote:"A palestra foi o ponto de inflexão do nosso time. Linguagem clara, profundidade real e ferramentas que aplicamos no dia seguinte.", name:"CEO", company:"Empresa de tecnologia · SP" },
  { quote:"Nunca imaginei que aprenderia a usar IA no trabalho jurídico tão rapidamente. Conteúdo sólido, didática excepcional.", name:"Advogada Sênior", company:"Escritório de advocacia · RS" },
];

function Depoimentos() {
  const ref = useReveal();
  return (
    <section id="depoimentos" style={{ background:C.grayLight }}>
      <div ref={ref} className="reveal" style={{ maxWidth:"1060px", margin:"0 auto" }}>
        <div className="section-label">Depoimentos</div>
        <h2 style={{ fontSize:"clamp(26px,3vw,44px)", letterSpacing:"-1px", lineHeight:1.1, marginBottom:"48px" }}>
          O impacto na prática<br /><span style={{ color:C.peach }}>de quem já aplicou.</span>
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px" }}>
          {depoimentos.map((d, i) => (
            <div key={i} style={{ background:C.white, borderRadius:"4px", padding:"36px 28px", borderLeft:`4px solid ${C.peach}` }}>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"48px", fontWeight:900, color:C.peach, lineHeight:.8, marginBottom:"14px", opacity:.5 }}>"</div>
              <p style={{ fontSize:"14px", lineHeight:1.8, color:"#444", fontStyle:"italic", marginBottom:"24px" }}>{d.quote}</p>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:C.graphite, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:C.peach, fontWeight:800, fontSize:"13px" }}>{d.name.charAt(0)}</span>
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:"13px" }}>{d.name}</div>
                  <div style={{ fontSize:"11px", color:C.grayMid }}>{d.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTATO ── */
function Contato() {
  const ref = useReveal();
  const [form, setForm] = useState({ nome:"", email:"", empresa:"", mensagem:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!form.nome || !form.email) return;
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
            <div style={{ gridColumn:"1/-1" }}>
              <label style={labelStyle}>Como posso ajudar?</label>
              <textarea rows={4} placeholder="Descreva sua necessidade..." style={{...fieldStyle,resize:"vertical"}} value={form.mensagem}
                onChange={(e)=>setForm({...form,mensagem:e.target.value})}
                onFocus={(e)=>e.target.style.borderColor=C.peach}
                onBlur={(e)=>e.target.style.borderColor="rgba(255,255,255,.12)"} />
            </div>
            <div style={{ gridColumn:"1/-1", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px" }}>
              <div style={{ fontSize:"12px", color:C.grayMid }}>
                Ou: <a href="mailto:contato@engenheiromazza.com.br" style={{ color:C.peach, textDecoration:"none" }}>contato@engenheiromazza.com.br</a>
              </div>
              <button className="btn-primary" onClick={handleSubmit}>Enviar mensagem →</button>
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
        {["LinkedIn","Instagram","YouTube"].map((s)=>(
          <a key={s} href="#" style={{ fontSize:"12px", color:C.grayMid, textDecoration:"none", fontWeight:500, transition:"color .2s" }}
            onMouseOver={(e)=>e.target.style.color=C.peach}
            onMouseOut={(e)=>e.target.style.color=C.grayMid}>{s}</a>
        ))}
      </div>
      <div style={{ fontSize:"11px", color:C.grayMid }}>© 2025 William Mazza · @engenheiromazza</div>
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
        <Contato />
      </main>
      <Footer />
    </>
  );
}
