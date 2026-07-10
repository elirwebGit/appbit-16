// Dentro de src/components/MapaVisent.tsx
import { MapContainer, TileLayer } from "react-leaflet";

export default function MapaVisent() {
  return (
    <MapContainer
      center={[-23.5505, -46.6333]}
      zoom={13}
      style={{ height: "100%", width: "100%", minHeight: "400px" }} // 🔥 Altura explícita obrigatória
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
