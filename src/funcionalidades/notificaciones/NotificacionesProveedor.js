// Importamos las dependencias necesarias.
import React, { useEffect, useState } from 'react';  // React y hooks para manejar estado y efectos secundarios.
import './NotificacionesProveedor.css';  // Estilos específicos del componente.
import ContratoService from '../ServicioContrato/ContratoService';  // Servicio para gestionar contratos y notificaciones.

const NotificacionesProveedor = () => {
  // Estado para almacenar las notificaciones. Inicialmente, es un array vacío.
  const [notificaciones, setNotificaciones] = useState([]);

  // useEffect se ejecuta cuando el componente se monta.
  useEffect(() => {
    // Al cargar la página, obtenemos las notificaciones guardadas desde el servicio.
    const notificacionesGuardadas = ContratoService.obtenerNotificaciones();
    // Actualizamos el estado con las notificaciones obtenidas.
    setNotificaciones(notificacionesGuardadas);
  }, []);  // [] asegura que useEffect solo se ejecute al montar el componente (una vez).

  // Función para limpiar todas las notificaciones.
  const limpiarNotificaciones = () => {
    // Llamamos al servicio para eliminar las notificaciones.
    ContratoService.limpiarNotificaciones();
    // Limpiamos el estado de las notificaciones.
    setNotificaciones([]);
    // Mostramos un mensaje al usuario para indicar que las notificaciones fueron eliminadas.
    alert('Todas las notificaciones han sido eliminadas.');
  };

  // Renderizamos el componente.
  return (
    <div className="notificaciones-container">  {/* Contenedor principal con estilos CSS */}
      <h1>Notificaciones</h1>  {/* Encabezado de la sección */}

      {/* Si hay notificaciones, las mostramos en una lista; si no, mostramos un mensaje alternativo. */}
      {notificaciones.length > 0 ? (
        <ul className="lista-notificaciones">  {/* Lista sin bullets definida en CSS */}
          {notificaciones.map((notificacion, index) => (
            <li key={index} className="notificacion-item">  {/* Cada notificación es un elemento de la lista */}
              {notificacion}  {/* Mostramos el contenido de la notificación */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones nuevas.</p>  /* Mensaje si no hay notificaciones */
      )}

      {/* Si hay notificaciones, mostramos un botón para limpiarlas. */}
      {notificaciones.length > 0 && (
        <button onClick={limpiarNotificaciones} className="btn-limpiar-notificaciones">
          Limpiar notificaciones
        </button>
      )}
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos.
export default NotificacionesProveedor;