// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from 'react';
// Importa el archivo CSS para aplicar estilos al componente
import './PedidosProveedor.css';
// Importa el servicio que maneja las funcionalidades de contrato
import ContratoService from '../funcionalidades/ServicioContrato/ContratoService';

// Define el componente funcional PedidosProveedor
const PedidosProveedor = () => {
  // Estado para almacenar el término de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  // Estado para almacenar la categoría seleccionada
  const [categoria, setCategoria] = useState('');
  // Estado para mostrar más contratos en la lista
  const [mostrarMas, setMostrarMas] = useState(false);
  // Estado para almacenar la lista de contratos
  const [contratos, setContratos] = useState([]);

  // useEffect se ejecuta una vez al montar el componente
  useEffect(() => {
    // Obtiene contratos guardados usando el servicio de contratos
    const contratosGuardados = ContratoService.obtenerContratos();
    // Actualiza el estado de contratos con los contratos guardados
    setContratos(contratosGuardados);
  }, []); // El array vacío asegura que solo se ejecute al montar

  // Función para alternar la visualización de más contratos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado de mostrarMas
  };

  // Función que maneja la búsqueda de contratos
  const manejarBusqueda = () => {
    console.log('Buscando:', terminoBusqueda, 'Categoría:', categoria); // Imprime en consola los valores de búsqueda
  };

  // Función para eliminar un contrato dado su índice
  const eliminarContrato = (index) => {
    ContratoService.eliminarContrato(index); // Elimina el contrato usando el servicio
    const nuevosContratos = ContratoService.obtenerContratos(); // Obtiene la lista actualizada de contratos
    setContratos(nuevosContratos); // Actualiza el estado de contratos
  };

  // Función para mostrar los participantes de un contrato dado su índice
  const mostrarParticipantes = (indexContrato) => {
    const participantes = ContratoService.obtenerParticipantes(indexContrato); // Obtiene la lista de participantes
    // Si hay participantes, los muestra en una alerta, de lo contrario, informa que no hay
    if (participantes && participantes.length > 0) {
      alert(`Participantes: ${participantes.join(', ')}`);
    } else {
      alert('No hay participantes en este contrato.');
    }
  };

  // Decide cuántos contratos mostrar: todos o solo los primeros 4
  const contratosMostrar = mostrarMas ? contratos : contratos.slice(0, 4);

  // Renderiza el componente
  return (
    <div className="pedidos-container">
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
        {contratos.length > 4 && ( // Verifica si hay más de 4 contratos
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
