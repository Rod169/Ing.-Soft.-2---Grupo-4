import React from 'react'; // Importa React, necesario para crear componentes
import './Inicio.css'; // Importa los estilos CSS específicos para este componente

const Inicio = () => { // Define el componente funcional Inicio
  return (
    <div className="inicio-container"> {/* Contenedor principal del componente */}

      {/* Primera Cara */}
      <section className="inicio-hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/inicio-imagen1.jpg)` }}>
        {/* Sección de héroe con imagen de fondo */}
        <div className="hero-content"> {/* Contenido dentro de la sección de héroe */}
          <h1>
            Obtén la oportunidad de hacer crecer tu negocio {/* Título principal */}
          </h1>
          <p>
            Con Allpa tendrás la posibilidad de vender tus productos y ser parte de los grandes contratos,
            colaborando en conjunto con más productores para satisfacer la gran demanda de productos agrícolas
            alrededor de todo el Perú. {/* Descripción del servicio */}
          </p>
          <div className="hero-buttons"> {/* Contenedor para los botones de acción */}
            <button className="btn-primary">Soy un proveedor</button> {/* Botón primario para proveedores */}
            <button className="btn-secondary">Soy una empresa</button> {/* Botón secundario para empresas */}
          </div>
        </div>
      </section>

      {/* Segunda Cara */}
      <section className="inicio-servicios"> {/* Sección para presentar servicios */}
        <h2>Descubre nuestros servicios</h2> {/* Título para la sección de servicios */}
        <div className="servicios-grid"> {/* Contenedor para los servicios, utilizando un diseño en cuadrícula */}
          <div className="servicio"> {/* Primer servicio */}
            <img src={process.env.PUBLIC_URL + '/inicio-icono1.png'} alt="Icono Servicio 1" /> {/* Icono del servicio */}
            <h3>Vende tus productos</h3> {/* Título del servicio */}
            <p>Lista tus productos en nuestra página y dale visibilidad a tu negocio.</p> {/* Descripción del servicio */}
            <a href="#">Conoce más →</a> {/* Enlace para más información */}
          </div>
          <div className="servicio"> {/* Segundo servicio */}
            <img src={process.env.PUBLIC_URL + '/inicio-icono2.png'} alt="Icono Servicio 2" />
            <h3>Participa de contratos</h3>
            <p>Colabora junto a más proveedores para completar grandes contratos.</p>
            <a href="#">Conoce más →</a>
          </div>
          <div className="servicio"> {/* Tercer servicio */}
            <img src={process.env.PUBLIC_URL + '/inicio-icono3.png'} alt="Icono Servicio 3" />
            <h3>Estadísticas de tu negocio</h3>
            <p>Mejora la toma de decisiones con nuestros indicadores.</p>
            <a href="#">Conoce más →</a>
          </div>
        </div>

        <div className="estadisticas"> {/* Sección para mostrar estadísticas */}
          <div className="estadisticas-header"> {/* Cabecera de estadísticas */}
            <h3>Operamos en más de 16 regiones</h3> {/* Título de la cabecera */}
            <p>Sé parte de la comunidad de emprendedores</p> {/* Descripción de la cabecera */}
          </div>
          <div className="estadisticas-grid"> {/* Contenedor para las estadísticas, usando cuadrícula */}
            <div className="estadistica-item"> {/* Primer ítem de estadística */}
              <img src={process.env.PUBLIC_URL + '/inicio-icono1.png'} alt="Icono 1" />
              <div className="estadistica-texto"> {/* Texto asociado a la estadística */}
                <h4>10,000+</h4> {/* Número de visitas diarias */}
                <p>Visitas diarias</p> {/* Descripción de la estadística */}
              </div>
            </div>
            <div className="estadistica-item"> {/* Segundo ítem de estadística */}
              <img src={process.env.PUBLIC_URL + '/inicio-icono2.png'} alt="Icono 2" />
              <div className="estadistica-texto">
                <h4>2 Millones</h4> {/* Número de usuarios */}
                <p>Usuarios</p>
              </div>
            </div>
            <div className="estadistica-item"> {/* Tercer ítem de estadística */}
              <img src={process.env.PUBLIC_URL + '/inicio-icono3.png'} alt="Icono 3" />
              <div className="estadistica-texto">
                <h4>500+</h4> {/* Número de clientes */}
                <p>Clientes</p>
              </div>
            </div>
            <div className="estadistica-item"> {/* Cuarto ítem de estadística */}
              <img src={process.env.PUBLIC_URL + '/inicio-icono4.png'} alt="Icono 4" />
              <div className="estadistica-texto">
                <h4>140</h4> {/* Número de ciudades */}
                <p>Ciudades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tercera Cara */}
      <section className="inicio-app"> {/* Sección para promocionar la aplicación móvil */}
        <div className="app-content"> {/* Contenido sobre la aplicación */}
          <h2>Maneja tu negocio desde tu celular</h2> {/* Título de la sección */}
          <p>
            Descarga nuestra aplicación móvil y empieza a manejar tu negocio, administra tus ventas y participa
            de grandes contratos. Date a conocer como proveedor destacado.
          </p>
          <div className="app-buttons"> {/* Botones para descargar la aplicación */}
            <img src={process.env.PUBLIC_URL + '/google-play.png'} alt="Google Play" /> {/* Icono de Google Play */}
            <img src={process.env.PUBLIC_URL + '/app-store.png'} alt="App Store" /> {/* Icono de App Store */}
          </div>
        </div>
        <div className="app-images"> {/* Contenedor para las imágenes de la aplicación */}
          <img src={process.env.PUBLIC_URL + '/inicio-phone1.png'} alt="Phone 1" /> {/* Imagen de un teléfono */}
          <img src={process.env.PUBLIC_URL + '/inicio-phone2.png'} alt="Phone 2" style={{ marginLeft: '-50px' }} /> {/* Segunda imagen de teléfono con margen negativo */}
        </div>
      </section>

    </div>
  );
};

export default Inicio; // Exporta el componente Inicio para ser utilizado en otras partes de la aplicación
