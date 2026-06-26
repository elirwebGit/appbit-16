import { Fragment, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Importação do CSS essencial do Leaflet
import 'leaflet/dist/leaflet.css'

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
    <MapContainer 
      center={posicaoCentro} 
      zoom={7} // Zoom reduzido para capturar o eixo SP-RJ na mesma visão
      style={{ height: '100%', width: '100%' }}
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
  )
}