import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  peach: '#FFBD59',
  black: '#1A1A1A',
  white: '#FFFFFF',
  grayMid: '#A6A6A6',
  grayLight: '#F5F5F5'
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

export default function PaginaAvaliacao() {
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; background: #F5F5F5; }
      `}</style>
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
                  <button key={v} type="button" onClick={() => setNotas({ ...notas, [c.id]: v })} style={{ flex: 1, padding: '12px', border: notas[c.id] === v ? 'none' : '1px solid #DDD', background: notas[c.id] === v ? '#FFBD59' : '#FFF', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                    {v}
                  </button>
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
          {nomeAluno && <button type="submit" disabled={enviando || Object.keys(notas).length < 11} style={{ width: '100%', background: enviando || Object.keys(notas).length < 11 ? '#A6A6A6' : '#FFBD59', color: '#1A1A1A', fontFamily: "'Manrope'", fontWeight: 800, fontSize: '15px', padding: '16px 32px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
            {enviando ? 'Enviando...' : 'Enviar Avaliação e Acessar Certificado'}
          </button>}
        </form>
      </div>
    </>
  );
}
