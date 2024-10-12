import React, { useState } from 'react'; // Importa React y useState para gestionar el estado del componente
import './Signup.css'; // Importa los estilos CSS para el componente
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación

const Signup = () => {
  // Declaración de variables de estado para gestionar los datos del formulario
  const [firstName, setFirstName] = useState(''); // Nombre
  const [lastName, setLastName] = useState(''); // Apellido
  const [email, setEmail] = useState(''); // Correo electrónico
  const [password, setPassword] = useState(''); // Contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirmación de contraseña
  const [accountType, setAccountType] = useState(''); // Tipo de cuenta (proveedor o empresa)
  const navigate = useNavigate(); // Hook para la navegación entre rutas

  // Función para manejar el registro del usuario
  const handleSignup = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden'); // Alerta si no coinciden
      return; // Sale de la función
    }

    // Obtiene los usuarios guardados en el almacenamiento local
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verifica si el correo ya está registrado
    if (users.find(user => user.email === email)) {
      alert('El correo ya está registrado'); // Alerta si el correo ya existe
      return; // Sale de la función
    }

    // Crea un nuevo usuario con los datos del formulario
    const newUser = { firstName, lastName, email, password, accountType };
    users.push(newUser); // Agrega el nuevo usuario a la lista de usuarios
    localStorage.setItem('users', JSON.stringify(users)); // Guarda la lista actualizada en el almacenamiento local

    alert('Usuario registrado exitosamente'); // Alerta de éxito
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión tras el registro
  };

  // Renderiza el componente de registro
  return (
    <div className="signup-container">
      <div className="signup-image">
        {/* Muestra una imagen relacionada con el registro */}
        <img src={process.env.PUBLIC_URL + '/agriculture-woman.jpg'} alt="Agriculture" />
      </div>
      <div className="signup-form">
        <h2>Sign Up</h2> {/* Título del formulario */}
        <form onSubmit={handleSignup}> {/* Asocia la función de manejo al evento de envío del formulario */}
          <div className="name-fields">
            {/* Campos para el nombre y apellido */}
            <div className="first-name-field">
              <label htmlFor="firstName">First Name</label> {/* Etiqueta para el campo de nombre */}
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName} // Asocia el valor del campo con el estado
                onChange={(e) => setFirstName(e.target.value)} // Actualiza el estado al cambiar el valor
                required // Hace que el campo sea obligatorio
              />
            </div>

            <div className="last-name-field">
              <label htmlFor="lastName">Last Name</label> {/* Etiqueta para el campo de apellido */}
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName} // Asocia el valor del campo con el estado
                onChange={(e) => setLastName(e.target.value)} // Actualiza el estado al cambiar el valor
                required // Hace que el campo sea obligatorio
              />
            </div>
          </div>

          <label htmlFor="email">Email</label> {/* Etiqueta para el campo de correo electrónico */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email} // Asocia el valor del campo con el estado
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado al cambiar el valor
            required // Hace que el campo sea obligatorio
          />

          <div className="account-type">
            <label>Tipo de cuenta:</label> {/* Etiqueta para seleccionar el tipo de cuenta */}
            <div className="radio-buttons">
              {/* Botones de opción para el tipo de cuenta */}
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="proveedor" // Valor para el tipo de cuenta "proveedor"
                  checked={accountType === 'proveedor'} // Verifica si este tipo está seleccionado
                  onChange={(e) => setAccountType(e.target.value)} // Actualiza el estado al seleccionar este tipo
                  required // Hace que se seleccione uno de los tipos
                />
                Soy proveedor
              </label>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="empresa" // Valor para el tipo de cuenta "empresa"
                  checked={accountType === 'empresa'} // Verifica si este tipo está seleccionado
                  onChange={(e) => setAccountType(e.target.value)} // Actualiza el estado al seleccionar este tipo
                />
                Soy empresa
              </label>
            </div>
          </div>

          <label htmlFor="password">Password</label> {/* Etiqueta para el campo de contraseña */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password} // Asocia el valor del campo con el estado
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al cambiar el valor
            required // Hace que el campo sea obligatorio
          />

          <label htmlFor="confirmPassword">Confirm Password</label> {/* Etiqueta para el campo de confirmación de contraseña */}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword} // Asocia el valor del campo con el estado
            onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado al cambiar el valor
            required // Hace que el campo sea obligatorio
          />

          <button type="submit">Sign Up</button> {/* Botón para enviar el formulario */}

          {/* Sección de registro social */}
          <div className="social-signup">
            <button type="submit" className="google-signup">Sign up with Google</button> {/* Botón de registro con Google */}
            <button type="submit" className="apple-signup">Sign up with Apple</button> {/* Botón de registro con Apple */}
          </div>

          <p>Already have an account? <a href="/login">Log In</a></p> {/* Enlace para redirigir a la página de inicio de sesión */}         
        </form>
      </div>
    </div>
  );
};

export default Signup; // Exporta el componente Signup
