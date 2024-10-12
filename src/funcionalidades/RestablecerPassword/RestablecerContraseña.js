// Este componente maneja la lógica de restablecimiento de contraseña.
// Cumple con el principio OCP al permitir la extensión del comportamiento
// a través del uso de componentes y funciones de callback sin modificar
// su lógica existente.
import React, { useState } from 'react'; // Importa React y useState desde la biblioteca de React.
import './RestablecerContraseña.css'; // Importa el archivo de estilos CSS para el componente.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación entre rutas.
import FormularioReestablecimiento from './FormularioReestablecimiento'; // Importa el componente de formulario.

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
          <FormularioReestablecimiento onResetRequest={handleResetRequest} /> // Usa el nuevo componente para el formulario
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
