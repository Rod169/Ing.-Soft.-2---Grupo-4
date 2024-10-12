// Este módulo maneja todas las operaciones relacionadas con las notificaciones.
// Cumple con el principio SOLID de responsabilidad única, ya que
// se encarga exclusivamente de la lógica de las notificaciones,
// incluyendo el almacenamiento, recuperación y limpieza de notificaciones.
import StorageService from '../ServicioStorage/StorageService.js'; // Importa el StorageService para manejar la persistencia.

const NotificacionService = {
  obtenerNotificaciones: () => {
    // Intenta obtener las notificaciones y parsearlas. Si no existen, devuelve un array vacío.
    return StorageService.obtener('notificaciones') || [];
  },

  agregarNotificacion: (empresa, correoUsuario, producto) => {
    // Obtiene las notificaciones existentes desde localStorage, o un array vacío si no hay.
    const notificacionesExistentes = StorageService.obtener('notificaciones') || [];
    // Crea un nuevo mensaje de notificación.
    const nuevaNotificacion = `El usuario ${correoUsuario} ha participado en tu contrato de ${producto}.`;
    // Agrega la nueva notificación al array de notificaciones existentes.
    notificacionesExistentes.push({ empresa, mensaje: nuevaNotificacion });
    // Guarda el array de notificaciones actualizado en localStorage.
    StorageService.guardar('notificaciones', notificacionesExistentes);
  },

  limpiarNotificaciones: (empresa) => {
    // Obtiene las notificaciones existentes desde localStorage.
    const notificacionesExistentes = StorageService.obtener('notificaciones') || [];
    // Filtra las notificaciones para eliminar las que pertenecen a la empresa especificada.
    const notificacionesFiltradas = notificacionesExistentes.filter(notificacion => notificacion.empresa !== empresa);
    // Guarda el array de notificaciones filtrado en localStorage.
    StorageService.guardar('notificaciones', notificacionesFiltradas);
  },
};

// Exporta el objeto NotificacionService para que pueda ser utilizado en otras partes de la aplicación.
export default NotificacionService;
