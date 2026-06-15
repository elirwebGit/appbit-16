import { Fragment } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
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

// Dados do Eixo Sudeste alinhados perfeitamente com o Terminal de IA
const dadosRegioes = [
  {
    id: 1,
    nome: "São Paulo - Zona Sul",
    posicao: [-23.6544, -46.6611] as [number, number],
    cobertura: "3G / Sinal Escasso",
    densidade: "Alta (85k pessoas)",
    empregabilidade: "0.42 (Baixa)",
    status: "critico"
  },
  {
    id: 2,
    nome: "Rio de Janeiro - Centro",
    posicao: [-22.9035, -43.1729] as [number, number],
    cobertura: "5G / Excelente",
    densidade: "Média (120k pessoas)",
    empregabilidade: "0.78 (Alta)",
    status: "estavel"
  }
]

export default function MapaVisent() {
  // Centro estratégico entre SP e RJ para os dois aparecerem na tela ao mesmo tempo
  const posicaoCentro: [number, number] = [-23.30, -45.30]

  return (
    <MapContainer 
      center={posicaoCentro} 
      zoom={7} // Zoom reduzido para capturar o eixo SP-RJ na mesma visão
      style={{ height: '100%', width: '100%' }}
    >
      {/* Camada do mapa com estilo escuro (CartoDB Dark Matter) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {dadosRegioes.map((regiao) => {
        // Define a cor da mancha com base no status do MVP
        const corIndicador = regiao.status === 'critico' ? '#ef4444' : '#22c55e';

        return (
          <Fragment key={regiao.id}>
            {/* Círculo indicador de cobertura e vulnerabilidade social */}
            <Circle
              center={regiao.posicao}
              radius={28000} // Tamanho da mancha no mapa
              pathOptions={{
                color: corIndicador,
                fillColor: corIndicador,
                fillOpacity: 0.25,
                weight: 1.5
              }}
            />

            {/* Marcador Interativo */}
            <Marker position={regiao.posicao} icon={IconeCustomizado}>
              <Popup>
                <div style={{ color: '#000', fontFamily: 'sans-serif', minWidth: '160px' }}>
                  <strong style={{ fontSize: '13px', color: '#1e293b' }}>{regiao.nome}</strong>
                  <hr style={{ margin: '5px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
                  
                  <p style={{ margin: '3px 0', fontSize: '11px' }}>
                    <strong>População:</strong> {regiao.densidade}
                  </p>
                  <p style={{ margin: '3px 0', fontSize: '11px' }}>
                    <strong>Sinal Móvel:</strong> {regiao.cobertura}
                  </p>
                  <p style={{ margin: '3px 0', fontSize: '11px' }}>
                    <strong>Empregabilidade:</strong> {regiao.empregabilidade}
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