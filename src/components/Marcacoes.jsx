import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';

function Marcacoes({ marcacoes, onImageClick }) {
  return (
    <>
      {marcacoes.map((marcacao, index) => (
        <CircleMarker key={index} center={marcacao.position} fillColor="orange" color="orange">
          <Popup>
            <img
              src={marcacao.imagem}
              alt="Animal Encontrado"
              style={{ maxWidth: '100%', cursor: 'pointer' }}
              onClick={() => onImageClick(marcacao.imagem)}
            />
            <p>{marcacao.position[0]}</p>
            <p>{marcacao.position[1]}</p>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

export default Marcacoes;
