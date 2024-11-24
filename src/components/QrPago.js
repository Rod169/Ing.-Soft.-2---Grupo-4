import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './QrPago.css';
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService';

const QrPago = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state?.producto || {};

  if (!producto?.id) {
    alert('El producto no tiene un ID válido.');
    navigate('/productos-cliente');
    return null;
  }

  const qrData = `Pago-${producto.id}-${Math.random().toString(36).substring(2, 15)}`;

  const handleConfirmarPago = () => {
    try {
      PedidoService.eliminarPedidoPorId(producto.id);
      PedidoService.eliminarPedidoEmpresaPorId(producto.id);

      alert('Pago confirmado');
      navigate('/productos-cliente');
    } catch (error) {
      alert('Error al procesar el pago.');
    }
  };

  return (
    <div className="qr-container">
      <h2>Escanea el código QR para completar el pago</h2>
      <div className="qr-code">
        <QRCodeCanvas value={qrData} size={200} />
      </div>
      <button className="btn-confirmar" onClick={handleConfirmarPago}>
        Confirmar Pago
      </button>
    </div>
  );
};

export default QrPago;
