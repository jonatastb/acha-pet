import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Formulario.css';

function Formulario({ onFormSubmit }) {
  const [endereco, setEndereco] = useState('');
  const [imagem, setImagem] = useState(null);
  const imagemRef = useRef(null);

  const handleEnderecoChange = (event) => {
    setEndereco(event.target.value);
  };

  const handleImagemChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Envia a requisição para a API do Nominatim para obter as coordenadas
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}&limit=1`);
      
      if (response.data.length === 0) {
        throw new Error('Endereço não encontrado. Por favor, insira um endereço válido.');
      }

      const { lat, lon } = response.data[0];
      
      // Chama a função de callback com as coordenadas e a imagem
      const formData = new FormData();
      formData.append('latitude', lat);
      formData.append('longitude', lon);
      formData.append('imagem', imagem);
      onFormSubmit(formData);

      // Limpa o estado do formulário
      setEndereco('');
      setImagem(null);
      if (imagemRef.current) {
        imagemRef.current.value = '';
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="Formulario-container">
      <h2 style={{color: '#F56300', textAlign: 'center'}}>Registrar Animal Perdido</h2>
      <form onSubmit={handleSubmit} style={{margin: '10px'}}>
        <div style={{width: '95%'}}>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            className="Formulario-input"
            value={endereco}
            onChange={handleEnderecoChange}
            required
          />
        </div>
        <div style={{width: '95%'}}>
          <label htmlFor="imagem">Imagem:</label>
          <input
            type="file"
            id="imagem"
            className="Formulario-input"
            accept="image/*"
            onChange={handleImagemChange}
            ref={imagemRef}
            required
          />
        </div>
        <button type="submit" style={{background: '#F56300', color: 'white', width: '100%'}} className="Formulario-button">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
