import { useState } from 'react';
import './SidebarCards.css';

// Reusable wrapper for a collapsible card
interface CollapsibleCardProps {
  title: string;
  iconSrc: string;
  iconBgColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleCard({ 
  title, 
  iconSrc, 
  iconBgColor = '#f1f5f9', 
  defaultOpen = false, 
  children 
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="sidebar-card-title">
          <div className="sidebar-card-icon" style={{ backgroundColor: iconBgColor }}>
            <img src={iconSrc} alt={title} />
          </div>
          <span>{title}</span>
        </div>
        <button className="sidebar-card-toggle">
          <img 
            src={isOpen ? "/img/chevron cima icone.svg" : "/img/chevron baixo icone.svg"} 
            alt="Toggle" 
            className="chevron-icon"
          />
        </button>
      </div>
      
      {isOpen && (
        <div className="sidebar-card-content">
          {children}
        </div>
      )}
    </div>
  );
}

// 1. Region Card
interface Region {
  id: string;
  name: string;
  selected: boolean;
}

interface RegionCardProps {
  countryName: string;
  regions: Region[];
  onToggleRegion: (id: string) => void;
  onAddRegion?: (data: { name: string; state: string; country: string }) => Promise<void>;
  onRemoveRegion?: (id: string) => Promise<void>;
}

export function RegionCard({ countryName, regions, onToggleRegion, onAddRegion, onRemoveRegion }: RegionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRegionData, setNewRegionData] = useState({ name: '', state: '', country: 'Brasil' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddRegion && newRegionData.name && newRegionData.state) {
      setIsSubmitting(true);
      try {
        await onAddRegion({
          name: newRegionData.name,
          state: newRegionData.state,
          country: newRegionData.country
        });
        setIsModalOpen(false);
        setNewRegionData({ name: '', state: '', country: 'Brasil' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <CollapsibleCard title="Regiões" iconSrc="/img/Regiao icone.svg" iconBgColor="#DF7149" defaultOpen={true}>
      <div className="region-section">
        <h4 className="region-country">{countryName}</h4>
        {regions.map(r => (
          <div 
            key={r.id} 
            className={`region-item ${r.selected ? 'selected' : ''}`}
            onClick={() => onToggleRegion(r.id)}
          >
            <span>{r.name}</span>
            {r.selected && (
              <img 
                src="/img/x icone.svg" 
                alt="Remover do filtro" 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRegion(r.id);
                }}
                style={{ width: '12px', height: '12px', opacity: 0.6 }}
              />
            )}
            {!r.selected && onRemoveRegion && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveRegion(r.id);
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.5, marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                title="Excluir região"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            )}
          </div>
        ))}
        {onAddRegion && (
          <button className="region-add-btn" onClick={() => setIsModalOpen(true)}>
            Adicionar Região
          </button>
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '320px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#1e293b' }}>Adicionar Região</h3>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>Nome da Região</label>
                <input required value={newRegionData.name} onChange={e => setNewRegionData({...newRegionData, name: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="Ex: Campinas" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>Estado (UF)</label>
                <input required value={newRegionData.state} onChange={e => setNewRegionData({...newRegionData, state: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="Ex: SP" />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 12px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '8px 12px', background: isSubmitting ? '#ccc' : '#DF7149', border: 'none', color: '#fff', borderRadius: '6px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CollapsibleCard>
  );
}

// 2. Indicator Card
interface Indicator {
  id: string;
  name: string;
  active: boolean;
}

interface IndicatorCardProps {
  indicators: Indicator[];
  onToggleIndicator: (id: string) => void;
}

export function IndicatorCard({ indicators, onToggleIndicator }: IndicatorCardProps) {
  return (
    <CollapsibleCard title="Indicadores" iconSrc="/img/indicadores icones.svg" iconBgColor="#8AC475" defaultOpen={true}>
      <div className="indicator-list">
        {indicators.map(ind => (
          <div 
            key={ind.id} 
            className="indicator-item"
            onClick={() => onToggleIndicator(ind.id)}
          >
            <div className={`indicator-dot ${ind.active ? 'active' : ''}`}></div>
            <span>{ind.name}</span>
          </div>
        ))}
      </div>
    </CollapsibleCard>
  );
}

// 3. History Card
interface HistoryItem {
  id: string;
  label: string;
}

interface HistoryCardProps {
  items: HistoryItem[];
  onSelectItem: (id: string) => void;
}

export function HistoryCard({ items, onSelectItem }: HistoryCardProps) {
  return (
    <CollapsibleCard title="Histórico" iconSrc="/img/historico icone.svg" iconBgColor="#EEA056" defaultOpen={false}>
      <div className="history-list">
        {items.map(item => (
          <div 
            key={item.id} 
            className="history-item"
            onClick={() => onSelectItem(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </CollapsibleCard>
  );
}
