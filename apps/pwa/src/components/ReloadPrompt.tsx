import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swScriptUrl, registration) {
      console.log('Service Worker registrado:', swScriptUrl);
      // Verifica atualizações a cada hora
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('Erro ao registrar Service Worker:', error);
    },
  });

  const fechar = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!needRefresh && !offlineReady) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      backgroundColor: '#1e293b',
      border: '1px solid #38bdf8',
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      maxWidth: '320px'
    }}>
      <span style={{ color: '#f8fafc', fontSize: '14px' }}>
        {offlineReady
          ? '✅ App pronto para uso offline!'
          : '🔄 Nova versão disponível!'}
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        {needRefresh && (
          <button
            onClick={() => updateServiceWorker(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Atualizar
          </button>
        )}
        <button
          onClick={fechar}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#94a3b8',
            border: '1px solid #475569',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
