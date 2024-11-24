import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PagoAlternativo.css';

const PagoAlternativo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state?.producto || {}; // Obtener el producto seleccionado

  // Validar si el producto tiene un ID válido
  if (!producto?.id) {
    alert('El producto no tiene un ID válido.');
    navigate('/productos-cliente');
    return null;
  }

  // Función para manejar el pago con Yape
  const handlePagoConYape = () => {
    navigate('/qr-pago', { state: { producto } });
  };

  // Función para manejar el pago con Plin
  const handlePagoConPlin = () => {
    navigate('/qr-pago', { state: { producto } });
  };

  return (
    <div className="pago-alternativo-container">
      <h1>Selecciona tu método de pago</h1>
      <div className="metodos-pago">
        <div className="metodo-pago">
          <img
            src={process.env.PUBLIC_URL + '/yape.png'}
            alt="Pago con Yape"
            className="icono-metodo"
          />
          <button onClick={handlePagoConYape} className="btn-pago">
            Pagar con Yape
          </button>
        </div>
        <div className="metodo-pago">
          <img
            src={process.env.PUBLIC_URL + '/plin.png'}
            alt="Pago con Plin"
            className="icono-metodo"
          />
          <button onClick={handlePagoConPlin} className="btn-pago">
            Pagar con Plin
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoAlternativo;
