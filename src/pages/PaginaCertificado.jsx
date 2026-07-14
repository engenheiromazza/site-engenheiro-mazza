import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const C = {
  peach: '#FFBD59',
  black: '#1A1A1A',
  white: '#FFFFFF',
  grayMid: '#A6A6A6',
  grayLight: '#F5F5F5'
};

const CERTIFICADOS_MAPPING = {
  "Altair Ribeiro": "altair-ribeiro.pdf",
  "Braulio Barbosa": "braulio-barbosa.pdf",
  "Douglas Antunes Back": "douglas-antunes-back.pdf",
  "Jessica Sell": "jessica-sell.pdf",
  "Lidiane Medeiros Jacinto": "lidiane-medeiros-jacinto.pdf",
  "Luciano Gulgen": "luciano-gulgen.pdf",
  "Renata Jacob": "renata-jacob.pdf",
  "Renato Aragonez": "renato-aragonez.pdf",
  "Ricardo Guizoni dos Anjos": "ricardo-guizoni-dos-anjos.pdf",
  "Vitor Gustavo Lotoski": "vitor-gustavo-lotoski.pdf"
};

export default function PaginaCertificado() {
  const [searchParams] = useSearchParams();
  const nomeAluno = searchParams.get('nome') || '';
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const nomeNormalizado = nomeAluno.trim();
  const arquivoCertificado = CERTIFICADOS_MAPPING[nomeNormalizado];
  const urlCertificado = arquivoCertificado 
    ? `/certificados/${arquivoCertificado}`
    : null;

  useEffect(() => {
    if (urlCertificado) {
      fetch(urlCertificado, { method: 'HEAD' })
        .then(res => {
          if (!res.ok) setErro(true);
          setLoading(false);
        })
        .catch(() => {
          setErro(true);
          setLoading(false);
        });
    } else {
      setErro(true);
      setLoading(false);
    }
  }, [urlCertificado]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; background: ${C.white}; color: ${C.black}; }
        ::selection { background: ${C.peach}; color: ${C.black}; }
      `}</style>

      <header style={{ background: C.white, borderBottom: `1px solid rgba(0,0,0,.08)`, padding: '18px 40px' }}>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>
          @engenheiro<span style={{ color: C.peach }}>mazza</span>
        </div>
      </header>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Carregando seu certificado...</div>
          </div>
        ) : erro ? (
          <div style={{ background: '#FFF3CD', border: `1px solid #FFE69C`, padding: '24px', borderRadius: '4px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', color: '#856404' }}>
              Certificado não encontrado
            </div>
            <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
              {!nomeNormalizado 
                ? 'Por favor, clique no link de certificado enviado em seu email.' 
                : `Não encontramos seu certificado (${nomeNormalizado}). Verifique o link ou entre em contato: william@wmazza.com`}
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.18em', color: C.peach, marginBottom: '12px', textTransform: 'uppercase' }}>
              Seu Certificado
            </div>
            <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '8px' }}>
              Parabéns, <span style={{ color: C.peach }}>{nomeNormalizado}!</span>
            </h1>
            <p style={{ color: C.grayMid, fontSize: '14px', lineHeight: 1.7, marginBottom: '40px' }}>
              Seu certificado de conclusão está pronto para download e impressão.
            </p>

            <div style={{ 
              background: C.grayLight, 
              border: `2px solid #DDD`, 
              borderRadius: '8px', 
              overflow: 'hidden',
              marginBottom: '32px',
              aspectRatio: '8.5 / 11'
            }}>
              <embed 
                src={urlCertificado} 
                type="application/pdf" 
                width="100%" 
                height="100%"
                style={{ display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a 
                href={urlCertificado} 
                download={arquivoCertificado}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  background: C.peach,
                  color: C.black,
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: '15px',
                  padding: '16px 32px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.target.style.opacity = '0.9'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                ↓ Baixar Certificado
              </a>

              <button 
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  background: C.white,
                  color: C.black,
                  border: `2px solid ${C.black}`,
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: '15px',
                  padding: '14px 32px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.target.style.background = C.black;
                  e.target.style.color = C.white;
                }}
                onMouseLeave={e => {
                  e.target.style.background = C.white;
                  e.target.style.color = C.black;
                }}
              >
                🖨️ Imprimir
              </button>
            </div>

            <div style={{ 
              marginTop: '48px', 
              padding: '24px', 
              background: C.grayLight, 
              borderRadius: '4px'
            }}>
              <p style={{ fontSize: '13px', color: C.grayMid, margin: 0, lineHeight: 1.6 }}>
                ✓ Seu certificado foi validado no sistema.
                <br />
                ✓ Compartilhe nas suas redes sociais e marque @engenheiromazza.
                <br />
                <br />
                <strong>Dúvidas?</strong> Envie um email para <a href="mailto:william@wmazza.com" style={{ color: C.peach, textDecoration: 'none', fontWeight: 700 }}>william@wmazza.com</a>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
