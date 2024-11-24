import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PasarelaPago.css';
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService'; // Importa el servicio para gestionar pedidos

const PasarelaPago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto || {}; // Obtener datos del producto
  const indexProducto = location.state?.index; // Obtener índice del producto

  const [datosPago, setDatosPago] = useState({
    titular: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: '',
    tipoTarjeta: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPago({
      ...datosPago,
      [name]: value,
    });
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setDatosPago({
        ...datosPago,
        cvv: value,
      });
    }
  };

  const handleNumeroTarjetaChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d{0,16}$/.test(value)) {
      setDatosPago({
        ...datosPago,
        numeroTarjeta: value,
      });
    }
  };

  const calcularPrecio = (cantidad, categoria) => {
    const tasas = {
      frutas: 2.1,
      vegetales: 1.7,
      granos: 1.2,
    };
    return cantidad * (tasas[categoria.toLowerCase()] || 0);
  };

  const precioTotal = calcularPrecio(producto.cantidad, producto.categoria);
  const envio = producto.tipoEnvio === 'programado' ? 15 : 0;
  const subtotal = precioTotal;
  const igv = subtotal * 0.18;
  const total = subtotal + envio + igv;

  const handleConfirmarPago = () => {
    try {
      PedidoService.eliminarPedidoPorId(producto.id); // Elimina de cliente
      PedidoService.eliminarPedidoEmpresaPorId(producto.id); // Elimina de empresa

      alert('Pago confirmado'); // Mensaje de confirmación
      navigate('/productos-cliente'); // Redirige a la página de productos cliente
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Ocurrió un problema al procesar el pago.');
    }
  };

  const handlePagoAlternativo = () => {
    navigate('/pago-alternativo', { state: { producto, index: indexProducto } });
  };

  return (
    <div className="pasarela-container">
      {/* Sección izquierda */}
      <div className="pasarela-izquierda">
        <h2 className="pasarela-titulo">Detalles de Pago</h2>
        <form className="formulario-pago">
          <label htmlFor="titular">Nombre del Titular</label>
          <input
            type="text"
            id="titular"
            name="titular"
            value={datosPago.titular}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
          />

          <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
          <input
            type="text"
            id="numeroTarjeta"
            name="numeroTarjeta"
            value={datosPago.numeroTarjeta}
            onChange={handleNumeroTarjetaChange}
            placeholder="Ej. 1234567890123456"
          />

          <div className="campo-doble">
            <div className="campo-vencimiento">
              <label htmlFor="vencimiento">Fecha de Vencimiento</label>
              <input
                type="month"
                id="vencimiento"
                name="vencimiento"
                value={datosPago.vencimiento}
                onChange={handleChange}
              />
            </div>

            <div className="campo-cvv">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={datosPago.cvv}
                onChange={handleCvvChange}
                placeholder="Ej. 123"
              />
            </div>
          </div>

          <label htmlFor="tipoTarjeta">Tipo de Tarjeta</label>
          <select
            id="tipoTarjeta"
            name="tipoTarjeta"
            value={datosPago.tipoTarjeta}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="bcp">BCP</option>
            <option value="amex">Amex</option>
          </select>
        </form>

        <div className="iconos-tarjetas">
          <img src={process.env.PUBLIC_URL + '/visa.png'} alt="Visa" />
          <img src={process.env.PUBLIC_URL + '/mastercard.png'} alt="Mastercard" />
          <img src={process.env.PUBLIC_URL + '/bcp.png'} alt="BCP" />
          <img src={process.env.PUBLIC_URL + '/americanexpress.png'} alt="Amex" />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="pasarela-derecha">
        <h2 className="pasarela-titulo">Resumen del Pedido</h2>
        <p>Hay 1 artículo(s) en su carrito.</p>
        <p>
          <strong>Subtotal:</strong> S/. {subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Envío:</strong> S/. {envio.toFixed(2)}
        </p>
        <p>
          <strong>IGV:</strong> S/. {igv.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> S/. {total.toFixed(2)}
        </p>
        <div className="resumen-acciones">
          <button className="boton-confirmar" onClick={handleConfirmarPago}>
            Confirmar Pago
          </button>
          <button className="boton-otro-metodo" onClick={handlePagoAlternativo}>
            Pagar con otro método
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasarelaPago;
