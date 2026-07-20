import { useState } from 'react';

const C = {
  peach: '#FFBD59',
  black: '#1A1A1A',
  white: '#FFFFFF',
  grayMid: '#A6A6A6',
  grayLight: '#F5F5F5'
};

const CURSOS = [
  {
    id: 'claude-rh',
    titulo: 'Claude para RH',
    descricao: 'Inteligência Artificial aplicada a recursos humanos: análise de turnover, retenção de talentos, otimização de processos seletivos e analytics estratégico.',
    status: 'Em andamento',
    statusColor: '#4CAF50',
    carga: '6 horas',
    formato: 'Presencial',
    data: 'Em progresso',
    link: 'https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA'
  },
  {
    id: 'claude-advogados-presencial',
    titulo: 'Claude para Advogados',
    descricao: 'Aplicações práticas de IA para profissionais jurídicos: análise de documentos, automação de contratos, pesquisa legal e redação de peças processuais.',
    status: 'Confirmado',
    statusColor: '#2196F3',
    carga: '6 horas',
    formato: 'Presencial',
    data: '01 de agosto de 2026',
    link: 'https://upupo.share.hsforms.com/2fpp6iBowSOOAdbpN8mbMZA'
  },
  {
    id: 'claude-advogados-online',
    titulo: 'Claude para Advogados (On-line)',
    descricao: 'Mesma essência prática, formato flexível. Perfeito para profissionais que preferem aprender no próprio ritmo, com acesso a gravações e conteúdo estruturado.',
    status: 'Em breve',
    statusColor: '#FF9800',
    carga: '6 horas',
    formato: 'On-line',
    data: 'Lançamento em breve',
    link: null
  }
];

export default function PaginaCursos() {
  const [selectedCurso, setSelectedCurso] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: ${C.grayLight}; color: ${C.black}; }
        ::selection { background: ${C.peach}; color: ${C.black}; }
      `}</style>

      <header style={{ background: C.white, borderBottom: `1px solid rgba(0,0,0,.08)`, padding: '18px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>
          <a href="/" style={{ textDecoration: 'none', color: C.black }}>
            @engenheiro<span style={{ color: C.peach }}>mazza</span>
          </a>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ marginBottom: '80px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.18em', color: C.peach, marginBottom: '12px', textTransform: 'uppercase' }}>
            Formação Prática
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
            Cursos de IA<br />para profissionais.
          </h1>
          <p style={{ color: C.grayMid, fontSize: '16px', lineHeight: 1.6, maxWidth: '560px', marginBottom: '0' }}>
            Aprenda a aplicar Claude em seu contexto profissional. Treinamentos presenciais e on-line com foco em resultados práticos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {CURSOS.map(curso => (
            <div
              key={curso.id}
              onClick={() => setSelectedCurso(curso.id === selectedCurso ? null : curso.id)}
              style={{
                background: C.white,
                border: `1px solid #DDD`,
                borderRadius: '8px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: selectedCurso === curso.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: selectedCurso === curso.id ? '0 16px 32px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={e => !selectedCurso && (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)')}
              onMouseLeave={e => !selectedCurso && (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, flex: 1 }}>
                  {curso.titulo}
                </h2>
                <span style={{
                  background: curso.statusColor,
                  color: C.white,
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px'
                }}>
                  {curso.status}
                </span>
              </div>

              <p style={{ color: C.grayMid, fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                {curso.descricao}
              </p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '13px', color: C.grayMid }}>
                <div>
                  <strong>Carga:</strong> {curso.carga}
                </div>
                <div>
                  <strong>Formato:</strong> {curso.formato}
                </div>
              </div>

              <div style={{ paddingTop: '20px', borderTop: `1px solid ${C.grayLight}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: C.grayMid, fontWeight: 600 }}>
                  {curso.data}
                </div>
                {curso.link && (
                  <a
                    href={curso.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      background: C.peach,
                      color: C.black,
                      padding: '8px 16px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '12px',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.opacity = '0.9'}
                    onMouseLeave={e => e.target.style.opacity = '1'}
                  >
                    Inscrever
                  </a>
                )}
              </div>

              {selectedCurso === curso.id && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.grayLight}` }}>
                  <p style={{ fontSize: '13px', color: C.grayMid, lineHeight: 1.6 }}>
                    {curso.status === 'Em breve' && 'Em breve teremos mais detalhes sobre este curso. Fique atento aos nossos canais!'}
                    {curso.status === 'Em andamento' && 'Acompanhe o progresso do curso através da plataforma de treinamento.'}
                    {curso.status === 'Confirmado' && 'As inscrições estão abertas. Limite de vagas disponível.'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '80px', padding: '40px', background: C.grayLight, borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: C.grayMid, lineHeight: 1.6, margin: 0 }}>
            <strong>Dúvidas sobre cursos?</strong><br />
            Entre em contato: <a href="mailto:william@wmazza.com" style={{ color: C.peach, textDecoration: 'none', fontWeight: 700 }}>william@wmazza.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
