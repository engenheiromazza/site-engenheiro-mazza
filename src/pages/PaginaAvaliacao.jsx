import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  peach: '#FFBD59',
  black: '#1A1A1A',
  white: '#FFFFFF',
  grayMid: '#A6A6A6',
  grayLight: '#F5F5F5'
};

const ALUNOS = [
  'Altair Ribeiro',
  'Braulio Barbosa',
  'Douglas Antunes Back',
  'Jessica Sell',
  'Lidiane Medeiros Jacinto',
  'Luciano Gulgen',
  'Renata Jacob',
  'Renato Aragonez',
  'Ricardo Guizoni dos Anjos',
  'Vitor Gustavo Lotoski',
  'André C. S. Pereira',
  'Ciro Perez Alvarez',
  'Cristina Ventura',
  'Diego Perez Alvarez',
  'Julio Cezar Sary',
  'Marjory Muller',
  'Priscila Santos',
  'Teste',
  'Wellerson Roggia'
];

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
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!nomeAluno) {
      setErro('Por favor, selecione seu nome.');
      return;
    }

    if (Object.keys(notas).length < CRITERIOS.length) {
      setErro('Por favor, avalie todos os critérios antes de enviar.');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('https://nzwpnilozhjpgajdxaxs.supabase.co/rest/v1/avaliacoes', {
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

      if (!response.ok) {
        throw new Error('Erro ao salvar avaliação');
      }

      navigate(`/certificado?nome=${encodeURIComponent(nomeAluno)}`);
    } catch (err) {
      console.error('Erro:', err);
      setErro(`Erro ao salvar avaliação`);
      setEnviando(false);
    }
  };

  const fieldStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #DDD',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    background: C.white,
    color: C.black
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: ${C.grayLight}; color: ${C.black}; }
        ::selection { background: ${C.peach}; color: ${C.black}; }
      `}</style>

      <header style={{ background: C.white, borderBottom: `1px solid rgba(0,0,0,.08)`, padding: '18px 40px' }}>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '16px' }}>
          @engenheiro<span style={{ color: C.peach }}>mazza</span>
        </div>
      </header>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.18em', color: C.peach, marginBottom: '12px', textTransform: 'uppercase' }}>
          Avaliação de Treinamento
        </div>
        <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '8px' }}>
          Sua opinião<br /><span style={{ color: C.peach }}>libera seu certificado.</span>
        </h1>
        <p style={{ color: C.grayMid, fontSize: '14px', lineHeight: 1.7, marginBottom: '40px' }}>
          Preencha a avaliação e acesse seu certificado de conclusão na sequência.
        </p>

        {erro && (
          <div style={{ background: '#FFE5E5', border: '1px solid #FFCCCC', padding: '14px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '14px', color: '#C33' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: C.grayMid, display: 'block', marginBottom: '8px' }}>
              Qual é o seu nome?
            </label>
            <select 
              value={nomeAluno} 
              onChange={e => {
                setNomeAluno(e.target.value);
                setNotas({});
              }}
              style={fieldStyle}
              required
            >
              <option value="">Selecione seu nome...</option>
              {ALUNOS.map(aluno => (
                <option key={aluno} value={aluno}>{aluno}</option>
              ))}
            </select>
          </div>

          {nomeAluno && (
            <div style={{ marginBottom: '40px' }}>
              {CRITERIOS.map(criterio => (
                <div key={criterio.id} style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: C.black, display: 'block', marginBottom: '8px' }}>
                    {criterio.label}
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(valor => (
                      <button
                        key={valor}
                        type="button"
                        onClick={() => setNotas({ ...notas, [criterio.id]: valor })}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: notas[criterio.id] === valor ? 'none' : `1px solid #DDD`,
                          background: notas[criterio.id] === valor ? C.peach : C.white,
                          color: notas[criterio.id] === valor ? C.black : C.grayMid,
                          borderRadius: '4px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                          if (notas[criterio.id] !== valor) {
                            e.target.style.background = C.grayLight;
                          }
                        }}
                        onMouseLeave={e => {
                          if (notas[criterio.id] !== valor) {
                            e.target.style.background = C.white;
                          }
                        }}
                      >
                        {valor}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {nomeAluno && (
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: C.grayMid, display: 'block', marginBottom: '8px' }}>
                Comentário (opcional)
              </label>
              <textarea
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                placeholder="Suas sugestões..."
                style={{
                  ...fieldStyle,
                  minHeight: '100px',
                  fontFamily: "'Inter', sans-serif",
                  resize: 'none'
                }}
              />
            </div>
          )}

          {nomeAluno && (
            <button
              type="submit"
              disabled={enviando || Object.keys(notas).length < CRITERIOS.length}
              style={{
                width: '100%',
                background: enviando || Object.keys(notas).length < CRITERIOS.length ? C.grayMid : C.peach,
                color: C.black,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: '15px',
                padding: '16px 32px',
                borderRadius: '4px',
                border: 'none',
                cursor: Object.keys(notas).length < CRITERIOS.length ? 'not-allowed' : 'pointer',
              }}
            >
              {enviando ? 'Enviando...' : 'Enviar Avaliação e Acessar Certificado'}
            </button>
          )}
        </form>

        {nomeAluno && (
          <div style={{ marginTop: '32px', padding: '24px', background: C.grayLight, borderRadius: '4px' }}>
            <p style={{ fontSize: '13px', color: C.grayMid, margin: 0, lineHeight: 1.6 }}>
              ✓ Seus dados estão seguros.
              <br />
              ✓ Após enviar, você será redirecionado para seu certificado.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
