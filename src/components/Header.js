import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuDesplegable, setMenuDesplegable] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false); // Nuevo estado para el menú de settings
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user.firstName);
      setUserType(user.accountType);
    }
  }, [location]); // La dependencia 'location' asegura que se actualice al cambiar la ruta

  const alternarMenuDesplegable = () => {
    setMenuDesplegable(!menuDesplegable);
  };

  const alternarSettingsMenu = () => {
    setSettingsMenu(!settingsMenu); // Alterna el estado de settingsMenu
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setUserType(null);
    navigate('/login');
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
        <img
          src={process.env.PUBLIC_URL + '/settings-icon.png'}
          alt="Settings"
          className="settings-icon"
          onClick={alternarSettingsMenu} // Añadir evento de click
        />
        {settingsMenu && ( // Mostrar el menú desplegable de configuración
          <div className="dropdown-menu">
            <button className="dropdown-button" onClick={() => navigate('/editar-perfil')}>Editar Perfil</button>
          </div>
        )}
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
                <h3>Bienvenido, {loggedInUser}</h3>
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
