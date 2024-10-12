// Creamos un objeto que contiene funciones relacionadas con la autenticación.
const AuthService = {
  // Método para iniciar sesión con un correo y una contraseña.
  login: (email, password) => {
    // Obtenemos los usuarios almacenados en localStorage y los convertimos de JSON a un array de objetos.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscamos un usuario que coincida con el correo y la contraseña proporcionados.
    return users.find(user => user.email === email && user.password === password);
  },

  // Método para generar un código aleatorio de 6 dígitos para la autenticación de dos factores (2FA).
  generate2FACode: () => {
    // Generamos un número aleatorio entre 100000 y 999999, lo convertimos a string, y lo devolvemos.
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Método para verificar si el código 2FA ingresado por el usuario coincide con el generado.
  verify2FACode: (inputCode, generatedCode) => {
    // Compara ambos códigos y devuelve true si coinciden, de lo contrario, false.
    return inputCode === generatedCode;
  },

  // Método para buscar un usuario por su correo electrónico.
  getUserByEmail: (email) => {
    // Obtenemos los usuarios almacenados en localStorage y los convertimos de JSON a un array de objetos.
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscamos un usuario cuyo correo coincida con el email proporcionado.
    return users.find(user => user.email === email);
  }
};

// Exportamos el objeto AuthService para que pueda ser utilizado en otros archivos.
export default AuthService;