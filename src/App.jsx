import { useState } from 'react';

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
      `}</style>

      <header style={{ background: C.white, borderBottom: '1px solid rgba(0,0,0,.08)', padding: '18px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>
            @engenheiro<span style={{ color: C.peach }}>mazza</span>
          </div>
          <nav style={{ display: 'flex', gap: '40px', fontSize: '14px', fontWeight: 600 }}>
            <a href="/cursos" style={{ color: C.black, textDecoration: 'none' }}>Cursos</a>
            <a href="https://linkedin.com/in/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.black, textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://instagram.com/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.black, textDecoration: 'none' }}>Instagram</a>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          IA pratica para negocios reais.
        </h1>
        <p style={{ color: C.grayMid, fontSize: '18px', lineHeight: 1.6, maxWidth: '560px', marginBottom: '40px' }}>
          Speaker, consultor e educador em Inteligencia Artificial. Especializado em aplicacoes praticas para RH, juridico e gestao empresarial.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/cursos" style={{ background: C.peach, color: C.black, fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '15px', padding: '16px 32px', borderRadius: '4px', textDecoration: 'none' }}>Ver Cursos</a>
          <a href="https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA" target="_blank" rel="noopener noreferrer" style={{ background: C.white, color: C.black, border: '2px solid ' + C.black, fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '15px', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none' }}>Inscricao</a>
        </div>
      </div>

      <div style={{ background: C.grayLight, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 900, color: C.peach, marginBottom: '8px' }}>20+</div>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Anos de experiencia em tecnologia</div>
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

      <footer style={{ background: C.white, borderTop: '1px solid rgba(0,0,0,.08)', padding: '40px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '14px', color: C.grayMid }}>
          <p style={{ marginBottom: '16px' }}>@engenheiromazza | Inteligencia Artificial para Negocios</p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:william@wmazza.com" style={{ color: C.grayMid, textDecoration: 'none' }}>william@wmazza.com</a>
            <a href="https://linkedin.com/in/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.grayMid, textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://instagram.com/engenheiromazza" target="_blank" rel="noopener noreferrer" style={{ color: C.grayMid, textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
}
