import { useEffect, useState } from 'react';

const C = {
  peach: '#FFBD59',
  black: '#1A1A1A',
  white: '#FFFFFF',
  grayMid: '#A6A6A6',
  grayLight: '#F5F5F5'
};

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: ${C.white}; color: ${C.black}; }
        ::selection { background: ${C.peach}; color: ${C.black}; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: C.white, borderBottom: `1px solid rgba(0,0,0,.08)`, padding: '18px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>
            @engenheiro<span style={{ color: C.peach }}>mazza</span>
          </div>
          <nav style={{ display: 'flex', gap: '40px', fontSize: '14px', fontWeight: 600 }}>
            <a href="/cursos" style={{ color: C.black, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.black}>
              Cursos
            </a>
            <a href="https://linkedin.com/in/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.black, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.black}>
              LinkedIn
            </a>
            <a href="https://instagram.com/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.black, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.black}>
              Instagram
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          IA prática<br />para <span style={{ color: C.peach }}>negócios</span> reais.
        </h1>
        <p style={{ color: C.grayMid, fontSize: '18px', lineHeight: 1.6, maxWidth: '560px', marginBottom: '40px' }}>
          Speaker, consultor e educador em Inteligência Artificial. Especializado em aplicações práticas para RH, jurídico e gestão empresarial.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="/cursos"
            style={{
              background: C.peach,
              color: C.black,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              padding: '16px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Ver Cursos
          </a>
          <a
            href="https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: C.white,
              color: C.black,
              border: `2px solid ${C.black}`,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.target.style.background = C.black; e.target.style.color = C.white; }}
            onMouseLeave={e => { e.target.style.background = C.white; e.target.style.color = C.black; }}
          >
            Inscrição
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: C.grayLight, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 900, color: C.peach, marginBottom: '8px' }}>20+</div>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Anos de experiência em tecnologia</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 900, color: C.peach, marginBottom: '8px' }}>1000+</div>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Profissionais treinados</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 900, color: C.peach, marginBottom: '8px' }}>50+</div>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Palestras e mentorias realizadas</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: C.white, borderTop: `1px solid rgba(0,0,0,.08)`, padding: '40px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '14px', color: C.grayMid' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>@engenheiromazza</strong> | Inteligência Artificial para Negócios
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:william@wmazza.com" style={{ color: C.grayMid, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.grayMid}>
              william@wmazza.com
            </a>
            <a href="https://linkedin.com/in/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.grayMid, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.grayMid}>
              LinkedIn
            </a>
            <a href="https://instagram.com/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.grayMid, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.grayMid}>
              Instagram
            </a>
            <a href="https://youtube.com/@engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.grayMid, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = C.peach} onMouseLeave={e => e.target.style.color = C.grayMid}>
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
