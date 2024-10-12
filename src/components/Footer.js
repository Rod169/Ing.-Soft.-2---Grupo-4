import React from 'react'; // Importa React para poder utilizar JSX
import './Footer.css'; // Importa los estilos CSS específicos para el pie de página

// Componente funcional de pie de página
const Footer = () => {
  return (
    // Elemento footer que contiene el contenido del pie de página
    <footer className="footer">
      <div className="footer-content">
        {}
        {/* Sección izquierda del pie de página que contiene el logotipo */}
        <div className="footer-left">
          <img src="/Allpa.png" alt="Allpa Logo" className="footer-logo" /> {/* Imagen del logotipo */}
        </div>

        {/* Sección derecha del pie de página que contiene enlaces y redes sociales */}
        <div className="footer-right">
          <nav>
            {/* Lista de enlaces de navegación */}
            <ul className="footer-links">
              <li><a href="#">Inicio</a></li> {/* Enlace a la página de inicio */}
              <li><a href="#">Pedidos</a></li> {/* Enlace a la página de pedidos */}
              <li><a href="#">Compra</a></li> {/* Enlace a la página de compra */}
              <li><a href="#">Venta</a></li> {/* Enlace a la página de venta */}
              <li><a href="#">Acerca de</a></li> {/* Enlace a la página "Acerca de" */}
              <li><a href="#">Contacto</a></li> {/* Enlace a la página de contacto */}
            </ul>
          </nav>

          {/* Sección de iconos de redes sociales */}
          <div className="social-icons">
            <a href="#"><img src="/youtube.png" alt="YouTube" /></a> {/* Icono de YouTube */}
            <a href="#"><img src="/facebook.png" alt="Facebook" /></a> {/* Icono de Facebook */}
            <a href="#"><img src="/twitter.png" alt="Twitter" /></a> {/* Icono de Twitter */}
            <a href="#"><img src="/instagram.png" alt="Instagram" /></a> {/* Icono de Instagram */}
            <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a> {/* Icono de LinkedIn */}
          </div>

          {/* Derechos reservados del pie de página */}
          <p className="footer-rights">Allpa Distribuidores © 2023. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Exporta el componente Footer para su uso en otras partes de la aplicación
export default Footer;
