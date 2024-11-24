import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import './ProductosCliente.css'; // Importa el archivo de estilos CSS
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService'; // Importa el servicio para gestionar pedidos
import useBusqueda from '../funcionalidades/Busqueda/useBusqueda'; // Importa el hook personalizado de búsqueda

const ProductosCliente = () => {
  const [pedidos, setPedidos] = useState([]); // Estado para manejar la lista de pedidos
  const { terminoBusqueda, setTerminoBusqueda, categoriaSeleccionada, setCategoriaSeleccionada, datosFiltrados, filtrarPorCategoria } = useBusqueda(pedidos); // Hook personalizado de búsqueda
  const [mostrarMas, setMostrarMas] = useState(false); // Estado para manejar la visualización de más pedidos
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Efecto para cargar los pedidos al montar el componente
  useEffect(() => {
    const pedidosGuardados = PedidoService.obtenerPedidos(); // Obtiene la lista de pedidos desde el servicio
    setPedidos(pedidosGuardados); // Actualiza el estado con los pedidos obtenidos
  }, []); // Array vacío asegura que solo se ejecute al montar el componente

  // Función para alternar la visualización de más pedidos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado mostrarMas
  };

  // Función para redirigir a la vista de ResumenCompra
  const adquirirProducto = (indexPedido) => {
    const productoSeleccionado = datosFiltrados[indexPedido]; // Obtiene el producto seleccionado
    navigate('/resumen-compra', { state: { producto: productoSeleccionado, index: indexPedido } }); // Navega a la vista de resumen de compra
  };

  // Determina qué pedidos mostrar: todos o solo los primeros 4
  const pedidosMostrar = mostrarMas ? datosFiltrados : datosFiltrados.slice(0, 4);

  return (
    <div className="productos-container"> {/* Contenedor principal del componente */}
      <div className="search-container"> {/* Contenedor de la barra de búsqueda */}
        <div className="search-bar"> {/* Barra de búsqueda */}
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
