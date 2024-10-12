// Define el objeto ContratoService que contendrá métodos para manejar contratos y notificaciones.
const ContratoService = {
  // Método para obtener todos los contratos almacenados en localStorage.
  obtenerContratos: () => {
    // Intenta obtener los contratos y parsearlos. Si no existen, devuelve un array vacío.
    return JSON.parse(localStorage.getItem('contratos')) || [];
  },

  // Método para crear un nuevo contrato.
  crearContrato: (contrato) => {
    // Obtiene los contratos existentes desde localStorage, o un array vacío si no hay ninguno.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Agrega el nuevo contrato al array de contratos existentes.
    contratosExistentes.push(contrato);
    // Guarda el array actualizado de contratos en localStorage.
    localStorage.setItem('contratos', JSON.stringify(contratosExistentes));
  },

  // Método para actualizar todos los contratos en localStorage.
  actualizarContratos: (contratos) => {
    // Guarda el array de contratos actualizado en localStorage.
    localStorage.setItem('contratos', JSON.stringify(contratos));
  },

  // Método para eliminar un contrato basado en su índice.
  eliminarContrato: (index) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Elimina el contrato en la posición especificada (índice).
    contratosExistentes.splice(index, 1);
    // Guarda el array de contratos actualizado en localStorage.
    localStorage.setItem('contratos', JSON.stringify(contratosExistentes));
  },

  // Método para registrar la participación de un usuario en un contrato.
  registrarParticipacion: (indexContrato, correoUsuario) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];

    // Inicializa la lista de participantes si no existe.
    if (!contrato.participantes) {
      contrato.participantes = [];
    }

    // Evita agregar el mismo participante varias veces.
    if (!contrato.participantes.includes(correoUsuario)) {
      // Agrega el correo del usuario a la lista de participantes.
      contrato.participantes.push(correoUsuario);
      
      // Llama al método agregarNotificacion para notificar la participación.
      ContratoService.agregarNotificacion(contrato.empresa, correoUsuario, contrato.producto);
    }

    // Guarda el array de contratos actualizado en localStorage.
    localStorage.setItem('contratos', JSON.stringify(contratosExistentes));
  },

  // Método para obtener la lista de participantes de un contrato específico.
  obtenerParticipantes: (indexContrato) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];
    // Devuelve la lista de participantes o un array vacío si no hay participantes.
    return contrato.participantes || [];
  },

  // Método para obtener todas las notificaciones almacenadas.
  obtenerNotificaciones: () => {
    // Intenta obtener las notificaciones y parsearlas. Si no existen, devuelve un array vacío.
    return JSON.parse(localStorage.getItem('notificaciones')) || [];
  },

  // Método para agregar una nueva notificación.
  agregarNotificacion: (empresa, correoUsuario, producto) => {
    // Obtiene las notificaciones existentes desde localStorage, o un array vacío si no hay.
    const notificacionesExistentes = JSON.parse(localStorage.getItem('notificaciones')) || [];
    // Crea un nuevo mensaje de notificación.
    const nuevaNotificacion = `El usuario ${correoUsuario} ha participado en tu contrato de ${producto}.`;
    // Agrega la nueva notificación al array de notificaciones existentes.
    notificacionesExistentes.push({ empresa, mensaje: nuevaNotificacion });
    // Guarda el array de notificaciones actualizado en localStorage.
    localStorage.setItem('notificaciones', JSON.stringify(notificacionesExistentes));
  },

  // Método para limpiar las notificaciones asociadas a una empresa específica.
  limpiarNotificaciones: (empresa) => {
    // Obtiene las notificaciones existentes desde localStorage.
    const notificacionesExistentes = JSON.parse(localStorage.getItem('notificaciones')) || [];
    // Filtra las notificaciones para eliminar las que pertenecen a la empresa especificada.
    const notificacionesFiltradas = notificacionesExistentes.filter(notificacion => notificacion.empresa !== empresa);
    // Guarda el array de notificaciones filtrado en localStorage.
    localStorage.setItem('notificaciones', JSON.stringify(notificacionesFiltradas));
  },

  // Método para firmar un contrato específico.
  firmarContrato: (indexContrato, correoUsuario) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];

    // Marca el contrato como firmado y guarda el correo del participante elegido.
    contrato.firmado = true;
    contrato.participanteElegido = correoUsuario;

    // Guarda el array de contratos actualizado en localStorage.
    localStorage.setItem('contratos', JSON.stringify(contratosExistentes));
  },

  // Método para obtener la lista de participantes (duplicado, se puede eliminar).
  obtenerParticipantes: (indexContrato) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = JSON.parse(localStorage.getItem('contratos')) || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];
    // Devuelve la lista de participantes o un array vacío si no hay participantes.
    return contrato.participantes || [];
  }
};

// Exporta el objeto ContratoService para que pueda ser utilizado en otras partes de la aplicación.
export default ContratoService;