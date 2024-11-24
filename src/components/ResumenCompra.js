import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResumenCompra.css';

const ResumenCompra = () => {
  const location = useLocation(); // Obtiene el estado de la navegación
  const navigate = useNavigate();
  const producto = location.state?.producto || {}; // Extrae el producto del estado, o un objeto vacío si no existe

  // Fórmula para calcular el precio
  const calcularPrecio = (cantidad, categoria) => {
    const tasas = {
      frutas: 2.1,
      vegetales: 1.7,
      granos: 1.2,
    };
    return cantidad * (tasas[categoria?.toLowerCase()] || 0);
  };

  // Calcula costos
  const precioTotal = calcularPrecio(producto.cantidad, producto.categoria);
  const envio = producto.tipoEnvio === 'programado' ? 30 : 0; // Envío programado: 30 soles, recojo en tienda: gratis
  const subtotal = precioTotal;
  const igv = subtotal * 0.18; // 18% de IGV
  const total = subtotal + envio + igv;

  return (
    <div className="resumen-compra-container">
      <h1 className="titulo-resumen">Resumen de Compra</h1>
      <div className="resumen-content">
        {/* Sección izquierda: Detalles del producto */}
        <div className="resumen-izquierda">
          <img
            src={producto.imagen}
            alt={producto.producto}
            className="resumen-imagen"
          />
          <div className="resumen-info">
            <p>
              <strong>Producto:</strong> {producto.producto}
            </p>
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p>
              <strong>Cantidad:</strong> {producto.cantidad} kg
            </p>
            <p>
              <strong>Precio Total:</strong> S/. {precioTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Sección derecha: Resumen del pedido */}
        <div className="resumen-derecha">
          <h2 className="titulo-resumen-pedido">Resumen del Pedido</h2>
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
            <button
              className="boton-confirmar"
              onClick={() => navigate('/pasarela-pago', { state: { producto } })}
            >
              Pasar por caja
            </button>
            <button
              className="boton-cancelar"
              onClick={() => navigate('/productos-cliente')}
            >
              Cancelar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
