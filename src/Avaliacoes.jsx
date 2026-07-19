import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  "Vitor Gustavo Lotoski": "vitor-gustavo-lotoski.pdf",
  "André C. S. Pereira": "andre-pereira.pdf",
  "Ciro Perez Alvarez": "ciro-perez-alvarez.pdf",
  "Cristina Ventura": "cristina-ventura.pdf",
  "Diego Perez Alvarez": "diego-perez-alvarez.pdf",
  "Julio Cezar Sary": "julio-cezar-sary.pdf",
  "Marjory Muller": "marjory-muller.pdf",
  "Priscila Santos": "priscila-santos.pdf",
  "Teste": "teste.pdf",
  "Wellerson Roggia": "wellerson-roggia.pdf"
};

const ALUNOS = ['Altair Ribeiro', 'Braulio Barbosa', 'Douglas Antunes Back', 'Jessica Sell', 'Lidiane Medeiros Jacinto', 'Luciano Gulgen', 'Renata Jacob', 'Renato Aragonez', 'Ricardo Guizoni dos Anjos', 'Vitor Gustavo Lotoski', 'André C. S. Pereira', 'Ciro Perez Alvarez', 'Cristina Ventura', 'Diego Perez Alvarez', 'Julio Cezar Sary', 'Marjory Muller', 'Priscila Santos', 'Teste', 'Wellerson Roggia'];

const CRITERIOS = [
  { id: 'relevancia', label: 'O conteúdo foi relevante para sua área de atuação?' },
  { id: 'clareza', label: 'A explanação foi clara e fácil de entender?' },
  { id: 'pratica', label: 'O curso teve aplicação prática suficiente?' },
  { id: 'tempo', label: 'A carga horária foi adequada?' },
  { id: 'material', label: 'O material fornecido foi útil?' },
  { id: 'interacao', label: 'A interação com o instrutor foi produtiva?' },
  { id: 'conhecimento', label: 'Você adquiriu novos conhecimentos?' },
  { id: 'recomenda', label: 'Você recomendaria este curso?' },
  { id: 'proximo', label: 'Gostaria de participar de próximos treinamentos?' },
  { id: 'ambiente', label: 'O ambiente/local foi adequado?' },
  { id: 'organizacao', label: 'A organização do evento foi satisfatória?' }
];

