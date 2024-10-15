import React, { useState } from 'react'; // Importa React y useState desde la biblioteca de React.
import './RestablecerContraseña.css'; // Importa el archivo de estilos CSS para el componente.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación entre rutas.

const RestablecerContraseña = () => {
  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado.
  const [newPassword, setNewPassword] = useState(''); // Estado para almacenar la nueva contraseña.
  const [isResetLinkSent, setIsResetLinkSent] = useState(false); // Estado para controlar si se ha enviado el enlace de restablecimiento.
  const navigate = useNavigate(); // Hook para navegar entre rutas.

  // Función que maneja la solicitud de restablecimiento de contraseña.
  const handleResetRequest = (email) => {
    // Recupera la lista de usuarios del localStorage, si no existe, crea un arreglo vacío.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Busca el usuario que coincide con el email ingresado.
    const user = users.find(user => user.email === email);

    // Si se encuentra el usuario, envía un aviso y cambia el estado de isResetLinkSent.
    if (user) {
      alert('Se ha enviado un enlace de restablecimiento a su correo.'); // Alerta de éxito.
      setIsResetLinkSent(true); // Cambia el estado para mostrar el segundo formulario.
    } else {
      alert('El correo no está registrado.'); // Alerta de error si el email no coincide.
    }
  };

  // Función que maneja el restablecimiento de la contraseña.
  const handlePasswordReset = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.

    // Recupera la lista de usuarios del localStorage.
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Busca el índice del usuario que coincide con el email ingresado.
    const userIndex = users.findIndex(user => user.email === email); // Aquí se usa la variable email correctamente.

    // Si se encuentra el usuario, actualiza su contraseña y guarda los cambios en el localStorage.
    if (userIndex !== -1) {
      users[userIndex].password = newPassword; // Actualiza la contraseña.
      localStorage.setItem('users', JSON.stringify(users)); // Guarda la lista de usuarios actualizada en el localStorage.
      alert('Contraseña restablecida exitosamente'); // Alerta de éxito.
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión.
    } else {
      alert('Error al restablecer la contraseña.'); // Alerta de error si algo sale mal.
    }
  };

  // Renderiza el componente.
  return (
    <div className="reset-password-container"> {/* Contenedor principal */}
      <div className="reset-password-image"> {/* Sección de imagen */}
        <img src={process.env.PUBLIC_URL + '/imagenrecuperarcontrasena.jpg'} alt="Agriculture" /> {/* Imagen de restablecimiento */}
      </div>
      <div className="reset-password-form"> {/* Sección del formulario */}
        {!isResetLinkSent ? ( // Si no se ha enviado el enlace de restablecimiento
          <form onSubmit={(e) => { e.preventDefault(); handleResetRequest(email); }}> {/* Formulario para solicitar el enlace de restablecimiento */}
            <h2>Restablecer Contraseña</h2> {/* Título del formulario */}
            <label htmlFor="email">Correo Electrónico</label> {/* Etiqueta para el campo de correo electrónico */}
            <input
              type="email"
              id="email"
              placeholder="Correo Electrónico"
              value={email} // Valor del input vinculado al estado email
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email en función de la entrada del usuario
              required // Campo obligatorio
            />
            <button type="submit">Enviar Enlace de Restablecimiento</button> {/* Botón para enviar el formulario */}
          </form>
        ) : ( // Si el enlace ha sido enviado
          <form onSubmit={handlePasswordReset}> {/* Formulario para ingresar la nueva contraseña */}
            <h2>Ingresa Nueva Contraseña</h2> {/* Título del formulario */}
            <label htmlFor="newPassword">Nueva Contraseña</label> {/* Etiqueta para el campo de nueva contraseña */}
            <input
              type="password"
              id="newPassword"
              placeholder="Nueva Contraseña"
              value={newPassword} // Valor del input vinculado al estado newPassword
              onChange={(e) => setNewPassword(e.target.value)} // Actualiza el estado newPassword en función de la entrada del usuario
              required // Campo obligatorio
            />
            <button type="submit">Restablecer Contraseña</button> {/* Botón para enviar el formulario */}
          </form>
        )}
      </div>
    </div>
  );
};

// Exporta el componente para poder usarlo en otras partes de la aplicación.
export default RestablecerContraseña;
