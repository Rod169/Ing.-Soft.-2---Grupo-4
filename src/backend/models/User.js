const fs = require('fs');
const path = require('path');

// Definimos la ruta donde se almacenarán los usuarios
const usersFilePath = path.join(__dirname, '../data/users.json');

// Función para cargar los usuarios del archivo JSON
function loadUsers() {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  }
  return [];
}

// Función para guardar los usuarios en el archivo JSON
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Clase Usuario
class User {
  constructor(nombre, apellido, email, password, tipo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.tipo = tipo; // cliente, administrador o vendedor
  }
}

// Exportamos las funciones necesarias
module.exports = {
  loadUsers,
  saveUsers,
  User
};
