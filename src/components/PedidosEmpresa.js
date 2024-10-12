import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import './PedidosEmpresa.css'; // Importa el archivo de estilos CSS
import ContratoService from '../funcionalidades/ServicioContrato/ContratoService'; // Importa el servicio para gestionar contratos

// Definición del componente funcional PedidosEmpresa
const PedidosEmpresa = () => {
  // Definición de estados utilizando useState
  const [terminoBusqueda, setTerminoBusqueda] = useState(''); // Estado para almacenar el término de búsqueda
  const [categoria, setCategoria] = useState(''); // Estado para almacenar la categoría seleccionada
  const [mostrarMas, setMostrarMas] = useState(false); // Estado para alternar la visualización de más contratos
  const [contratos, setContratos] = useState([]); // Estado para almacenar la lista de contratos

  // Obtenemos el correo del usuario logueado desde localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Recupera el usuario logueado
  const correoUsuario = loggedInUser?.email || '';  // Almacena el correo del usuario logueado o cadena vacía

  // useEffect para cargar contratos al iniciar el componente
  useEffect(() => {
    const contratosGuardados = ContratoService.obtenerContratos(); // Obtiene la lista de contratos desde el servicio
    setContratos(contratosGuardados); // Actualiza el estado con los contratos obtenidos
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  // Función para alternar la visualización de más contratos
  const alternarMostrarMas = () => {
    setMostrarMas(!mostrarMas); // Cambia el estado mostrarMas a su valor opuesto
  };

  // Función para manejar la búsqueda
  const manejarBusqueda = () => {
    console.log('Buscando:', terminoBusqueda, 'Categoría:', categoria); // Muestra en consola los parámetros de búsqueda
  };

  // Función para participar en un contrato
  const participarEnContrato = (indexContrato) => {
    ContratoService.registrarParticipacion(indexContrato, correoUsuario);  // Registra la participación de la empresa
    alert(`Has participado en el contrato ${contratos[indexContrato].producto}`); // Muestra una alerta de participación
    const contratosActualizados = ContratoService.obtenerContratos(); // Vuelve a obtener la lista de contratos actualizada
    setContratos(contratosActualizados);  // Actualiza la lista de contratos en la interfaz
  };

  // Determina qué contratos mostrar: todos o solo los primeros 4
  const contratosMostrar = mostrarMas ? contratos : contratos.slice(0, 4);

  return (
    <div className="pedidos-container"> {/* Contenedor principal del componente */}
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
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}> {/* Selector de categorías */}
          <option value="">Categorías</option> {/* Opción por defecto */}
          <option value="vegetales">Vegetales</option> {/* Opción de categoría */}
          <option value="granos">Granos</option> {/* Opción de categoría */}
          <option value="frutas">Frutas</option> {/* Opción de categoría */}
        </select>
        <button onClick={manejarBusqueda}>Buscar</button> {/* Botón para ejecutar la búsqueda */}
      </div>

      <div className="header-pedidos"> {/* Encabezado de la sección de pedidos */}
        <h1 className="titulo">Pedidos</h1> {/* Título principal */}
        <button className="btn-ver-contratos"> {/* Botón para ver contratos */}
          Ver contratos
        </button>
      </div>
      <h2 className="titulo-contratos-destacados">Contratos Destacados</h2> {/* Título para contratos destacados */}

      <div className="productos-grid"> {/* Contenedor para la cuadrícula de productos */}
        {contratosMostrar.length > 0 ? ( // Comprueba si hay contratos para mostrar
          contratosMostrar.map((contrato, index) => ( // Mapea cada contrato a un componente de tarjeta
            <div key={index} className="producto-card"> {/* Tarjeta de contrato */}
              <img src={contrato.imagen} alt={contrato.producto} /> {/* Imagen del producto */}
              <h3>{contrato.producto}</h3> {/* Título del producto */}
              <div className="descripcion-producto"> {/* Descripción del producto */}
                <p>
                  Empresa: {contrato.empresa}
                  <br />
                  Tipo de contrato: {contrato.tipoContrato}
                  <br />
                  Cantidad: {contrato.cantidad} tn.
                  <br />
                  Fecha: {contrato.fechaPublicacion}
                </p>
              </div>
              <div className="acciones-contrato"> {/* Contenedor para las acciones de contrato */}
                <button onClick={() => participarEnContrato(index)}>Participar</button> {/* Botón para participar */}
                <button onClick={() => alert(`Participantes: ${ContratoService.obtenerParticipantes(index).join(', ')}`)}> {/* Botón para ver participantes */}
                  Ver participantes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay contratos disponibles.</p> // Mensaje si no hay contratos
        )}
      </div>

      <div className="ver-mas-container"> {/* Contenedor para el botón "Ver más" */}
        {contratos.length > 4 && ( // Solo muestra el botón si hay más de 4 contratos
          <button className="ver-mas" onClick={alternarMostrarMas}>
            {mostrarMas ? 'Ver menos' : 'Ver más'} {/* Cambia el texto del botón según el estado mostrarMas */}
          </button>
        )}
      </div>
    </div>
  );
};

export default PedidosEmpresa; // Exporta el componente para su uso en otras partes de la aplicación
