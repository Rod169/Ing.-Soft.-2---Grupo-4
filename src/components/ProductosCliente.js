import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './ProductosCliente.css'; // Importa el archivo de estilos CSS
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService'; // Importa el servicio para gestionar pedidos
import useBusqueda from '../funcionalidades/Busqueda/useBusqueda'; // Importa el hook personalizado de búsqueda

// Definición del componente funcional ProductosCliente
const ProductosCliente = () => {
  const [pedidos, setPedidos] = useState([]);
  const {
    terminoBusqueda,
    setTerminoBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    datosFiltrados,
    filtrarPorCategoria,
  } = useBusqueda(pedidos);
  const [mostrarMas, setMostrarMas] = useState(false);

  // Hook de navegación
  const navigate = useNavigate();

  // Obtenemos el correo del usuario logueado desde localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const correoUsuario = loggedInUser?.email || '';

  useEffect(() => {
    const pedidosGuardados = PedidoService.obtenerPedidos();
    setPedidos(pedidosGuardados);
  }, []);

  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas);
  };

  const adquirirProducto = (indexPedido) => {
    const productoSeleccionado = datosFiltrados[indexPedido];

    PedidoService.registrarParticipacion(indexPedido, correoUsuario);
    alert(`Has adquirido el producto ${productoSeleccionado.producto}`);

    // Redirige a la página CompraPedido y pasa los datos del producto seleccionado
    navigate('/compra-pedido', { state: { carrito: [productoSeleccionado] } });
  };

  const pedidosMostrar = mostrarMas ? datosFiltrados : datosFiltrados.slice(0, 4);

  return (
    <div className="productos-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
          <span className="search-icon">&#128269;</span>
        </div>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Categorías</option>
          <option value="vegetales">Vegetales</option>
          <option value="granos">Granos</option>
          <option value="frutas">Frutas</option>
        </select>
        <button onClick={filtrarPorCategoria}>Buscar</button>
      </div>

      <div className="header-productos">
        <h1 className="titulo">Productos</h1>
        <button className="btn-ver-pedidos">Ver pedidos</button>
      </div>
      <h2 className="titulo-productos-destacados">Productos Destacados</h2>

      <div className="productos-grid">
        {pedidosMostrar.length > 0 ? (
          pedidosMostrar.map((pedido, index) => (
            <div key={index} className="producto-card">
              <img src={pedido.imagen} alt={pedido.producto} />
              <h3>{pedido.producto}</h3>
              <div className="descripcion-producto">
                <p>
                  Empresa: {pedido.empresa}
                  <br />
                  Tipo de pedido: {pedido.tipoPedido}
                  <br />
                  Cantidad: {pedido.cantidad} kg
                  <br />
                  Fecha: {pedido.fechaPublicacion}
                </p>
              </div>
              <div className="acciones-producto">
                <button onClick={() => adquirirProducto(index)}>Adquirir</button>
                <button onClick={() => alert(`Participantes: ${PedidoService.obtenerParticipantes(index).join(', ')}`)}>
                  Ver participantes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      <div className="ver-mas-container">
        {datosFiltrados.length > 4 && (
          <button className="ver-mas" onClick={alternarMostrarMas}>
            {mostrarMas ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductosCliente;
