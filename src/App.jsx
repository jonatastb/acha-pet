import React, { useState } from 'react';
import Mapa from './components/Mapa';
import Formulario from './components/Formulario';

function App() {
  const [marcacoes, setMarcacoes] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleFormSubmit = (formData) => {
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Por favor, insira uma latitude e longitude válidas.');
      return;
    }

    const novaMarcacao = {
      position: [latitude, longitude],
      imagem: URL.createObjectURL(formData.get('imagem')),
      localizacao: formData.get('endereco')
    };

    setMarcacoes([...marcacoes, novaMarcacao]);
  };

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div id="container">
      <h1 style={{color: '#F56300'}}>AchaPet em Curitiba</h1>
      <Mapa marcacoes={marcacoes} onImageClick={handleImageClick} />
      <Formulario onFormSubmit={handleFormSubmit} />
      {expandedImage && (
        <div className="expanded-image-container" onClick={handleCloseExpandedImage}>
          <img src={expandedImage} alt="Animal Encontrado" className="expanded-image" />
        </div>
      )}
    </div>
  );
}

export default App;
