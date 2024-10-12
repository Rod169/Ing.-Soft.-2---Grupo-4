// Este módulo maneja todas las operaciones relacionadas con los contratos.
// Cumple con el principio SOLID de responsabilidad única, ya que
// se encarga exclusivamente de la lógica y manipulación de contratos,
// incluyendo la creación, actualización, eliminación y obtención
// de contratos desde el almacenamiento.
import StorageService from '../ServicioStorage/StorageService.js'; // Importar el StorageService para manejar la persistencia.
import NotificacionService from '../ServicioNotificacion/NotificacionService.js'; // Importar NotificacionService.

const ContratoService = {
  obtenerContratos: () => {
    // Devuelve todos los contratos almacenados en localStorage.
    return StorageService.obtener('contratos') || [];
  },

  crearContrato: (contrato) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = StorageService.obtener('contratos') || [];
    // Agrega el nuevo contrato al array de contratos existentes.
    contratosExistentes.push(contrato);
    // Guarda el array actualizado de contratos en localStorage.
    StorageService.guardar('contratos', contratosExistentes);
  },

  actualizarContratos: (contratos) => {
    // Guarda el array de contratos actualizado en localStorage.
    StorageService.guardar('contratos', contratos);
  },

  eliminarContrato: (index) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = StorageService.obtener('contratos') || [];
    // Elimina el contrato en la posición especificada (índice).
    contratosExistentes.splice(index, 1);
    // Guarda el array de contratos actualizado en localStorage.
    StorageService.guardar('contratos', contratosExistentes);
  },

  registrarParticipacion: (indexContrato, correoUsuario) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = StorageService.obtener('contratos') || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];

    // Inicializa la lista de participantes si no existe.
    if (!contrato.participantes) {
      contrato.participantes = [];
    }

    // No permite agregar el mismo participante varias veces.
    if (!contrato.participantes.includes(correoUsuario)) {
      contrato.participantes.push(correoUsuario);
      // Llama al método agregarNotificacion para notificar la participación.
      NotificacionService.agregarNotificacion(contrato.empresa, correoUsuario, contrato.producto);
    }

    // Guarda el array de contratos actualizado en localStorage.
    StorageService.guardar('contratos', contratosExistentes);
  },

  obtenerParticipantes: (indexContrato) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = StorageService.obtener('contratos') || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];
    // Devuelve la lista de participantes o un array vacío si no hay participantes.
    return contrato.participantes || [];
  },

  // Método para firmar un contrato específico.
  firmarContrato: (indexContrato, correoUsuario) => {
    // Obtiene los contratos existentes desde localStorage.
    const contratosExistentes = StorageService.obtener('contratos') || [];
    // Obtiene el contrato específico usando el índice proporcionado.
    const contrato = contratosExistentes[indexContrato];

    // Marca el contrato como firmado y guarda el correo del participante elegido.
    contrato.firmado = true;
    contrato.participanteElegido = correoUsuario;

    // Guarda el array de contratos actualizado en localStorage.
    StorageService.guardar('contratos', contratosExistentes);
  },
};

// Exporta el objeto ContratoService para que pueda ser utilizado en otras partes de la aplicación.
export default ContratoService;
