// Este módulo maneja todas las operaciones relacionadas con los pedidos.
// Cumple con el principio SOLID de responsabilidad única, ya que
// se encarga exclusivamente de la lógica y manipulación de pedidos,
// incluyendo la creación, actualización, eliminación y obtención
// de pedidos desde el almacenamiento.
import StorageService from '../ServicioStorage/StorageService.js'; // Importar el StorageService para manejar la persistencia.
import NotificacionService from '../ServicioNotificacion/NotificacionService.js'; // Importar NotificacionService.

const PedidoService = {
  obtenerPedidos: () => {
    // Devuelve todos los pedidos almacenados en localStorage.
    return StorageService.obtener('pedidos') || [];
  },

  crearPedido: (pedido) => {
    // Obtiene los pedidos existentes desde localStorage.
    const pedidosExistentes = StorageService.obtener('pedidos') || [];
    // Agrega el nuevo pedido al array de pedidos existentes.
    pedidosExistentes.push(pedido);
    // Guarda el array actualizado de pedidos en localStorage.
    StorageService.guardar('pedidos', pedidosExistentes);
  },

  actualizarPedidos: (pedidos) => {
    // Guarda el array de pedidos actualizado en localStorage.
    StorageService.guardar('pedidos', pedidos);
  },

  eliminarPedido: (index) => {
    // Obtiene los pedidos existentes desde localStorage.
    const pedidosExistentes = StorageService.obtener('pedidos') || [];
    // Elimina el pedido en la posición especificada (índice).
    pedidosExistentes.splice(index, 1);
    // Guarda el array de pedidos actualizado en localStorage.
    StorageService.guardar('pedidos', pedidosExistentes);
  },

  registrarParticipacion: (indexPedido, correoUsuario) => {
    // Obtiene los pedidos existentes desde localStorage.
    const pedidosExistentes = StorageService.obtener('pedidos') || [];
    // Obtiene el pedido específico usando el índice proporcionado.
    const pedido = pedidosExistentes[indexPedido];

    // Inicializa la lista de participantes si no existe.
    if (!pedido.participantes) {
      pedido.participantes = [];
    }

    // No permite agregar el mismo participante varias veces.
    if (!pedido.participantes.includes(correoUsuario)) {
      pedido.participantes.push(correoUsuario);
      // Llama al método agregarNotificacion para notificar la participación.
      NotificacionService.agregarNotificacion(pedido.empresa, correoUsuario, pedido.producto);
    }

    // Guarda el array de pedidos actualizado en localStorage.
    StorageService.guardar('pedidos', pedidosExistentes);
  },

  obtenerParticipantes: (indexPedido) => {
    // Obtiene los pedidos existentes desde localStorage.
    const pedidosExistentes = StorageService.obtener('pedidos') || [];
    // Obtiene el pedido específico usando el índice proporcionado.
    const pedido = pedidosExistentes[indexPedido];
    // Devuelve la lista de participantes o un array vacío si no hay participantes.
    return pedido.participantes || [];
  },

  // Método para marcar un pedido como completado o firmado (si es necesario).
  firmarPedido: (indexPedido, correoUsuario) => {
    // Obtiene los pedidos existentes desde localStorage.
    const pedidosExistentes = StorageService.obtener('pedidos') || [];
    // Obtiene el pedido específico usando el índice proporcionado.
    const pedido = pedidosExistentes[indexPedido];

    // Marca el pedido como firmado y guarda el correo del participante elegido.
    pedido.firmado = true;
    pedido.participanteElegido = correoUsuario;

    // Guarda el array de pedidos actualizado en localStorage.
    StorageService.guardar('pedidos', pedidosExistentes);
  },
};

// Exporta el objeto PedidoService para que pueda ser utilizado en otras partes de la aplicación.
export default PedidoService;
