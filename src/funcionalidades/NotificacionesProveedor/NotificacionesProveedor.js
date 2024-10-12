// Importamos las dependencias necesarias.
import React, { useEffect, useState } from 'react';  // React y hooks para manejar estado y efectos secundarios.
import ContratoService from '../ServicioContrato/ContratoService';  // Servicio para gestionar contratos y notificaciones.
import './NotificacionesProveedor.css';  // Estilos CSS específicos del componente.

const NotificacionesProveedor = () => {
  // Definimos el estado para almacenar las notificaciones. Inicialmente es un array vacío.
  const [notificaciones, setNotificaciones] = useState([]);

  // useEffect se ejecuta al montar el componente.
  useEffect(() => {
    // Obtener las notificaciones desde el servicio al cargar la página.
    const notificacionesGuardadas = ContratoService.obtenerNotificaciones();
    // Actualizamos el estado con las notificaciones obtenidas.
    setNotificaciones(notificacionesGuardadas);
  }, []);  // [] asegura que el efecto se ejecute solo al montar el componente (una vez).

  // Renderizado del componente.
  return (
    <div className="notificaciones-container">  {/* Contenedor principal con estilos CSS */}
      <h1>Mis Notificaciones</h1>  {/* Título principal */}

      <div className="notificaciones-list">  {/* Contenedor para la lista de notificaciones */}
        {/* Renderizado condicional: Si hay notificaciones, las mostramos; si no, mostramos un mensaje alternativo */}
        {notificaciones.length > 0 ? (
          // Si hay notificaciones, las mapeamos en tarjetas individuales.
          notificaciones.map((notificacion, index) => (
            <div key={index} className="notificacion-card">  {/* Cada notificación se renderiza como una tarjeta */}
              <p>{notificacion.mensaje}</p>  {/* Mostramos el mensaje de la notificación */}
            </div>
          ))
        ) : (
          // Si no hay notificaciones, mostramos este mensaje.
          <p>No tienes notificaciones aún.</p>
        )}
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos.
export default NotificacionesProveedor;