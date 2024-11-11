import React, { useState, useEffect } from 'react';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(''); // Estado para almacenar el tipo de usuario
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenemos el usuario autenticado de localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPassword(user.password);
      setAccountType(user.accountType); // Asignamos el tipo de usuario
    }
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Obtenemos la lista completa de usuarios del localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
      // Actualizamos los datos del usuario en la lista de usuarios
      users[userIndex] = { firstName, lastName, email, password, accountType };
      localStorage.setItem('users', JSON.stringify(users)); // Guardamos la lista completa de usuarios actualizada
      localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex])); // Actualizamos el usuario autenticado actual en localStorage

      alert('Perfil actualizado exitosamente');
      navigate('/Inicio'); // Redirige a la página de inicio o donde prefieras
    } else {
      alert('Error: El usuario no fue encontrado.');
    }
  };

  return (
    <div className="editar-perfil-page">
      <h2 className="titulo-editar-perfil">EDITAR PERFIL</h2>
      <div className="editar-perfil-container">
        <form onSubmit={handleSaveChanges}>
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Nueva Contraseña (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Tipo de Usuario</label>
          <input
            type="text"
            id="userType"
            value={accountType} // Mostramos el tipo de usuario sin permitir editarlo
            disabled
          />

          <button type="submit" className="boton-guardar-cambios">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
