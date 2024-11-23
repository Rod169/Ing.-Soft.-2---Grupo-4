import React, { useState } from 'react'; // Importa React y useState para manejar el estado
import './Soporte.css'; // Importa el archivo de estilos CSS para el componente
import NotificacionService from '../funcionalidades/ServicioNotificacion/NotificacionService'; // Importa el servicio de notificaciones

const Soporte = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    tipoProblema: '',
    descripcion: '',
    ayudaPresencial: false,
  });

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Genera la notificación personalizada de soporte
    NotificacionService.agregarNotificacion(
      'Soporte', // Contexto de la notificación
      formData.correo, // Correo del usuario
      formData.tipoProblema, // Tipo de problema
      'soporte', // Tipo de notificación
      `${formData.nombre} ${formData.apellido}` // Nombre completo del usuario
    );

    // Limpia los campos del formulario después del envío
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      tipoProblema: '',
      descripcion: '',
      ayudaPresencial: false,
    });
  };

  // Retorna el JSX que representa la estructura del componente
  return (
    <div className="soporte-container"> {/* Contenedor principal del soporte */}
      <div className="soporte-image"> {/* Contenedor para la imagen de soporte */}
        <img src={process.env.PUBLIC_URL + '/soporte-image.jpg'} alt="Soporte" />
      </div>
      <div className="soporte-form"> {/* Contenedor para el formulario de soporte */}
        <h2>Soporte</h2> {/* Título del formulario */}
        <form onSubmit={handleSubmit}>
          <div className="name-container"> {/* Contenedor para los campos de nombre y apellido */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoProblema">Tipo de problema</label>
            <select
              id="tipoProblema"
              value={formData.tipoProblema}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Tipo de problema
              </option>
              <option value="tecnico">Problema técnico</option>
              <option value="facturacion">Problema de facturación</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción del problema</label>
            <textarea
              id="descripcion"
              rows="4"
              placeholder="Descripción del problema"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="ayudaPresencial"
              checked={formData.ayudaPresencial}
              onChange={handleInputChange}
            />
            <label htmlFor="ayudaPresencial">Deseo recibir ayuda presencial.</label>
          </div>

          <div className="form-group submit-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Exporta el componente Soporte para que pueda ser utilizado en otras partes de la aplicación
export default Soporte;
