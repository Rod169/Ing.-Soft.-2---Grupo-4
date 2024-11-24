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

  agregarNotificacion: (contexto, correoUsuario, detalle, tipo = 'general', nombreUsuario = null) => {
    // Obtiene las notificaciones existentes desde localStorage, o un array vacío si no hay.
    const notificacionesExistentes = StorageService.obtener('notificaciones') || [];
    
    // Genera un ticket único si es para soporte
    const ticket = tipo === 'soporte' ? Math.floor(100000 + Math.random() * 900000) : null;

    // Construye el mensaje según el tipo de notificación
    let nuevaNotificacion;
    if (tipo === 'contrato') {
      nuevaNotificacion = {
        contexto,
        mensaje: `El usuario ${correoUsuario} ha participado en tu contrato de ${detalle}.`,
        tipo,
      };
    } else if (tipo === 'soporte') {
      nuevaNotificacion = {
        contexto,
        mensaje: `Estimad@ ${nombreUsuario}, tu solicitud de soporte con ticket #${ticket} ha sido recibida por nosotros.`,
        tipo,
        ticket, // Incluye el ticket solo si es de soporte
      };
    } else {
      nuevaNotificacion = {
        contexto,
        mensaje: `El usuario ${correoUsuario} ha generado una acción en ${contexto}: ${detalle}.`,
        tipo,
      };
    }

    // Agrega la nueva notificación al array de notificaciones existentes.
    notificacionesExistentes.push(nuevaNotificacion);

    // Guarda el array de notificaciones actualizado en localStorage.
    StorageService.guardar('notificaciones', notificacionesExistentes);
  },

  limpiarNotificaciones: (empresa) => {
    // Obtiene las notificaciones existentes desde localStorage.
    const notificacionesExistentes = StorageService.obtener('notificaciones') || [];
    // Filtra las notificaciones para eliminar las que pertenecen a la empresa especificada.
    const notificacionesFiltradas = notificacionesExistentes.filter(notificacion => notificacion.contexto !== empresa);
    // Guarda el array de notificaciones filtrado en localStorage.
    StorageService.guardar('notificaciones', notificacionesFiltradas);
  },
};

export default NotificacionService;
