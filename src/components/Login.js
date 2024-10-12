import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../funcionalidades/AuthService/AuthService'; // Importamos el AuthService para la lógica de autenticación

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is2FA, setIs2FA] = useState(false); // Manejamos si el 2FA está activo
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  // Manejamos el login usando el servicio de autenticación
  const handleLogin = (e) => {
    e.preventDefault();

    const user = AuthService.login(email, password); // Usamos AuthService para la autenticación
    if (user) {
      const code = AuthService.generate2FACode(); // Generamos el código de 2FA
      setGeneratedCode(code);
      setIs2FA(true); // Activamos el flujo de 2FA
      setError(''); // Limpiar cualquier error previo
      alert(`Tu código de verificación es: ${code}`); // Simulamos el envío del código de verificación
    } else {
      setError('Credenciales incorrectas'); // Establecer mensaje de error
    }
  };

  // Manejamos la verificación del código 2FA
  const handle2FA = (e) => {
    e.preventDefault();

    if (AuthService.verify2FACode(verificationCode, generatedCode)) {
      alert('Sesión iniciada correctamente');

      // Obtener el usuario completo del servicio de autenticación
      const user = AuthService.getUserByEmail(email);
      
      // Guardar el usuario completo (email + accountType)
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      navigate('/inicio'); // Redirigir a la página de inicio
    } else {
      setError('Código de verificación incorrecto'); // Establecer mensaje de error
    }
  };

  const handleForgotPassword = () => {
    navigate('/restablecer-contraseña'); // Redirigir a la página de restablecimiento de contraseña
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={process.env.PUBLIC_URL + '/corn-field.jpg'} alt="Corn Field" />
      </div>
      <div className="login-form">
        {error && <p className="error-message">{error}</p>} {/* Mostrar el mensaje de error si existe */}
        {!is2FA ? (
          <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="remember-forgot">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>

            <button type="submit">Log In</button>

            <div className="social-login">
              <button type="submit" className="google-login">Log in with Google</button>
              <button type="submit" className="apple-login">Log in with Apple</button>
            </div>

            <p>No account yet? <a href="/signup">Sign Up</a></p>
          </form>
        ) : (
          <form onSubmit={handle2FA}>
            <h2>Introduce el código de verificación</h2>
            <label htmlFor="verificationCode">Código de Verificación</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="6 dígitos"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="submit">Verificar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
