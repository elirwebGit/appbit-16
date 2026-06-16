import { useState } from 'react';

interface Mensagem {
  id: number;
  autor: 'usuario' | 'ia';
  texto: string;
}

export default function ChatIA() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: 1, autor: 'ia', texto: 'Olá! Sou o assistente Visent AI. Como posso te ajudar na análise de dados públicos hoje?' }
  ]);
  const [input, setInput] = useState('');

  const lidarComEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Adiciona a mensagem do usuário na tela
    const novaMensagemUsuario: Mensagem = {
      id: Date.now(),
      autor: 'usuario',
      texto: input
    };

    setMensagens((antigas) => [...antigas, novaMensagemUsuario]);
    const pergunta = input;
    setInput('');

    // 2. Simula o Pedro processando a IA (Resposta Mockada para o MVP)
    setTimeout(() => {
      let respostaIA = "Entendi a sua dúvida. Estou processando os dados do CDRView para o eixo solicitado.";
      
      if (pergunta.toLowerCase().includes('são paulo') || pergunta.toLowerCase().includes('sp')) {
        respostaIA = "Análise de São Paulo (Zona Sul): O índice de empregabilidade está crítico (0.42). Identifiquei forte correlação com a falta de infraestrutura de rede móvel (sinal 3G escasso), o que isola a força de trabalho local.";
      } else if (pergunta.toLowerCase().includes('rio') || pergunta.toLowerCase().includes('rj')) {
        respostaIA = "Análise do Rio de Janeiro (Centro): O índice está estável (0.78). A região conta com excelente cobertura 5G e alta concentração de empresas, mantendo os níveis de empregabilidade elevados.";
      }

      setMensagens((antigas) => [...antigas, {
        id: Date.now() + 1,
        autor: 'ia',
        texto: respostaIA
      }]);
    }, 1000);
  };

  return (
    <div style={{ 
      width: '380px', 
      backgroundColor: '#1e293b', 
      borderRadius: '8px', 
      border: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Topo do Chat */}
      <div style={{ padding: '15px', borderBottom: '1px solid #334155', backgroundColor: '#0f172a', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
          Assistente Visent AI
        </h3>
      </div>

      {/* Histórico de Mensagens */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mensagens.map((msg) => (
          <div key={msg.id} style={{
            alignSelf: msg.autor === 'usuario' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            backgroundColor: msg.autor === 'usuario' ? '#0284c7' : '#334155',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: '8px',
            borderBottomRightRadius: msg.autor === 'usuario' ? '0' : '8px',
            borderBottomLeftRadius: msg.autor === 'ia' ? '0' : '8px',
            fontSize: '13px',
            lineHeight: '1.4'
          }}>
            {msg.texto}
          </div>
        ))}
      </div>

      {/* Input de Envio */}
      <form onSubmit={lidarComEnvio} style={{ padding: '15px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre SP ou RJ..."
          style={{
            flex: 1,
            backgroundColor: '#0f172a',
            border: '1px solid #475569',
            borderRadius: '4px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '13px'
        }}>
          Enviar
        </button>
      </form>
    </div>
  );
}