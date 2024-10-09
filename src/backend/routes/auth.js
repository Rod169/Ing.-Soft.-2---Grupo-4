const express = require('express');
const router = express.Router();
const { loadUsers, saveUsers, User } = require('../models/User');

// Ruta para registrar un nuevo usuario
router.post('/signup', (req, res) => {
  const { nombre, apellido, email, password, tipo } = req.body;

  // Validamos que el tipo de usuario sea válido
  const tiposValidos = ['proveedor', 'empresa'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ mensaje: 'Tipo de cuenta inválido' });
  }

  // Cargamos los usuarios existentes
  const usuarios = loadUsers();

  // Verificamos si el usuario ya existe
  const usuarioExistente = usuarios.find(u => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
  }

  // Creamos un nuevo usuario con el tipo de cuenta
  const nuevoUsuario = new User(nombre, apellido, email, password, tipo);
  usuarios.push(nuevoUsuario);

  // Guardamos los usuarios
  saveUsers(usuarios);

  res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Cargamos los usuarios
  const usuarios = loadUsers();

  // Buscamos el usuario por email y contraseña
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
  }

  // Devolvemos el usuario y su tipo de cuenta
  res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
});

module.exports = router;
