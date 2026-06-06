import { useState, useEffect, useRef } from "react";

/* ─── BRAND TOKENS (BrandBook) ─── */
const C = {
  peach:   "#FFBD59",
  black:   "#000000",
  graphite:"#1A1A1A",
  grayMid: "#A6A6A6",
  grayLight:"#F5F5F5",
  white:   "#FFFFFF",
};

/* ─── GLOBAL STYLES (injected once) ─── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: #F5F5F5;
    color: #1A1A1A;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
  }

  ::selection { background: #FFBD59; color: #000; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #F5F5F5; }
  ::-webkit-scrollbar-thumb { background: #FFBD59; border-radius: 2px; }

  /* Fade-in animation */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 48px; }
  }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 64px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  nav.scrolled {
    background: rgba(245,245,245,0.96);
    box-shadow: 0 1px 0 rgba(0,0,0,0.08);
    backdrop-filter: blur(8px);
  }
  .nav-logo {
    font-family: 'Manrope', sans-serif;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: -0.5px;
    color: #1A1A1A;
    text-decoration: none;
  }
  .nav-logo span { color: #FFBD59; }
  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1A1A1A;
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 2px;
    background: #FFBD59;
    transition: width 0.25s ease;
  }
  .nav-links a:hover::after { width: 100%; }
  .nav-links a:hover { color: #000; }
  .nav-cta {
    background: #FFBD59;
    color: #000 !important;
    padding: 10px 24px;
    border-radius: 2px;
    font-weight: 700 !important;
    transition: background 0.2s, transform 0.15s !important;
  }
  .nav-cta:hover { background: #e6a93e !important; transform: translateY(-1px); }
  .nav-cta::after { display: none !important; }

  /* Section shared */
  section { padding: 100px 64px; }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FFBD59;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 32px; height: 2px;
    background: #FFBD59;
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #FFBD59;
    color: #000;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.04em;
    padding: 16px 36px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    border-radius: 2px;
  }
  .btn-primary:hover {
    background: #e6a93e;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255,189,89,0.35);
  }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: #1A1A1A;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.04em;
    padding: 15px 35px;
    border: 1.5px solid #1A1A1A;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .btn-outline:hover {
    background: #1A1A1A;
    color: #F5F5F5;
  }

  /* Hamburger mobile */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }
  .hamburger span {
    display: block;
    width: 24px; height: 2px;
    background: #1A1A1A;
    transition: all 0.3s;
  }

  @media (max-width: 900px) {
    nav { padding: 20px 24px; }
    section { padding: 72px 24px; }
    .hamburger { display: flex; }
    .nav-links {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: #F5F5F5;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;
      z-index: 99;
    }
    .nav-links.open { display: flex; }
    .nav-links a { font-size: 20px; }
  }
`;

/* ─── INJECT CSS ─── */
function StyleInjector() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

/* ─── REVEAL HOOK ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Cursos", href: "#cursos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato", cta: true },
  ];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">
        Engenheiro <span>Mazza</span>
      </a>
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

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "64px",
        paddingTop: "120px",
        background: `linear-gradient(135deg, #F5F5F5 60%, #FFF8EC 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG geometric accent */}
      <div style={{
        position: "absolute",
        top: "-80px", right: "-80px",
        width: "480px", height: "480px",
        border: "1px solid rgba(255,189,89,0.18)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "40px", right: "40px",
        width: "320px", height: "320px",
        border: "1px solid rgba(255,189,89,0.12)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Left content */}
      <div style={{ animation: "fadeUp 0.9s ease both", animationDelay: "0.1s" }}>
        <div className="section-label">IA aplicada ao mundo real</div>
        <h1 style={{
          fontSize: "clamp(40px, 5vw, 72px)",
          lineHeight: 1.05,
          letterSpacing: "-2px",
          color: C.graphite,
          marginBottom: "24px",
        }}>
          Tecnologia<br />
          com <span style={{ color: C.peach }}>sentido.</span><br />
          Conhecimento<br />
          com impacto.
        </h1>
        <p style={{
          fontSize: "17px",
          lineHeight: 1.75,
          color: C.grayMid,
          maxWidth: "480px",
          marginBottom: "40px",
        }}>
          Ajudo executivos, líderes e empresas a transformar inteligência artificial
          em clareza, aplicação e resultado real — sem jargão, sem promessas vazias.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#servicos" className="btn-primary">
            Conheça os serviços →
          </a>
          <a href="#sobre" className="btn-outline">
            Sobre o Engenheiro Mazza
          </a>
        </div>

        {/* Social proof strip */}
        <div style={{
          marginTop: "56px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          {[
            { num: "20+", label: "Anos de experiência" },
            { num: "500+", label: "Profissionais formados" },
            { num: "B2B", label: "Clientes corporativos" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 900,
                fontSize: "28px",
                color: C.graphite,
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{ fontSize: "12px", color: C.grayMid, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — decorative card */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        animation: "fadeIn 1.1s ease both",
        animationDelay: "0.4s",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "420px",
          background: C.graphite,
          borderRadius: "4px",
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            bottom: "-40px", right: "-40px",
            width: "200px", height: "200px",
            background: C.peach,
            borderRadius: "50%",
            opacity: 0.12,
          }} />
          <div style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 900,
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: C.peach,
            marginBottom: "32px",
          }}>Engenheiro Mazza</div>
          <div style={{ color: C.white, fontSize: "22px", fontFamily: "'Manrope', sans-serif", fontWeight: 700, lineHeight: 1.4, marginBottom: "32px" }}>
            "A ponte entre a IA<br />e o mundo real<br />dos negócios."
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Sábio", "Mentor", "Explorador"].map((tag) => (
              <div key={tag} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "24px", height: "2px", background: C.peach }} />
                <span style={{ color: C.grayMid, fontSize: "13px", fontWeight: 500 }}>{tag}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: "12px",
            color: C.grayMid,
            letterSpacing: "0.08em",
          }}>@engenheiromazza</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero { grid-template-columns: 1fr !important; }
          #hero > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ─── SOBRE ─── */