/* CERTIFICADO */
export function PaginaCertificado() {
  const [searchParams] = useSearchParams();
  const nomeAluno = searchParams.get('nome') || '';
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const nomeNormalizado = nomeAluno.trim();
  const arquivoCertificado = CERTIFICADOS_MAPPING[nomeNormalizado];
  const urlCertificado = arquivoCertificado ? `/certificados/${arquivoCertificado}` : null;

  useState(() => {
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap'); body { font-family: 'Inter', sans-serif; background: ${C.white}; color: ${C.black}; } ::selection { background: ${C.peach}; color: ${C.black}; }`}</style>
      <header style={{ background: C.white, borderBottom: `1px solid rgba(0,0,0,.08)`, padding: '18px 40px' }}>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>@engenheiro<span style={{ color: C.peach }}>mazza</span></div>
      </header>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: '14px', color: C.grayMid }}>Carregando seu certificado...</div>
          </div>
        ) : erro ? (
          <div style={{ background: '#FFF3CD', border: `1px solid #FFE69C`, padding: '24px', borderRadius: '4px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', color: '#856404' }}>Certificado não encontrado</div>
            <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
              {!nomeNormalizado ? 'Por favor, clique no link de certificado enviado em seu email.' : `Não encontramos seu certificado (${nomeNormalizado}). Verifique o link ou entre em contato: william@wmazza.com`}
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.18em', color: C.peach, marginBottom: '12px', textTransform: 'uppercase' }}>Seu Certificado</div>
            <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '8px' }}>Parabéns, <span style={{ color: C.peach }}>{nomeNormalizado}!</span></h1>
            <p style={{ color: C.grayMid, fontSize: '14px', lineHeight: 1.7, marginBottom: '40px' }}>Seu certificado de conclusão está pronto para download e impressão.</p>
            <div style={{ background: C.grayLight, border: `2px solid #DDD`, borderRadius: '8px', overflow: 'hidden', marginBottom: '32px', aspectRatio: '8.5 / 11' }}>
              <embed src={urlCertificado} type="application/pdf" width="100%" height="100%" style={{ display: 'block' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={urlCertificado} download={arquivoCertificado} style={{ flex: 1, minWidth: '200px', background: C.peach, color: C.black, fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '15px', padding: '16px 32px', borderRadius: '4px', textDecoration: 'none', textAlign: 'center', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = '0.9'} onMouseLeave={e => e.target.style.opacity = '1'}>↓ Baixar Certificado</a>
              <button onClick={() => window.print()} style={{ flex: 1, minWidth: '200px', background: C.white, color: C.black, border: `2px solid ${C.black}`, fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '15px', padding: '14px 32px', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.background = C.black; e.target.style.color = C.white; }} onMouseLeave={e => { e.target.style.background = C.white; e.target.style.color = C.black; }}>🖨️ Imprimir</button>
            </div>
            <div style={{ marginTop: '48px', padding: '24px', background: C.grayLight, borderRadius: '4px' }}>
              <p style={{ fontSize: '13px', color: C.grayMid, margin: 0, lineHeight: 1.6 }}>✓ Seu certificado foi validado no sistema.<br />✓ Compartilhe nas suas redes sociais e marque @engenheiromazza.<br /><br /><strong>Dúvidas?</strong> Envie um email para <a href="mailto:william@wmazza.com" style={{ color: C.peach, textDecoration: 'none', fontWeight: 700 }}>william@wmazza.com</a></p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* AVALIAÇÃO */
export function PaginaAvaliacao() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState('');
  const [notas, setNotas] = useState({});
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nomeAluno || Object.keys(notas).length < 11) {
      alert('Preencha todos os campos');
      return;
    }
    setEnviando(true);
    try {
      await fetch('https://nzwpnilozhjpgajdxaxs.supabase.co/rest/v1/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56d3BuaWxvemhqcGdhamR4YXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4OTg1NzksImV4cCI6MTkyMTQ3NDU3OX0.VuuQRMO3kB89J_42g-zZGmXHiJlKNRXBZ0TyqK9Yyc0',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56d3BuaWxvemhqcGdhamR4YXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4OTg1NzksImV4cCI6MTkyMTQ3NDU3OX0.VuuQRMO3kB89J_42g-zZGmXHiJlKNRXBZ0TyqK9Yyc0'
        },
        body: JSON.stringify({
          evento_id: 'claude-para-negocios',
          aluno_nome: nomeAluno,
          notas: notas,
          comentario: comentario || null,
          data_submissao: new Date().toISOString()
        })
      });
      navigate(`/certificado?nome=${encodeURIComponent(nomeAluno)}`);
    } catch (err) {
      alert('Erro ao salvar');
      setEnviando(false);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap'); body { font-family: 'Inter', sans-serif; background: #F5F5F5; }`}</style>
      <header style={{ background: '#FFF', borderBottom: '1px solid #DDD', padding: '18px 40px' }}>
        <div style={{ fontFamily: "'Manrope'", fontWeight: 900, fontSize: '16px' }}>@engenheiro<span style={{ color: '#FFBD59' }}>mazza</span></div>
      </header>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Manrope'", fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>Sua opinião<br /><span style={{ color: '#FFBD59' }}>libera seu certificado.</span></h1>
        <p style={{ color: '#A6A6A6', fontSize: '14px', marginBottom: '40px' }}>Preencha a avaliação e acesse seu certificado de conclusão na sequência.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#A6A6A6', display: 'block', marginBottom: '8px' }}>Qual é o seu nome?</label>
            <select value={nomeAluno} onChange={e => { setNomeAluno(e.target.value); setNotas({}); }} style={{ width: '100%', padding: '12px 16px', border: '1px solid #DDD', borderRadius: '4px', fontSize: '14px', background: '#FFF' }} required>
              <option value="">Selecione seu nome...</option>
              {ALUNOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {nomeAluno && <div style={{ marginBottom: '40px' }}>{CRITERIOS.map(c => (
            <div key={c.id} style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '8px' }}>{c.label}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} type="button" onClick={() => setNotas({ ...notas, [c.id]: v })} style={{ flex: 1, padding: '12px', border: notas[c.id] === v ? 'none' : '1px solid #DDD', background: notas[c.id] === v ? '#FFBD59' : '#FFF', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>{v}</button>
                ))}
              </div>
            </div>
          ))}</div>}
          {nomeAluno && (
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#A6A6A6', display: 'block', marginBottom: '8px' }}>Comentário (opcional)</label>
              <textarea value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Suas sugestões..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #DDD', borderRadius: '4px', fontSize: '14px', minHeight: '100px', fontFamily: "'Inter'" }} />
            </div>
          )}
          {nomeAluno && <button type="submit" disabled={enviando || Object.keys(notas).length < 11} style={{ width: '100%', background: enviando || Object.keys(notas).length < 11 ? '#A6A6A6' : '#FFBD59', color: '#1A1A1A', fontFamily: "'Manrope'", fontWeight: 800, fontSize: '15px', padding: '16px 32px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>{enviando ? 'Enviando...' : 'Enviar Avaliação e Acessar Certificado'}</button>}
        </form>
      </div>
    </>
  );
}

/* DASHBOARD VAZIO */
export function PaginaDashboard() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap'); body { font-family: 'Inter', sans-serif; background: #F5F5F5; }`}</style>
      <header style={{ background: '#FFF', borderBottom: '1px solid #DDD', padding: '18px 40px' }}>
        <div style={{ fontFamily: "'Manrope'", fontWeight: 900, fontSize: '16px' }}>@engenheiro<span style={{ color: '#FFBD59' }}>mazza</span></div>
      </header>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Manrope'", fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Avaliações</h1>
        <p style={{ color: '#A6A6A6', fontSize: '14px' }}>Dashboard de avaliações em desenvolvimento.</p>
      </div>
    </>
  );
}
