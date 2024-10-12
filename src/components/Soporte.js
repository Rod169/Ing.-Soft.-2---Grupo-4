import React from 'react'; // Importa React para poder usar JSX y crear componentes
import './Soporte.css'; // Importa el archivo de estilos CSS para el componente

// Define el componente funcional Soporte
const Soporte = () => {
  // Retorna el JSX que representa la estructura del componente
  return (
    <div className="soporte-container"> {/* Contenedor principal del soporte */}
      <div className="soporte-image"> {/* Contenedor para la imagen de soporte */}
        {/* Imagen de soporte, su fuente se obtiene desde la carpeta pública */}
        <img src={process.env.PUBLIC_URL + '/soporte-image.jpg'} alt="Soporte" />
      </div>
      <div className="soporte-form"> {/* Contenedor para el formulario de soporte */}
        <h2>Soporte</h2> {/* Título del formulario */}
        <form>
          <div className="name-container"> {/* Contenedor para los campos de nombre y apellido */}
            <div className="form-group"> {/* Grupo de formulario para el nombre */}
              <label htmlFor="nombre">Nombre</label> {/* Etiqueta para el campo de nombre */}
              <input type="text" id="nombre" placeholder="Nombre" required /> {/* Campo de entrada para el nombre */}
            </div>
            <div className="form-group"> {/* Grupo de formulario para el apellido */}
              <label htmlFor="apellido">Apellido</label> {/* Etiqueta para el campo de apellido */}
              <input type="text" id="apellido" placeholder="Apellido" required /> {/* Campo de entrada para el apellido */}
            </div>
          </div>

          <div className="form-group"> {/* Grupo de formulario para el correo */}
            <label htmlFor="correo">Correo</label> {/* Etiqueta para el campo de correo */}
            <input type="email" id="correo" placeholder="Correo" required /> {/* Campo de entrada para el correo */}
          </div>

          <div className="form-group"> {/* Grupo de formulario para el tipo de problema */}
            <label htmlFor="tipo-problema">Tipo de problema</label> {/* Etiqueta para el campo de tipo de problema */}
            <select id="tipo-problema" required> {/* Selector para elegir el tipo de problema */}
              <option value="" disabled selected>Tipo de problema</option> {/* Opción por defecto (desactivada y seleccionada) */}
              <option value="tecnico">Problema técnico</option> {/* Opción para problema técnico */}
              <option value="facturacion">Problema de facturación</option> {/* Opción para problema de facturación */}
              <option value="otros">Otros</option> {/* Opción para otros problemas */}
            </select>
          </div>

          <div className="form-group"> {/* Grupo de formulario para la descripción del problema */}
            <label htmlFor="descripcion">Descripción del problema</label> {/* Etiqueta para el campo de descripción */}
            <textarea id="descripcion" rows="4" placeholder="Descripción del problema" required></textarea> {/* Área de texto para la descripción */}
          </div>

          <div className="form-group checkbox-group"> {/* Grupo de formulario para la opción de ayuda presencial */}
            <input type="checkbox" id="ayuda-presencial" /> {/* Checkbox para solicitar ayuda presencial */}
            <label htmlFor="ayuda-presencial">Deseo recibir ayuda presencial.</label> {/* Etiqueta para el checkbox */}
          </div>

          <div className="form-group submit-group"> {/* Grupo de formulario para el botón de envío */}
            <button type="submit">Enviar</button> {/* Botón para enviar el formulario */}
          </div>
        </form>
      </div>
    </div>
  );
}

// Exporta el componente Soporte para que pueda ser utilizado en otras partes de la aplicación
export default Soporte; 
