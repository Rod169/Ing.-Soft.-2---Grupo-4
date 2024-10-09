import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './Login.css'; // Estilos para el componente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Inicio de sesión exitoso', data);
        // Navegamos a la ruta de inicio después del login exitoso
        navigate('/inicio'); // Aquí puedes redirigir a la ruta que prefieras
      } else {
        setError(data.mensaje); // Mostrar el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={process.env.PUBLIC_URL + '/corn-field.jpg'} alt="Corn Field" />
      </div>
      <div className="login-form">
        <h2>Log In</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar errores */}
        <form onSubmit={handleLogin}>
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
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Log In</button>

          <div className="social-login">
            <button className="google-login">Log in with Google</button>
            <button className="apple-login">Log in with Apple</button>
          </div>

          <p>No account yet? <a href="/signup">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
