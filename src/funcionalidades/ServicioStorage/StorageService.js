// Este módulo maneja todas las operaciones de almacenamiento local.
// Cumple con el principio SOLID de responsabilidad única, ya que
// se encarga exclusivamente de la lógica de almacenamiento y recuperación
// de datos del localStorage, evitando la duplicación de código en otros módulos.
const StorageService = {
    obtener: (clave) => {
      // Recupera y parsea el valor asociado a la clave especificada.
      return JSON.parse(localStorage.getItem(clave));
    },
  
    guardar: (clave, valor) => {
      // Convierte el valor en una cadena JSON y lo guarda en localStorage bajo la clave especificada.
      localStorage.setItem(clave, JSON.stringify(valor));
    },
  };
  
  export default StorageService;