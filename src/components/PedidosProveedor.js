import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import './PedidosProveedor.css'; // Importa el archivo de estilos CSS
import ContratoService from '../funcionalidades/ServicioContrato/ContratoService'; // Importa el servicio que maneja las funcionalidades de contrato
import useBusqueda from '../funcionalidades/Busqueda/useBusqueda'; // Importa el hook personalizado de búsqueda

const PedidosProveedor = () => {
  // Estado para manejar la lista de contratos
  const [contratos, setContratos] = useState([]);
  // Uso del hook personalizado de búsqueda
  const {
    terminoBusqueda,
    setTerminoBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    datosFiltrados,
    filtrarPorCategoria
  } = useBusqueda(contratos);
  // Estado para manejar la visualización de más contratos
  const [mostrarMas, setMostrarMas] = useState(false);

  useEffect(() => {
    const contratosGuardados = ContratoService.obtenerContratos(); // Obtiene la lista de contratos desde el servicio
    setContratos(contratosGuardados); // Actualiza el estado con los contratos obtenidos
  }, []);

  // Función para alternar la visualización de más contratos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado mostrarMas
  };

  // Función para eliminar un contrato dado su índice
  const eliminarContrato = (index) => {
    ContratoService.eliminarContrato(index); // Elimina el contrato usando el servicio
    const nuevosContratos = ContratoService.obtenerContratos(); // Obtiene la lista actualizada de contratos
    setContratos(nuevosContratos); // Actualiza el estado de contratos
  };

  // Decide cuántos contratos mostrar: todos o solo los primeros 4
  const contratosMostrar = mostrarMas ? datosFiltrados : datosFiltrados.slice(0, 4);

  return (
    <div className="pedidos-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text" // Campo de texto para buscar
            placeholder="Buscar..." // Placeholder para el campo de búsqueda
            value={terminoBusqueda} // Valor del input controlado por el estado
            onChange={(e) => setTerminoBusqueda(e.target.value)} // Actualiza el estado al cambiar el valor
          />
          <span className="search-icon">&#128269;</span> {/* Icono de lupa */}
        </div>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Categorías</option> {/* Opción por defecto */}
          <option value="vegetales">Vegetales</option>
          <option value="granos">Granos</option>
          <option value="frutas">Frutas</option>
        </select>
        <button onClick={filtrarPorCategoria}>Buscar</button> {/* Botón para iniciar la búsqueda */}
      </div>

      <div className="header-pedidos">
        <h1 className="titulo">Pedidos</h1> {/* Título principal */}
        <div className="botones-header">
          <button className="btn-notificaciones" onClick={() => window.location.href = '/Notificaciones'}>
              Ver Notificaciones {/* Botón para ver notificaciones */}
          </button>
          <button className="btn-crear-contrato" onClick={() => window.location.href = '/crear-contrato'}>
              Crear contrato {/* Botón para crear un nuevo contrato */}
          </button>
        </div>
      </div>
      
      <h2 className="titulo-mis-contratos">Mis contratos</h2> {/* Título para la sección de contratos */}

      <div className="productos-grid">
        {contratosMostrar.length > 0 ? ( // Verifica si hay contratos para mostrar
          contratosMostrar.map((contrato, index) => ( // Mapea cada contrato a un componente
            <div key={index} className="producto-card"> {/* Tarjeta para cada contrato */}
              <img src={contrato.imagen} alt={contrato.producto} /> {/* Imagen del contrato */}
              <h3>{contrato.producto}</h3> {/* Título del producto */}
              <div className="descripcion-producto">
                <p>
                  Empresa: {contrato.empresa} {/* Muestra la empresa del contrato */}
                  <br />
                  Tipo de contrato: {contrato.tipoContrato} {/* Muestra el tipo de contrato */}
                  <br />
                  Cantidad: {contrato.cantidad} tn. {/* Muestra la cantidad en toneladas */}
                  <br />
                  Fecha: {contrato.fechaPublicacion} {/* Muestra la fecha de publicación */}
                </p>
              </div>
              <div className="botones-contrato">
                <button onClick={() => eliminarContrato(index)}>Eliminar contrato</button> {/* Botón para eliminar el contrato */}
                <button onClick={() => window.location.href = `/firmar-contrato/${index}`}> {/* Botón para ver participantes */}
                  Ver participantes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay contratos disponibles.</p> // Mensaje si no hay contratos
        )}
      </div>

      <div className="ver-mas-container">
        {datosFiltrados.length > 4 && ( // Verifica si hay más de 4 contratos
          <button className="ver-mas" onClick={alternarMostrarMas}> {/* Botón para ver más contratos */}
            {mostrarMas ? 'Ver menos' : 'Ver más'} {/* Cambia el texto del botón según el estado */}
          </button>
        )}
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default PedidosProveedor;
