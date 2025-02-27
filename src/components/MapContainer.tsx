import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Gallery from "./Gallery";

const locations = [
    { id: 1, lat: 40.7128, lng: -74.0060, photos: ['photo1.jpg', 'photo2.jpg'] },
    { id: 2, lat: 34.0522, lng: -118.2437, photos: ['photo3.jpg'] },
  ];
  
  return (
    <MapContainer center={[latitude, longitude]} zoom={5}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <Gallery photos={loc.photos} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
  