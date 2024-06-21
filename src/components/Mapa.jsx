import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa.css';
import Marcacoes from './Marcacoes';

function Mapa({ marcacoes, onImageClick }) {
  return (
    <div className="Mapa-container">
      <MapContainer center={[-25.4296, -49.2713]} zoom={12} style={{ height: '90%', width: '90%', borderRadius: '1000px', border: '5px solid #F56300' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marcacoes marcacoes={marcacoes} onImageClick={onImageClick} />
      </MapContainer>
    </div>
  );
}

export default Mapa;
