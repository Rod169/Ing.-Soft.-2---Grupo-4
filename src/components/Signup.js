import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [error, setError] = useState(null); // Para mostrar errores si ocurren

  const navigate = useNavigate(); // Hook para la navegación

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validación de contraseñas coincidentes
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombre: firstName,
      apellido: lastName,
      email,
      password,
      tipo: accountType,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Registro exitoso', data);
        // Navegar a la ruta "inicio" después del registro exitoso
        navigate('/inicio'); // Aquí puedes redirigir a cualquier ruta que desees
      } else {
        setError(data.mensaje); // Mostrar el mensaje de error del servidor
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Ocurrió un error al registrar el usuario');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={process.env.PUBLIC_URL + '/agriculture-woman.jpg'} alt="Agriculture" />
      </div>
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar errores */}
        <form onSubmit={handleSignup}>
          <div className="name-fields">
            <div className="first-name-field">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
            </div>

            <div className="last-name-field">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <div className="account-type">
            <label>Tipo de cuenta:</label>
            <div className="radio-buttons">
              <label>
                <input 
                  type="radio" 
                  name="accountType" 
                  value="proveedor" 
                  checked={accountType === 'proveedor'} 
                  onChange={(e) => setAccountType(e.target.value)} 
                  required 
                />
                Soy proveedor
              </label>
              <label>
                <input 
                  type="radio" 
                  name="accountType" 
                  value="empresa" 
                  checked={accountType === 'empresa'} 
                  onChange={(e) => setAccountType(e.target.value)} 
                />
                Soy empresa
              </label>
            </div>
          </div>

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />

          <button type="submit">Sign Up</button>

          <div className="social-signup">
            <button className="google-signup">Sign up with Google</button>
            <button className="apple-signup">Sign up with Apple</button>
          </div>

          <p>Already have an account? <a href="/login">Log In</a></p>          
        </form>
      </div>
    </div>
  );
};

export default Signup;