function Sobre() {
  const ref = useReveal();
  return (
    <section id="sobre" style={{ background: C.white }}>
      <div ref={ref} className="reveal" style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}>
        {/* Left — accent block */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%",
            aspectRatio: "4/5",
            background: C.grayLight,
            borderRadius: "4px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "40%",
              background: `linear-gradient(to top, ${C.graphite}, transparent)`,
            }} />
            <div style={{
              position: "absolute",
              bottom: "32px", left: "32px",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "42px",
              color: C.white,
              lineHeight: 1,
            }}>
              Eng.<br /><span style={{ color: C.peach }}>Mazza</span>
            </div>
            {/* Geometric pattern */}
            <div style={{
              position: "absolute",
              top: "24px", right: "24px",
              width: "80px", height: "80px",
              border: `2px solid ${C.peach}`,
              borderRadius: "2px",
              opacity: 0.5,
            }} />
          </div>
          {/* Floating tag */}
          <div style={{
            position: "absolute",
            top: "-20px", right: "-20px",
            background: C.peach,
            padding: "16px 24px",
            borderRadius: "2px",
          }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "13px", color: C.black }}>
              USP · MBA · IA
            </div>
          </div>
        </div>

        {/* Right — text */}
        <div>
          <div className="section-label">Sobre mim</div>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "24px" }}>
            Da engenharia ao<br />topo da IA aplicada.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#444", marginBottom: "20px" }}>
            Engenheiro formado pela USP, com MBA em Finanças e pós-graduações em IA, Big Data e Data Science.
            Mais de 20 anos liderando times e operações em empresas brasileiras e multinacionais —
            do chão de fábrica à diretoria de Supply Chain.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#444", marginBottom: "36px" }}>
            Hoje atua como consultor, palestrante e professor de pós-graduação,
            traduzindo inteligência artificial em linguagem de negócio — com foco em resultado,
            sem abstração desnecessária.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "36px" }}>
            {[
              "Engenharia (USP)",
              "MBA em Finanças",
              "Pós em IA & Big Data",
              "Professor de pós-grad.",
              "Diretor de Supply Chain",
              "Consultor B2B",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "20px", height: "2px", background: C.peach, flexShrink: 0 }} />
                <span style={{ fontSize: "13px", fontWeight: 500, color: C.graphite }}>{item}</span>
              </div>
            ))}
          </div>

          <a href="#contato" className="btn-primary">Falar com o Engenheiro Mazza →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #sobre .reveal { grid-template-columns: 1fr !important; }
          #sobre .reveal > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ─── SERVIÇOS ─── */
const servicos = [
  {
    num: "01",
    title: "Consultoria em IA",
    desc: "Diagnóstico, estratégia e implementação de IA aplicada aos processos da sua empresa — com foco em ROI mensurável e adoção real pelas equipes.",
    tags: ["Diagnóstico", "Roadmap", "Implementação"],
  },
  {
    num: "02",
    title: "Palestras Corporativas",
    desc: "Conteúdo sob medida para eventos, kickoffs e treinamentos executivos. Linguagem de negócio, casos reais, sem jargão técnico.",
    tags: ["Keynote", "Workshop", "In-company"],
  },
  {
    num: "03",
    title: "Mentoria Executiva",
    desc: "Acompanhamento individual para líderes que querem incorporar IA à sua visão estratégica e à gestão do time.",
    tags: ["1-a-1", "Estratégia", "Liderança"],
  },
  {
    num: "04",
    title: "Treinamentos B2B",
    desc: "Programas customizados de capacitação em IA generativa para equipes de RH, Jurídico, Financeiro, Operações e Marketing.",
    tags: ["In-company", "EAD", "Certificação"],
  },
];

