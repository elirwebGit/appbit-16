import { Fragment, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Importação do CSS essencial do Leaflet
import 'leaflet/dist/leaflet.css'
import './MapaVisent.css'

// Correção para o ícone do Leaflet aparecer corretamente no Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const IconeCustomizado = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

import { useDashboard } from '../contexts/DashboardContext'
import type { RegiaoMapa } from '../types/visent'

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

// ── Decoupled style layer (independent of geometry type) ───────────────────
// This style system is designed to work with Circle, Polygon, GeoJSON, or
// any other Leaflet geometry. When GeoJSON polygons are available, replace
// the Circle component with GeoJSON and pass these same style functions.

interface RegionStyle {
  color: string;       // stroke color
  fillColor: string;   // fill color
  fillOpacity: number;
  weight: number;
  radius: number;      // used for Circle; ignored for GeoJSON polygons
  className: string;   // CSS class for animations
}

function getIndicatorColor(value: number): string {
  if (value < 0.3) return '#ef4444';  // Vermelho — Muito baixa
  if (value < 0.6) return '#f59e0b';  // Amarelo — Baixa/Média
  if (value < 0.8) return '#3b82f6';  // Azul — Boa
  return '#22c55e';                    // Verde — Excelente
}

function getIndicatorValue(regiao: RegiaoMapa, indicatorId: string): number {
  if (indicatorId === 'saude_mental') return regiao.indicadores.saude_mental;
  if (indicatorId === 'empregabilidade') return regiao.indicadores.empregabilidade;
  if (indicatorId === 'formacoes') return regiao.indicadores.formacoes;
  return 0;
}

function computeRegionStyle(
  regiao: RegiaoMapa,
  indicatorId: string,
  isSelected: boolean,
  hasAnySelection: boolean,
): RegionStyle {
  const value = getIndicatorValue(regiao, indicatorId);
  const indicatorColor = getIndicatorColor(value);

  if (isSelected) {
    // Selected: vivid color, high opacity, thick border, larger radius, pulse animation
    return {
      color: '#0f172a',
      fillColor: indicatorColor,
      fillOpacity: 0.65,
      weight: 4,
      radius: 35000,
      className: 'region-highlight-selected',
    };
  }

  if (hasAnySelection) {
    // Not selected but others are: muted/gray, low opacity
    return {
      color: '#cbd5e1',
      fillColor: '#94a3b8',
      fillOpacity: 0.12,
      weight: 1,
      radius: 25000,
      className: 'region-highlight-muted',
    };
  }

  // Default: no selection active — show normal indicator colors
  return {
    color: indicatorColor,
    fillColor: indicatorColor,
    fillOpacity: 0.25,
    weight: 1.5,
    radius: 28000,
    className: '',
  };
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function MapaVisent() {
  const { mapData: dadosRegioes, isLoading, error, activeIndicatorId, selectedRegionIds } = useDashboard()

  const hasAnySelection = selectedRegionIds.length > 0;

  // Compute styles for all regions using the decoupled style layer
  const regionStyles = useMemo(() => {
    return dadosRegioes.map(regiao => ({
      regiao,
      style: computeRegionStyle(
        regiao,
        activeIndicatorId,
        selectedRegionIds.includes(regiao.regiao),
        hasAnySelection,
      ),
    }));
  }, [dadosRegioes, activeIndicatorId, selectedRegionIds, hasAnySelection]);

  // Centro estratégico entre SP e RJ para os dois aparecerem na tela ao mesmo tempo
  const posicaoCentro: [number, number] = [-23.30, -45.30]

  return (
    <div className="mapa-container" style={{ position: 'relative' }}>
      {isLoading && (
        <div className="mapa-loading-overlay">
          <div className="mapa-loading-spinner" />
          <span>Carregando dados das regiões...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="mapa-error-banner">
          <strong>Erro ao Carregar Mapa</strong>
          <p>{error}</p>
        </div>
      )}

      <MapContainer 
        center={posicaoCentro} 
        zoom={7}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <MapResizer />
        {/* Camada do mapa com estilo claro (CartoDB Positron) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {regionStyles.map(({ regiao, style }) => {
          const isSelected = selectedRegionIds.includes(regiao.regiao);

          return (
            <Fragment key={regiao.regiao}>
              {/* Region area indicator — Circle for now, replaceable with GeoJSON polygon */}
              <Circle
                center={[regiao.lat, regiao.lng]}
                radius={style.radius}
                pathOptions={{
                  color: style.color,
                  fillColor: style.fillColor,
                  fillOpacity: style.fillOpacity,
                  weight: style.weight,
                  className: style.className,
                }}
              />

              {/* Pulse ring for selected regions */}
              {isSelected && (
                <Circle
                  center={[regiao.lat, regiao.lng]}
                  radius={style.radius + 5000}
                  pathOptions={{
                    color: style.fillColor,
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    weight: 2,
                    dashArray: '6 4',
                    className: 'region-pulse-ring',
                  }}
                />
              )}

              {/* Marcador Interativo */}
              <Marker position={[regiao.lat, regiao.lng]} icon={IconeCustomizado}>
                <Popup>
                  <div style={{ color: '#000', fontFamily: 'sans-serif', minWidth: '160px' }}>
                    <strong style={{ fontSize: '13px', color: '#1e293b' }}>{regiao.nome_exibicao}</strong>
                    <hr style={{ margin: '5px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
                    
                    <p style={{ margin: '3px 0', fontSize: '11px' }}>
                      <strong>População:</strong> {regiao.concentracao_pessoas.toLocaleString('pt-BR')} pessoas
                    </p>
                    <p style={{ margin: '3px 0', fontSize: '11px' }}>
                      <strong>Sinal Móvel:</strong> {regiao.cobertura_rede} (Qualidade: {Math.round(regiao.qualidade_sinal * 100)}%)
                    </p>
                    <p style={{ margin: '3px 0', fontSize: '11px', background: activeIndicatorId === 'empregabilidade' ? '#e2e8f0' : 'transparent', padding: '2px' }}>
                      <strong>Empregabilidade:</strong> {regiao.indicadores.empregabilidade.toFixed(2)}
                    </p>
                    <p style={{ margin: '3px 0', fontSize: '11px', background: activeIndicatorId === 'saude_mental' ? '#e2e8f0' : 'transparent', padding: '2px' }}>
                      <strong>Saúde Mental:</strong> {regiao.indicadores.saude_mental.toFixed(2)}
                    </p>
                    <p style={{ margin: '3px 0', fontSize: '11px', background: activeIndicatorId === 'formacoes' ? '#e2e8f0' : 'transparent', padding: '2px' }}>
                      <strong>Formações:</strong> {regiao.indicadores.formacoes.toFixed(2)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          )
        })}
      </MapContainer>

      {/* Legenda (Bottom Right) */}
      <div className="mapa-legenda">
        <h4>{activeIndicatorId === 'saude_mental' ? 'Saúde mental - Índice' : (activeIndicatorId === 'formacoes' ? 'Formações - Índice' : 'Empregabilidade - Índice')}</h4>
        <div className="mapa-legenda-item"><span className="legenda-color very-low" style={{backgroundColor: '#ef4444'}}></span> &lt; 0.3 - Muito baixa</div>
        <div className="mapa-legenda-item"><span className="legenda-color low" style={{backgroundColor: '#f59e0b'}}></span> 0.3 a 0.6 - Baixa/Média</div>
        <div className="mapa-legenda-item"><span className="legenda-color medium" style={{backgroundColor: '#3b82f6'}}></span> 0.6 a 0.8 - Boa</div>
        <div className="mapa-legenda-item"><span className="legenda-color high" style={{backgroundColor: '#22c55e'}}></span> &gt; 0.8 - Excelente</div>
      </div>
    </div>
  )
}