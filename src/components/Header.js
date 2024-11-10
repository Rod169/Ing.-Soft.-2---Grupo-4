import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuDesplegable, setMenuDesplegable] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para almacenar el nombre del usuario autenticado
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario (empresa, proveedor o cliente)
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser')); // Obtiene el usuario almacenado en localStorage
    if (user) {
      setLoggedInUser(user.firstName); // Establece el firstName del usuario en el estado
      setUserType(user.accountType); // Establece el tipo de cuenta (proveedor, empresa o cliente)
    }
  }, [location]); // La dependencia 'location' asegura que se actualice al cambiar la ruta

  const alternarMenuDesplegable = () => {
    setMenuDesplegable(!menuDesplegable); // Cambia el estado de visibilidad del menú
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Elimina el usuario del localStorage
    setLoggedInUser(null); // Reinicia el estado del usuario autenticado
    setUserType(null); // Limpia el tipo de cuenta
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <header className="header-container">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/allpa-logo.png'} alt="Allpa Logo" />
      </div>
      <nav className="nav-links">
        <a href="/inicio">Inicio</a>
        {userType === 'proveedor' && (
          <a href="/pedidos-proveedor">Pedidos Proveedor</a>
        )}
        {userType === 'empresa' && (
          <>
            <a href="/pedidos-empresa">Pedidos Empresa</a>
            <a href="/productos-empresa">Productos Empresa</a>
          </>
        )}
        {userType === 'cliente' && (
          <a href="/productos-cliente">Productos Cliente</a>
        )}
        <a href="#">Sobre nosotros</a>
        <div className="support-dropdown">
          <a href="/soporte">Soporte &#9662;</a>
        </div>
      </nav>
      <div className="icons">
        <img src={process.env.PUBLIC_URL + '/notification-icon.png'} alt="Notifications" />
        <img src={process.env.PUBLIC_URL + '/settings-icon.png'} alt="Settings" />
        <img 
          src={process.env.PUBLIC_URL + '/user-icon.png'} 
          alt="User" 
          className="user-icon"
          onClick={alternarMenuDesplegable}
        />
        {menuDesplegable && (
          <div className="dropdown-menu">
            {loggedInUser ? (
              <>
                <h3>Bienvenido, {loggedInUser}</h3> {/* Muestra solo el first name del usuario */}
                <button className="dropdown-button" onClick={handleLogout}>Cerrar Sesión</button>
              </>
            ) : (
              <>
                <h3>Bienvenido</h3>
                <button className="dropdown-button" onClick={() => navigate('/login')}>Iniciar Sesión</button>
                <button className="dropdown-button" onClick={() => navigate('/signup')}>Registrarse</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
