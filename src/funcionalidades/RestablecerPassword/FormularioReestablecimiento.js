// Este componente maneja el formulario de solicitud de restablecimiento de contraseña.
// Cumple con el principio OCP al permitir la adición de nuevos campos, validaciones
// o estilos sin modificar el componente principal de restablecimiento.
import React, { useState } from 'react';

const FormularioReestablecimiento = ({ onResetRequest }) => {
  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado.

  const manejarCambio = (e) => {
    setEmail(e.target.value); // Actualiza el estado email en función de la entrada del usuario.
  };

  const manejarSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.
    onResetRequest(email); // Llama a la función de callback para manejar la solicitud.
  };

  return (
    <form onSubmit={manejarSubmit}> {/* Formulario para solicitar el enlace */}
      <h2>Restablecer Contraseña</h2> {/* Título del formulario */}
      <label htmlFor="email">Ingresa tu correo electrónico</label> {/* Etiqueta para el campo de email */}
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email} // Valor del input vinculado al estado email
        onChange={manejarCambio} // Actualiza el estado email en función de la entrada del usuario
        required // Campo obligatorio
      />
      <button type="submit">Enviar enlace de restablecimiento</button> {/* Botón para enviar el formulario */}
    </form>
  );
};

export default FormularioReestablecimiento;
