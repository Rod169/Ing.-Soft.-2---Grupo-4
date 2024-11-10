// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from 'react';
// Importa el archivo CSS para aplicar estilos al componente
import './ProductosEmpresa.css';
// Importa el servicio que maneja las funcionalidades de pedido
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService';

// Define el componente funcional ProductosEmpresa
const ProductosEmpresa = () => {
  // Estado para almacenar el término de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  // Estado para almacenar la categoría seleccionada
  const [categoria, setCategoria] = useState('');
  // Estado para mostrar más pedidos en la lista
  const [mostrarMas, setMostrarMas] = useState(false);
  // Estado para almacenar la lista de pedidos
  const [pedidos, setPedidos] = useState([]);

  // useEffect se ejecuta una vez al montar el componente
  useEffect(() => {
    // Obtiene pedidos guardados usando el servicio de pedidos
    const pedidosGuardados = PedidoService.obtenerPedidos();
    // Actualiza el estado de pedidos con los pedidos guardados
    setPedidos(pedidosGuardados);
  }, []); // El array vacío asegura que solo se ejecute al montar

  // Función para alternar la visualización de más pedidos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado de mostrarMas
  };

  // Función que maneja la búsqueda de pedidos
  const manejarBusqueda = () => {
    console.log('Buscando:', terminoBusqueda, 'Categoría:', categoria); // Imprime en consola los valores de búsqueda
  };

  // Función para eliminar un pedido dado su índice
  const eliminarPedido = (index) => {
    PedidoService.eliminarPedido(index); // Elimina el pedido usando el servicio
    const nuevosPedidos = PedidoService.obtenerPedidos(); // Obtiene la lista actualizada de pedidos
    setPedidos(nuevosPedidos); // Actualiza el estado de pedidos
  };

  // Función para mostrar los participantes de un pedido dado su índice
  const mostrarParticipantes = (indexPedido) => {
    const participantes = PedidoService.obtenerParticipantes(indexPedido); // Obtiene la lista de participantes
    // Si hay participantes, los muestra en una alerta, de lo contrario, informa que no hay
    if (participantes && participantes.length > 0) {
      alert(`Participantes: ${participantes.join(', ')}`);
    } else {
      alert('No hay participantes en este pedido.');
    }
  };

  // Decide cuántos pedidos mostrar: todos o solo los primeros 4
  const pedidosMostrar = mostrarMas ? pedidos : pedidos.slice(0, 4);

  // Renderiza el componente
  return (
    <div className="productos-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text" // Campo de texto para buscar
            placeholder="Buscar..." // Placeholder para el campo de búsqueda
            value={terminoBusqueda} // Valor del campo de búsqueda
            onChange={(e) => setTerminoBusqueda(e.target.value)} // Actualiza el estado en cada cambio
          />
          <span className="search-icon">&#128269;</span> {/* Icono de lupa */}
        </div>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Categorías</option> {/* Opción por defecto */}
          <option value="vegetales">Vegetales</option>
          <option value="granos">Granos</option>
          <option value="frutas">Frutas</option>
        </select>
        <button onClick={manejarBusqueda}>Buscar</button> {/* Botón para iniciar la búsqueda */}
      </div>

      <div className="header-productos">
        <h1 className="titulo">Productos</h1> {/* Título principal */}
        <div className="botones-header">
          <button className="btn-notificaciones" onClick={() => window.location.href = '/Notificaciones'}>
              Ver Notificaciones {/* Botón para ver notificaciones */}
          </button>
          <button className="btn-crear-pedido" onClick={() => window.location.href = '/crear-pedido'}>
              Generar pedido {/* Botón para crear un nuevo pedido */}
          </button>
        </div>
      </div>
      
      <h2 className="titulo-mis-pedidos">Mis productos</h2> {/* Título para la sección de productos */}

      <div className="productos-grid">
        {pedidosMostrar.length > 0 ? ( // Verifica si hay pedidos para mostrar
          pedidosMostrar.map((pedido, index) => ( // Mapea cada pedido a un componente
            <div key={index} className="producto-card"> {/* Tarjeta para cada pedido */}
              <img src={pedido.imagen} alt={pedido.producto} /> {/* Imagen del pedido */}
              <h3>{pedido.producto}</h3> {/* Título del producto */}
              <div className="descripcion-producto">
                <p>
                  Empresa: {pedido.empresa} {/* Muestra la empresa del pedido */}
                  <br />
                  Tipo de producto: {pedido.tipoContrato} {/* Muestra el tipo de producto */}
                  <br />
                  Cantidad: {pedido.cantidad} tn. {/* Muestra la cantidad en toneladas */}
                  <br />
                  Fecha: {pedido.fechaPublicacion} {/* Muestra la fecha de publicación */}
                </p>
              </div>
              <div className="botones-pedido">
                <button onClick={() => eliminarPedido(index)}>Eliminar pedido</button> {/* Botón para eliminar el pedido */}
                <button onClick={() => window.location.href = `/ver-participantes/${index}`}> {/* Botón para ver participantes */}
                  Ver participantes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p> // Mensaje si no hay productos
        )}
      </div>

      <div className="ver-mas-container">
        {pedidos.length > 4 && ( // Verifica si hay más de 4 pedidos
          <button className="ver-mas" onClick={alternarMostrarMas}> {/* Botón para ver más pedidos */}
            {mostrarMas ? 'Ver menos' : 'Ver más'} {/* Cambia el texto del botón según el estado */}
          </button>
        )}
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default ProductosEmpresa;
