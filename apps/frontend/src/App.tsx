import { useState } from 'react'
import { MapPin, ShieldAlert, Briefcase, GraduationCap, MessagesSquare, Bot } from 'lucide-react'
import MapaVisent from './components/MapaVisent'
import type { Mensagem } from './types/visent'

export default function App() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: 1, autor: 'ia', texto: 'Painel Vísent AI carregado. Faça uma consulta sobre a infraestrutura ou o índice de empregabilidade de SP ou RJ.' }
  ]);
  const [textoInput, setTextoInput] = useState('');

  const lidarComConsulta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoInput.trim()) return;

    const novaMsgUsuario: Mensagem = {
      id: Date.now(),
      autor: 'usuario',
      texto: textoInput
    };

    setMensagens(prev => [...prev, novaMsgUsuario]);
    const pergunta = textoInput.toLowerCase();
    setTextoInput('');

    setTimeout(() => {
      let respostaIA = "Cruzando dados de mobilidade do CDRView com indicadores socioeconômicos...";

      if (pergunta.includes('são paulo') || pergunta.includes('sp')) {
        respostaIA = "⚠️ SP - Zona Sul: Concentração populacional crítica identificada (85k pessoas). A infraestrutura de rede móvel atual é predominantemente 3G/Escassa, gerando um forte impacto negativo no Índice de Empregabilidade da região, atualmente avaliado em 0.42 (Baixo).";
      } else if (pergunta.includes('rio') || pergunta.includes('rj') || pergunta.includes('rio de janeiro')) {
        respostaIA = "✅ RJ - Centro: Cenário de alta estabilidade. Região beneficiada por ampla cobertura de infraestrutura 5G aliada a uma densidade corporativa consolidada. O Índice de Empregabilidade local reflete essa sinergia, atingindo 0.78 (Alto).";
      } else {
        respostaIA = "Análise do Eixo Sudeste: Identificamos um gap estrutural severo na correlação entre conectividade móvel e oportunidades de trabalho em bairros periféricos. Recomenda-se priorizar investimentos em infraestrutura de rede móvel.";
      }

      setMensagens(prev => [...prev, {
        id: Date.now() + 1,
        autor: 'ia',
        texto: respostaIA
      }]);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', margin: 0, overflow: 'hidden' }}>
      
      {/* Barra Lateral de Navegação */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', borderRight: '1px solid #334155' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '20px' }}>App BiT — B2G</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#94a3b8' }}>
            <GraduationCap size={20} /> <span>Formações</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '6px', backgroundColor: '#334155', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            <Briefcase size={20} /> <span>Empregabilidade</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#94a3b8' }}>
            <MapPin size={20} /> <span>Iniciativas Sociais</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#94a3b8' }}>
            <ShieldAlert size={20} /> <span>Saúde Mental</span>
          </div>
        </nav>
        
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #334155', paddingTop: '10px' }}>
          Eixo Sudeste — Monitoramento SP / RJ
        </div>
      </aside>

      {/* Área Direita Completa */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Topbar */}
        <header style={{ height: '60px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #334155', justifyContent: 'space-between', flexShrink: 0 }}>
          <h1 style={{ fontSize: '1rem', fontWeight: '500' }}>Painel de Dados Públicos — Vísent CDRView</h1>
          <span style={{ fontSize: '11px', backgroundColor: '#0284c7', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>MVP CONTRATO</span>
        </header>

        {/* Bloco de Conteúdo Central (Split: IA na esquerda, Mapa na direita) */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', backgroundColor: '#0f172a' }}>
          
          {/* Coluna do Terminal da IA */}
          <div style={{ width: '350px', backgroundColor: '#111827', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '15px', borderBottom: '1px solid #232e42', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} style={{ color: '#38bdf8' }} />
              <strong style={{ fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Terminal Analítico Visent AI</strong>
            </div>
            
            {/* Mensagens Roláveis */}
            <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: '1.4' }}>
              {mensagens.map((msg) => (
                <div key={msg.id} style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: msg.autor === 'usuario' ? '#0284c7' : '#1e293b',
                  borderLeft: msg.autor === 'ia' ? '3px solid #38bdf8' : 'none',
                  alignSelf: msg.autor === 'usuario' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  color: '#f8fafc'
                }}>
                  {msg.texto}
                </div>
              ))}
            </div>
          </div>

          {/* Espaço Dinâmico do Mapa */}
          <div style={{ flex: 1, height: '100%', position: 'relative' }}>
            <MapaVisent />
          </div>

        </div>

        {/* Barra de Formuário Inferior */}
        <form onSubmit={lidarComConsulta} style={{ padding: '20px', backgroundColor: '#1e293b', borderTop: '1px solid #334155', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          <MessagesSquare style={{ color: '#38bdf8' }} />
          <input 
            type="text" 
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            placeholder="Pergunte à IA: 'Como está a situação de São Paulo?' ou 'Verificar Rio de Janeiro'..." 
            style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Consultar
          </button>
        </form>

      </main>
    </div>
  )
}