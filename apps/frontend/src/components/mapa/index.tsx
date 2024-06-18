import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapaVet: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [vetCenters, setVetCenters] = useState<any[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchVetCenters(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchVetCenters = async (latitude: number, longitude: number) => {
    const query = `
      [out:json];
      (
        node["amenity"="veterinary"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
        way["amenity"="veterinary"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
        relation["amenity"="veterinary"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
      );
      out center;
    `;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    const data = await response.json();
    setVetCenters(data.elements);
  };

  return (
    <div>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
          {vetCenters.map((center, idx) => (
            <Marker
              key={idx}
              position={
                center.lat && center.lon
                  ? [center.lat, center.lon]
                  : [center.center.lat, center.center.lon]
              }
              icon={L.icon({
                iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
              })}
            >
              <Popup>{center.tags.name || 'Veterinary Center'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapaVet;
