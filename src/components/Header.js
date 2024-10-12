import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import './Header.css'; // Importa los estilos CSS para el encabezado

const Header = () => {
  // Definimos el estado del menú desplegable y del usuario autenticado
  const [menuDesplegable, setMenuDesplegable] = useState(false); // Estado para mostrar/ocultar el menú desplegable
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para almacenar el email del usuario autenticado
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario (empresa o proveedor)
  const navigate = useNavigate(); // Hook para la navegación programática

  // useEffect se ejecuta al montar el componente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser')); // Obtiene el usuario almacenado en localStorage
    if (user) {
      setLoggedInUser(user.email); // Si hay un usuario, establece el email
      setUserType(user.accountType); // Establece el tipo de cuenta (proveedor o empresa)
    }
  }, []); // El array vacío indica que solo se ejecutará una vez al montar el componente

  // Función para alternar la visibilidad del menú desplegable
  const alternarMenuDesplegable = () => {
    setMenuDesplegable(!menuDesplegable); // Cambia el estado de visibilidad del menú
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Elimina el usuario del localStorage
    setLoggedInUser(null); // Reinicia el estado del usuario autenticado
    setUserType(null); // Limpia el tipo de cuenta
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <header className="header-container"> {/* Contenedor principal del encabezado */}
      <div className="logo"> {/* Sección del logotipo */}
        <img src={process.env.PUBLIC_URL + '/allpa-logo.png'} alt="Allpa Logo" /> {/* Logotipo de la empresa */}
      </div>
      <nav className="nav-links"> {/* Navegación principal */}
        <a href="/inicio">Inicio</a> {/* Enlace a la página de inicio */}
        {userType === 'empresa' ? ( // Condicional que muestra diferentes enlaces según el tipo de usuario
          <a href="/pedidos-empresa">Pedidos Empresa</a>
        ) : (
          <a href="/pedidos-proveedor">Pedidos Proveedor</a>
        )}
        <a href="#">Productos</a> {/* Enlace a productos */}
        <a href="#">Sobre nosotros</a> {/* Enlace a información sobre la empresa */}
        <div className="support-dropdown"> {/* Enlace al soporte con un icono de menú desplegable */}
          <a href="/soporte">Soporte &#9662;</a>
        </div>
      </nav>
      <div className="icons"> {/* Sección de iconos de usuario */}
        <img src={process.env.PUBLIC_URL + '/notification-icon.png'} alt="Notifications" /> {/* Icono de notificaciones */}
        <img src={process.env.PUBLIC_URL + '/settings-icon.png'} alt="Settings" /> {/* Icono de ajustes */}
        <img 
          src={process.env.PUBLIC_URL + '/user-icon.png'} 
          alt="User" 
          className="user-icon" // Clase para el icono de usuario
          onClick={alternarMenuDesplegable} // Llama a la función al hacer clic
        />
        {menuDesplegable && ( // Renderiza el menú desplegable si está activo
          <div className="dropdown-menu"> 
            {loggedInUser ? ( // Condicional que muestra contenido diferente si hay un usuario autenticado
              <>
                <h3>Bienvenido, {loggedInUser}</h3> {/* Mensaje de bienvenida */}
                <button className="dropdown-button" onClick={handleLogout}>Cerrar Sesión</button> {/* Botón de cierre de sesión */}
              </>
            ) : (
              <>
                <h3>Bienvenido</h3> {/* Mensaje de bienvenida genérico */}
                <button className="dropdown-button" onClick={() => navigate('/login')}>Iniciar Sesión</button> {/* Botón para iniciar sesión */}
                <button className="dropdown-button" onClick={() => navigate('/signup')}>Registrarse</button> {/* Botón para registrarse */}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; // Exporta el componente Header para su uso en otras partes de la aplicación
