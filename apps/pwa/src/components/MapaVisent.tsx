import { Fragment, useEffect, useState } from 'react'
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

import type { RegiaoMapa } from '../types/visent'
import { getRegionsForMap } from '../services/api'

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

export default function MapaVisent() {
  const [dadosRegioes, setDadosRegioes] = useState<RegiaoMapa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Centro estratégico entre SP e RJ para os dois aparecerem na tela ao mesmo tempo
  const posicaoCentro: [number, number] = [-23.30, -45.30]

  useEffect(() => {
    let active = true
    getRegionsForMap()
      .then((data) => {
        if (active) {
          setDadosRegioes(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (active) {
          console.error("Erro ao carregar dados do mapa:", err)
          setError("Não foi possível carregar as informações do mapa.")
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#38bdf8',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #1e293b',
          borderTop: '4px solid #38bdf8',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '12px'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <span>Carregando dados das regiões...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#ef4444',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <strong style={{ fontSize: '16px' }}>Erro ao Carregar Mapa</strong>
          <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mapa-container">
      <MapContainer 
        center={posicaoCentro} 
        zoom={7} // Zoom reduzido para capturar o eixo SP-RJ na mesma visão
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <MapResizer />
        {/* Camada do mapa com estilo escuro (CartoDB Dark Matter) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {dadosRegioes.map((regiao) => {
          // Define a cor da mancha com base no status do MVP
          const corIndicador = regiao.indicadores.empregabilidade < 0.5 ? '#ef4444' : '#22c55e';

          return (
            <Fragment key={regiao.regiao}>
              {/* Círculo indicador de cobertura e vulnerabilidade social */}
              <Circle
                center={[regiao.lat, regiao.lng]}
                radius={28000} // Tamanho da mancha no mapa
                pathOptions={{
                  color: corIndicador,
                  fillColor: corIndicador,
                  fillOpacity: 0.25,
                  weight: 1.5
                }}
              />

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
                    <p style={{ margin: '3px 0', fontSize: '11px' }}>
                      <strong>Empregabilidade:</strong> {regiao.indicadores.empregabilidade}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          )
        })}
      </MapContainer>

      {/* Map Sidebar (Left) */}
      <div className="mapa-sidebar">
        <div className="mapa-sidebar-section">
          <div className="mapa-sidebar-title">
            <div className="mapa-icon orange"></div>
            <h3>Regiões</h3>
          </div>
          <div className="mapa-sidebar-item fw-bold">Brasil</div>
          <div className="mapa-sidebar-item checkbox">São Paulo</div>
          <div className="mapa-sidebar-item checkbox">Rio de Janeiro</div>
          <div className="mapa-sidebar-item fw-bold">Angola</div>
          <div className="mapa-sidebar-item checkbox">Luanda</div>
          <button className="mapa-btn-add">Adicionar Região</button>
        </div>

        <div className="mapa-sidebar-section">
          <div className="mapa-sidebar-title">
            <div className="mapa-icon green"></div>
            <h3>Indicadores</h3>
          </div>
          <div className="mapa-sidebar-item"><div className="mapa-dot green"></div> Saúde mental</div>
          <div className="mapa-sidebar-item"><div className="mapa-dot outline"></div> Empregabilidade</div>
          <div className="mapa-sidebar-item"><div className="mapa-dot outline"></div> Formações</div>
        </div>
      </div>

      {/* Histórico (Bottom Left) */}
      <div className="mapa-historico">
        <div className="mapa-icon yellow"></div>
        <h3>Histórico</h3>
      </div>

      {/* Insights (Bottom Center) */}
      <div className="mapa-insights">
        <div className="mapa-insights-header">
          <h3>Insights</h3>
          <button className="mapa-btn-exportar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V3M12 15L8 11M12 15L16 11M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exportar
          </button>
        </div>
        <div className="mapa-insights-content">
          <img src="/img/insights-placeholder.png" alt="Gráfico Insights" className="mapa-insights-chart" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1053x129'; }} />
        </div>
      </div>

      {/* Legenda (Bottom Right) */}
      <div className="mapa-legenda">
        <h4>Saúde mental - Índice</h4>
        <div className="mapa-legenda-item"><span className="legenda-color very-low"></span> &lt; XX - Muito baixa</div>
        <div className="mapa-legenda-item"><span className="legenda-color low"></span> &lt;X Baixa</div>
        <div className="mapa-legenda-item"><span className="legenda-color medium"></span> &gt;X Média</div>
        <div className="mapa-legenda-item"><span className="legenda-color high"></span> &gt; XX Muito alta</div>
      </div>
    </div>
  )
}