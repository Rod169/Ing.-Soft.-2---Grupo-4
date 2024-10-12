import React, { useState } from 'react'; // Importa React y useState para manejar el estado
import './Login.css'; // Importa los estilos específicos para este componente
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para redireccionar a otras páginas
import AuthService from '../funcionalidades/AuthService/AuthService'; // Importamos el AuthService para la lógica de autenticación

const Login = () => {
  // Definición de estados para manejar el correo electrónico, la contraseña, y el flujo de 2FA
  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña ingresada
  const [is2FA, setIs2FA] = useState(false); // Estado para manejar si el 2FA está activo
  const [verificationCode, setVerificationCode] = useState(''); // Estado para almacenar el código de verificación 2FA
  const [generatedCode, setGeneratedCode] = useState(''); // Estado para almacenar el código generado para 2FA
  const navigate = useNavigate(); // Hook para manejar la navegación entre rutas

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Intenta autenticar al usuario utilizando el AuthService
    const user = AuthService.login(email, password);
    if (user) {
      // Si la autenticación es exitosa, genera un código de 2FA
      const code = AuthService.generate2FACode();
      setGeneratedCode(code); // Guarda el código generado en el estado
      setIs2FA(true); // Cambia el estado a true para activar el flujo de 2FA
      alert(`Tu código de verificación es: ${code}`); // Simula el envío del código de verificación al usuario
    } else {
      alert('Credenciales incorrectas'); // Muestra un mensaje de error si las credenciales son incorrectas
    }
  };

  // Función para manejar la verificación del código 2FA
  const handle2FA = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Verifica si el código ingresado es correcto
    if (AuthService.verify2FACode(verificationCode, generatedCode)) {
      alert('Sesión iniciada correctamente'); // Mensaje de éxito

      // Obtiene el usuario completo del servicio de autenticación
      const user = AuthService.getUserByEmail(email);
      
      // Guarda el usuario completo (email + accountType) en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      navigate('/inicio'); // Redirige al usuario a la página de inicio
    } else {
      alert('Código de verificación incorrecto'); // Mensaje de error si el código es incorrecto
    }
  };

  // Función para manejar el enlace de "Olvidé mi contraseña"
  const handleForgotPassword = () => {
    navigate('/restablecer-contraseña'); // Redirige a la página de restablecimiento de contraseña
  };

  // Renderizado del componente
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={process.env.PUBLIC_URL + '/corn-field.jpg'} alt="Corn Field" /> {/* Imagen de fondo */}
      </div>
      <div className="login-form">
        {!is2FA ? ( // Si el flujo de 2FA no está activo
          <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email} // Vincula el valor del campo al estado
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el valor ingresado
              required // Campo requerido
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password} // Vincula el valor del campo al estado
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con el valor ingresado
              required // Campo requerido
            />

            <div className="remember-forgot">
              <div>
                <input type="checkbox" id="remember" /> {/* Checkbox para recordar al usuario */}
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" onClick={handleForgotPassword}>Forgot Password?</a> {/* Enlace para restablecer contraseña */}
            </div>

            <button type="submit">Log In</button> {/* Botón de inicio de sesión */}

            <div className="social-login">
              <button type="submit" className="google-login">Log in with Google</button> {/* Botón para iniciar sesión con Google */}
              <button type="submit" className="apple-login">Log in with Apple</button> {/* Botón para iniciar sesión con Apple */}
            </div>

            <p>No account yet? <a href="/signup">Sign Up</a></p> {/* Enlace para registrarse */}
          </form>
        ) : (
          <form onSubmit={handle2FA}> {/* Formulario para ingresar el código de verificación 2FA */}
            <h2>Introduce el código de verificación</h2>
            <label htmlFor="verificationCode">Código de Verificación</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="6 dígitos"
              value={verificationCode} // Vincula el valor del campo al estado
              onChange={(e) => setVerificationCode(e.target.value)} // Actualiza el estado con el valor ingresado
              required // Campo requerido
            />
            <button type="submit">Verificar</button> {/* Botón para verificar el código */}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
