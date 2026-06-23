import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div style={{
      width: '100%',
      zIndex: 9999,
      backgroundColor: '#f59e0b',
      flexShrink: 0,
      color: '#0f172a',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '13px',
      fontWeight: 'bold'
    }}>
      <WifiOff size={16} />
      Você está offline. Exibindo dados em cache.
    </div>
  );
}
