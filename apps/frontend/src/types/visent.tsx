import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Definição da interface para os dados das antenas
export interface AntenaVisent {
  ecgi: string;
  lat: number;
  lon: number;
  cluster: string;
  municipio: string;
}

// Correção definitiva para os ícones do Leaflet no build de produção
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const IconeAntena = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [20, 32],
  iconAnchor: [10, 32],
})

// Simulando dados reais do 'antenas_flp.csv' (132 antenas no total)
const mockAntenas: AntenaVisent[] = [
  { ecgi: "7240511111", lat: -27.5948, lon: -48.5569, cluster: "Centro_Floripa", municipio: "Florianópolis" },
  { ecgi: "7240522222", lat: -27.6012, lon: -48.5204, cluster: "Trindade_UFSC", municipio: "Florianópolis" },
  { ecgi: "7240533333", lat: -27.4389, lon: -48.4623, cluster: "Jurere_Internacional", municipio: "Florianópolis" },
  { ecgi: "7240544444", lat: -27.6985, lon: -48.5132, cluster: "Aeroporto_Sul", municipio: "Florianópolis" }
]

// Estilo do container isolado para manter o JSX limpo
const containerStyle: React.CSSProperties = {
  height: "100%",
  width: "100%"
}

export default function MapaVisent() {
  const posicaoCentro: [number, number] = [-27.5948, -48.5569]

  return (
    <MapContainer
      center={posicaoCentro} 
      zoom={11} 
      style={containerStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Mapeando a lista de antenas e renderizando cada uma na tela */}
      {mockAntenas.map((antena) => (
        <Marker 
          key={antena.ecgi} 
          position={[antena.lat, antena.lon]} 
          icon={IconeAntena}
        >
          <Popup>
            <div style={{ color: '#0f172a', fontSize: '13px', fontFamily: 'sans-serif' }}>
              <strong style={{ color: '#0284c7', fontSize: '14px' }}>Estação Vísent (ERB)</strong><br />
              <span style={{ display: 'block', marginTop: '5px' }}><strong>ID:</strong> {antena.ecgi}</span>
              <span><strong>Região:</strong> {antena.cluster}</span><br />
              <span><strong>Cidade:</strong> {antena.municipio}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}