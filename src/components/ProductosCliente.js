import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import './ProductosCliente.css'; // Importa el archivo de estilos CSS
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService'; // Importa el servicio para gestionar pedidos
import useBusqueda from '../funcionalidades/Busqueda/useBusqueda'; // Importa el hook personalizado de búsqueda

// Definición del componente funcional ProductosCliente
const ProductosCliente = () => {
  // Estado para manejar la lista de pedidos
  const [pedidos, setPedidos] = useState([]);
  // Uso del hook personalizado de búsqueda
  const {
    terminoBusqueda,
    setTerminoBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    datosFiltrados,
    filtrarPorCategoria
  } = useBusqueda(pedidos);
  // Estado para manejar la visualización de más pedidos
  const [mostrarMas, setMostrarMas] = useState(false);

  const navigate = useNavigate(); // Hook para manejar la navegación

  // Obtenemos el correo del usuario logueado desde localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Recupera el usuario logueado
  const correoUsuario = loggedInUser?.email || ''; // Almacena el correo del usuario logueado o cadena vacía

  useEffect(() => {
    const pedidosGuardados = PedidoService.obtenerPedidos(); // Obtiene la lista de pedidos desde el servicio
    setPedidos(pedidosGuardados); // Actualiza el estado con los pedidos obtenidos
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  // Función para alternar la visualización de más pedidos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado mostrarMas a su valor opuesto
  };

  // Función para redirigir a la vista de ResumenCompra con los detalles del producto
  const adquirirProducto = (indexPedido) => {
    const productoSeleccionado = datosFiltrados[indexPedido]; // Obtén el producto seleccionado
    navigate('/resumen-compra', { state: { producto: productoSeleccionado } }); // Navega a la vista de resumen de compra con el producto
  };

  // Determina qué pedidos mostrar: todos o solo los primeros 4
  const pedidosMostrar = mostrarMas ? datosFiltrados : datosFiltrados.slice(0, 4);

  return (
    <div className="productos-container"> {/* Contenedor principal del componente */}
      <div className="search-container"> {/* Contenedor de la barra de búsqueda */}
        <div className="search-bar"> {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar..." // Texto de sugerencia
            value={terminoBusqueda} // Valor del input controlado por el estado
            onChange={(e) => setTerminoBusqueda(e.target.value)} // Actualiza el estado al cambiar el valor
          />
          <span className="search-icon">&#128269;</span> {/* Icono de búsqueda */}
        </div>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}> {/* Selector de categorías */}
          <option value="">Categorías</option> {/* Opción por defecto */}
          <option value="vegetales">Vegetales</option> {/* Opción de categoría */}
          <option value="granos">Granos</option> {/* Opción de categoría */}
          <option value="frutas">Frutas</option> {/* Opción de categoría */}
        </select>
        <button onClick={filtrarPorCategoria}>Buscar</button> {/* Botón para ejecutar el filtrado */}
      </div>

      <div className="header-productos"> {/* Encabezado de la sección de productos */}
        <h1 className="titulo">Productos</h1> {/* Título principal */}
        <button className="btn-ver-pedidos"> {/* Botón para ver pedidos */}
          Ver pedidos
        </button>
      </div>
      <h2 className="titulo-productos-destacados">Productos Destacados</h2> {/* Título para productos destacados */}

      <div className="productos-grid"> {/* Contenedor para la cuadrícula de productos */}
        {pedidosMostrar.length > 0 ? ( // Comprueba si hay pedidos para mostrar
          pedidosMostrar.map((pedido, index) => ( // Mapea cada pedido a un componente de tarjeta
            <div key={index} className="producto-card"> {/* Tarjeta de pedido */}
              <img src={pedido.imagen} alt={pedido.producto} /> {/* Imagen del producto */}
              <h3>{pedido.producto}</h3> {/* Título del producto */}
              <div className="descripcion-producto"> {/* Descripción del producto */}
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
              <div className="acciones-producto"> {/* Contenedor para las acciones del producto */}
                <button onClick={() => adquirirProducto(index)}>Adquirir</button> {/* Botón para adquirir */}
                <button onClick={() => alert(`Participantes: ${PedidoService.obtenerParticipantes(index).join(', ')}`)}> {/* Botón para ver participantes */}
                  Ver participantes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p> // Mensaje si no hay productos
        )}
      </div>

      <div className="ver-mas-container"> {/* Contenedor para el botón "Ver más" */}
        {datosFiltrados.length > 4 && ( // Solo muestra el botón si hay más de 4 pedidos
          <button className="ver-mas" onClick={alternarMostrarMas}>
            {mostrarMas ? 'Ver menos' : 'Ver más'} {/* Cambia el texto del botón según el estado mostrarMas */}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductosCliente; // Exporta el componente para su uso en otras partes de la aplicación