function Servicos() {
  const ref = useReveal();
  return (
    <section id="servicos" style={{ background: C.graphite }}>
      <div ref={ref} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div className="section-label" style={{ color: C.peach }}>
              <span style={{ background: C.peach, width: "32px", height: "2px", display: "block" }} />
              Serviços & Palestras
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-1px", color: C.white, lineHeight: 1.1 }}>
              Do dado<br />à decisão.
            </h2>
          </div>
          <a href="#contato" className="btn-primary">Solicitar proposta →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
          {servicos.map((s, i) => (
            <div key={s.num} style={{
              background: i % 2 === 0 ? "#222" : "#1e1e1e",
              padding: "40px 32px",
              borderRadius: "2px",
              position: "relative",
              overflow: "hidden",
              transition: "background 0.2s",
              cursor: "default",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#2a2a2a"}
              onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "#222" : "#1e1e1e"}
            >
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 900,
                fontSize: "48px",
                color: "rgba(255,189,89,0.15)",
                lineHeight: 1,
                marginBottom: "24px",
              }}>{s.num}</div>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                color: C.white,
                marginBottom: "16px",
              }}>{s.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.grayMid, marginBottom: "24px" }}>{s.desc}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {s.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    padding: "4px 10px",
                    border: `1px solid rgba(255,189,89,0.3)`,
                    color: C.peach,
                    borderRadius: "2px",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CURSOS ─── */
const cursos = [
  {
    title: "IA Aplicada ao RH",
    level: "Intermediário",
    format: "Online · Ao vivo",
    desc: "Como profissionais de RH podem usar IA generativa em recrutamento, onboarding, avaliação de desempenho e People Analytics.",
    badge: "Novo",
  },
  {
    title: "Prompting Sem Segredos",
    level: "Iniciante",
    format: "Online · Gravado",
    desc: "Técnicas práticas de prompting para profissionais de escritório — sem precisar saber programar. Do zero ao uso corporativo.",
    badge: null,
  },
  {
    title: "IA Generativa para Gestores",
    level: "Intermediário",
    format: "In-company",
    desc: "Programa de capacitação executiva: como líderes podem usar IA para decisões mais rápidas, equipes mais produtivas e vantagem competitiva.",
    badge: "Destaque",
  },
];

function Cursos() {
  const ref = useReveal();
  return (
    <section id="cursos" style={{ background: C.grayLight }}>
      <div ref={ref} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="section-label">Cursos & Formações</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-1px", lineHeight: 1.1 }}>
            Aprenda IA com<br />quem aplica no real.
          </h2>
          <a href="#contato" className="btn-outline">Ver todos os cursos →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {cursos.map((c) => (
            <div key={c.title} style={{
              background: C.white,
              borderRadius: "4px",
              padding: "40px 32px",
              position: "relative",
              border: "1px solid rgba(0,0,0,0.06)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {c.badge && (
                <div style={{
                  position: "absolute", top: "24px", right: "24px",
                  background: C.peach,
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "2px",
                  color: C.black,
                }}>{c.badge}</div>
              )}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: C.grayMid, border: "1px solid #e0e0e0", padding: "3px 10px", borderRadius: "2px" }}>{c.level}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: C.grayMid, border: "1px solid #e0e0e0", padding: "3px 10px", borderRadius: "2px" }}>{c.format}</span>
              </div>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, marginBottom: "12px", lineHeight: 1.2 }}>{c.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#666", marginBottom: "28px" }}>{c.desc}</p>
              <a href="#contato" style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: C.graphite,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                Saiba mais
                <span style={{ fontSize: "16px" }}>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DEPOIMENTOS ─── */
const depoimentos = [
  {
    quote: "O Engenheiro Mazza tem o dom de tornar a IA compreensível para qualquer gestor. Nossa equipe saiu com um plano real, não só com conceitos.",
    name: "Diretora de RH",
    company: "Indústria multinacional · SC",
  },
  {
    quote: "A palestra foi o ponto de virada do nosso time. Saímos sabendo exatamente o que precisávamos fazer — com ferramentas práticas na mão.",
    name: "CEO",
    company: "Empresa de tecnologia · SP",
  },
  {
    quote: "Nunca pensei que aprenderia a usar IA no dia a dia jurídico tão rápido. A didática é excepcional e o conteúdo é totalmente aplicado.",
    name: "Advogada Sênior",
    company: "Escritório de advocacia · RS",
  },
];

function Depoimentos() {
  const ref = useReveal();
  return (
    <section id="depoimentos" style={{ background: C.white }}>
      <div ref={ref} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="section-label">Depoimentos</div>
        <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "56px" }}>
          Quem já aplicou<br /><span style={{ color: C.peach }}>fala por nós.</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {depoimentos.map((d, i) => (
            <div key={i} style={{
              background: C.grayLight,
              borderRadius: "4px",
              padding: "40px 32px",
              position: "relative",
              borderLeft: `4px solid ${C.peach}`,
            }}>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "56px",
                fontWeight: 900,
                color: C.peach,
                lineHeight: 0.8,
                marginBottom: "16px",
                opacity: 0.6,
              }}>"</div>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#444", fontStyle: "italic", marginBottom: "28px" }}>
                {d.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: C.graphite, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: C.peach, fontWeight: 800, fontSize: "14px" }}>
                    {d.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: C.graphite }}>{d.name}</div>
                  <div style={{ fontSize: "12px", color: C.grayMid }}>{d.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTATO / CTA ─── */
function Contato() {
  const ref = useReveal();
  const [form, setForm] = useState({ nome: "", email: "", empresa: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.nome || !form.email) return;
    setSent(true);
  };

  return (
    <section id="contato" style={{
      background: C.graphite,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background accent */}
      <div style={{
        position: "absolute",
        bottom: "-120px", right: "-120px",
        width: "500px", height: "500px",
        background: C.peach,
        borderRadius: "50%",
        opacity: 0.06,
        pointerEvents: "none",
      }} />

      <div ref={ref} className="reveal" style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        <div className="section-label" style={{ color: C.peach }}>
          <span style={{ background: C.peach, width: "32px", height: "2px", display: "block" }} />
          Contato
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 56px)",
          letterSpacing: "-1.5px",
          color: C.white,
          lineHeight: 1.05,
          marginBottom: "16px",
        }}>
          Vamos transformar<br /><span style={{ color: C.peach }}>IA em resultado</span><br />para o seu negócio.
        </h2>
        <p style={{ color: C.grayMid, fontSize: "16px", lineHeight: 1.7, marginBottom: "48px", maxWidth: "520px" }}>
          Palestras, consultorias, treinamentos in-company e mentorias.
          Preencha o formulário e entraremos em contato em até 24h.
        </p>

        {sent ? (
          <div style={{
            background: "rgba(255,189,89,0.12)",
            border: `1px solid ${C.peach}`,
            borderRadius: "4px",
            padding: "40px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>✓</div>
            <h3 style={{ color: C.white, fontFamily: "'Manrope', sans-serif", marginBottom: "8px" }}>Mensagem recebida!</h3>
            <p style={{ color: C.grayMid }}>Em breve entraremos em contato, {form.nome.split(" ")[0]}.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { key: "nome", label: "Nome completo", type: "text", full: false },
              { key: "email", label: "E-mail corporativo", type: "email", full: false },
              { key: "empresa", label: "Empresa / Organização", type: "text", full: true },
              { key: "mensagem", label: "Como posso ajudar?", type: "textarea", full: true },
            ].map((field) => (
              <div key={field.key} style={{ gridColumn: field.full ? "1 / -1" : "auto" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: C.grayMid, marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={4}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "2px",
                      padding: "14px 16px",
                      color: C.white,
                      fontSize: "15px",
                      fontFamily: "'Inter', sans-serif",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = C.peach}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "2px",
                      padding: "14px 16px",
                      color: C.white,
                      fontSize: "15px",
                      fontFamily: "'Inter', sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = C.peach}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                )}
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ fontSize: "13px", color: C.grayMid }}>
                Ou envie para:{" "}
                <a href="mailto:contato@engenheiromazza.com.br" style={{ color: C.peach, textDecoration: "none" }}>
                  contato@engenheiromazza.com.br
                </a>
              </div>
              <button className="btn-primary" onClick={handleSubmit}>
                Enviar mensagem →
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          #contato .reveal > div:last-child { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(166,166,166,0.5); }
      `}</style>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{
      background: C.black,
      padding: "40px 64px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    }}>
      <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "16px", color: C.white }}>
        Engenheiro <span style={{ color: C.peach }}>Mazza</span>
        <div style={{ fontSize: "11px", fontWeight: 400, color: C.grayMid, marginTop: "4px", letterSpacing: "0.08em" }}>
          IA aplicada ao mundo real
        </div>
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {["LinkedIn", "Instagram", "YouTube"].map((s) => (
          <a key={s} href="#" style={{ fontSize: "13px", color: C.grayMid, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => e.target.style.color = C.peach}
            onMouseLeave={(e) => e.target.style.color = C.grayMid}>
            {s}
          </a>
        ))}
      </div>
      <div style={{ fontSize: "12px", color: C.grayMid }}>
        © 2025 Engenheiro Mazza · @engenheiromazza
      </div>
      <style>{`@media (max-width: 600px) { footer { padding: 32px 24px; flex-direction: column; text-align: center; } }`}</style>
    </footer>
  );
}

/* ─── APP ─── */
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
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
