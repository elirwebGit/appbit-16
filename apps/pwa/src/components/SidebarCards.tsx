import { useState } from 'react';
import './SidebarCards.css';

// Catálogo de regiões disponíveis para o usuário escolher (sem digitar)
const AVAILABLE_REGIONS: { name: string; state: string }[] = [
  { name: 'São Paulo — Centro', state: 'SP' },
  { name: 'São Paulo — Zona Norte', state: 'SP' },
  { name: 'São Paulo — Zona Sul', state: 'SP' },
  { name: 'São Paulo — Zona Leste', state: 'SP' },
  { name: 'São Paulo — Zona Oeste', state: 'SP' },
  { name: 'Campinas', state: 'SP' },
  { name: 'Santos', state: 'SP' },
  { name: 'Ribeirão Preto', state: 'SP' },
  { name: 'São José dos Campos', state: 'SP' },
  { name: 'Sorocaba', state: 'SP' },
  { name: 'Rio de Janeiro — Centro', state: 'RJ' },
  { name: 'Rio de Janeiro — Zona Norte', state: 'RJ' },
  { name: 'Rio de Janeiro — Zona Sul', state: 'RJ' },
  { name: 'Rio de Janeiro — Zona Oeste', state: 'RJ' },
  { name: 'Niterói', state: 'RJ' },
  { name: 'Duque de Caxias', state: 'RJ' },
  { name: 'Nova Iguaçu', state: 'RJ' },
  { name: 'Campos dos Goytacazes', state: 'RJ' },
  { name: 'Belo Horizonte — Centro', state: 'MG' },
  { name: 'Contagem', state: 'MG' },
  { name: 'Uberlândia', state: 'MG' },
  { name: 'Juiz de Fora', state: 'MG' },
  { name: 'Betim', state: 'MG' },
  { name: 'Montes Claros', state: 'MG' },
  { name: 'Salvador — Centro Histórico', state: 'BA' },
  { name: 'Salvador — Subúrbio Ferroviário', state: 'BA' },
  { name: 'Feira de Santana', state: 'BA' },
  { name: 'Vitória da Conquista', state: 'BA' },
  { name: 'Camaçari', state: 'BA' },
  { name: 'Curitiba', state: 'PR' },
  { name: 'Londrina', state: 'PR' },
  { name: 'Maringá', state: 'PR' },
  { name: 'Ponta Grossa', state: 'PR' },
  { name: 'Cascavel', state: 'PR' },
  { name: 'Porto Alegre', state: 'RS' },
  { name: 'Caxias do Sul', state: 'RS' },
  { name: 'Pelotas', state: 'RS' },
  { name: 'Canoas', state: 'RS' },
  { name: 'Santa Maria', state: 'RS' },
  { name: 'Recife', state: 'PE' },
  { name: 'Jaboatão dos Guararapes', state: 'PE' },
  { name: 'Olinda', state: 'PE' },
  { name: 'Caruaru', state: 'PE' },
  { name: 'Fortaleza', state: 'CE' },
  { name: 'Caucaia', state: 'CE' },
  { name: 'Juazeiro do Norte', state: 'CE' },
  { name: 'Sobral', state: 'CE' },
  { name: 'Brasília — Plano Piloto', state: 'DF' },
  { name: 'Brasília — Ceilândia', state: 'DF' },
  { name: 'Taguatinga', state: 'DF' },
  { name: 'Goiânia', state: 'GO' },
  { name: 'Aparecida de Goiânia', state: 'GO' },
  { name: 'Anápolis', state: 'GO' },
  { name: 'Manaus', state: 'AM' },
  { name: 'Belém', state: 'PA' },
  { name: 'Ananindeua', state: 'PA' },
  { name: 'Santarém', state: 'PA' },
  { name: 'São Luís', state: 'MA' },
  { name: 'Imperatriz', state: 'MA' },
  { name: 'Vitória', state: 'ES' },
  { name: 'Vila Velha', state: 'ES' },
  { name: 'Serra', state: 'ES' },
  { name: 'Florianópolis', state: 'SC' },
  { name: 'Joinville', state: 'SC' },
  { name: 'Blumenau', state: 'SC' },
  { name: 'Chapecó', state: 'SC' },
  { name: 'João Pessoa', state: 'PB' },
  { name: 'Campina Grande', state: 'PB' },
  { name: 'Natal', state: 'RN' },
  { name: 'Mossoró', state: 'RN' },
  { name: 'Maceió', state: 'AL' },
  { name: 'Arapiraca', state: 'AL' },
  { name: 'Teresina', state: 'PI' },
  { name: 'Parnaíba', state: 'PI' },
  { name: 'Cuiabá', state: 'MT' },
  { name: 'Várzea Grande', state: 'MT' },
  { name: 'Campo Grande', state: 'MS' },
  { name: 'Dourados', state: 'MS' },
  { name: 'Aracaju', state: 'SE' },
  { name: 'Palmas', state: 'TO' },
  { name: 'Porto Velho', state: 'RO' },
  { name: 'Rio Branco', state: 'AC' },
  { name: 'Macapá', state: 'AP' },
  { name: 'Boa Vista', state: 'RR' },
];

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
  id: string;      // UUID no banco — usado para excluir
  key: string;     // identificador da seleção (nome da região)
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regionQuery, setRegionQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<{ name: string; state: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredRegions = AVAILABLE_REGIONS.filter((r) => {
    const q = regionQuery.trim().toLowerCase();
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || r.state.toLowerCase().includes(q);
  }).slice(0, 50);

  const resetForm = () => {
    setSelectedRegion(null);
    setRegionQuery('');
    setIsDropdownOpen(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddRegion && selectedRegion) {
      setIsSubmitting(true);
      try {
        await onAddRegion({
          name: selectedRegion.name,
          state: selectedRegion.state,
          country: 'Brasil',
        });
        setIsModalOpen(false);
        resetForm();
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
            key={r.key} 
            className={`region-item ${r.selected ? 'selected' : ''}`}
            onClick={() => onToggleRegion(r.key)}
          >
            <span>{r.name}</span>
            {r.selected && (
              <img 
                src="/img/x icone.svg" 
                alt="Remover do filtro" 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRegion(r.key);
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
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#64748b' }}>Região disponível</label>
                <input
                  type="text"
                  value={selectedRegion ? `${selectedRegion.name} (${selectedRegion.state})` : regionQuery}
                  onChange={(e) => {
                    setRegionQuery(e.target.value);
                    setSelectedRegion(null);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                  placeholder="Pesquisar por cidade ou UF..."
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: 4,
                      maxHeight: 180,
                      overflowY: 'auto',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      background: '#fff',
                      zIndex: 20,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    }}
                  >
                    {filteredRegions.length === 0 && (
                      <div style={{ padding: '8px 12px', fontSize: 12, color: '#94a3b8' }}>
                        Nenhuma região encontrada
                      </div>
                    )}
                    {filteredRegions.map((r) => (
                      <div
                        key={`${r.name}|${r.state}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedRegion(r);
                          setRegionQuery(`${r.name} (${r.state})`);
                          setIsDropdownOpen(false);
                        }}
                        style={{ padding: '8px 12px', fontSize: 13, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 8 }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>{r.name}</span>
                        <span style={{ color: '#94a3b8' }}>{r.state}</span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedRegion && (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#22c55e' }}>
                    Selecionada: {selectedRegion.name} ({selectedRegion.state})
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ padding: '8px 12px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" disabled={isSubmitting || !selectedRegion} style={{ padding: '8px 12px', background: isSubmitting || !selectedRegion ? '#ccc' : '#DF7149', border: 'none', color: '#fff', borderRadius: '6px', cursor: isSubmitting || !selectedRegion ? 'not-allowed' : 'pointer' }}>{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
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
