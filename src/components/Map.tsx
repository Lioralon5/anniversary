import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => (
  <MapContainer center={[latitude, longitude]} zoom={5} style={{ height: '100vh', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  </MapContainer>
);
export default Map;
