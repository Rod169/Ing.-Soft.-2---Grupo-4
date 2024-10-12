// Importamos las dependencias necesarias.
import React, { useState, useEffect } from 'react';  // React y hooks para manejar estado y efectos secundarios.
import { useParams } from 'react-router-dom';  // Permite acceder a parámetros dinámicos en la URL.
import ContratoService from '../ServicioContrato/ContratoService';  // Importamos el servicio que maneja los contratos.
import './FilmarContrato.css';  // Importamos los estilos CSS para este componente.

const FirmarContrato = () => {
  // Extraemos el parámetro 'idContrato' de la URL usando el hook useParams.
  const { idContrato } = useParams();  

  // Declaramos los estados para manejar los participantes y el estado de la firma.
  const [participantes, setParticipantes] = useState([]);  // Guarda la lista de participantes del contrato.
  const [contratoFirmado, setContratoFirmado] = useState(false);  // Marca si el contrato ha sido firmado.

  // useEffect se ejecuta al montar el componente y cada vez que 'idContrato' cambie.
  useEffect(() => {
    // Usamos el servicio para obtener los participantes del contrato basado en 'idContrato'.
    const participantesContrato = ContratoService.obtenerParticipantes(idContrato);
    setParticipantes(participantesContrato);  // Actualizamos el estado con los participantes.
  }, [idContrato]);  // El efecto se ejecuta cada vez que cambia 'idContrato'.

  // Función que firma el contrato para un usuario específico.
  const firmarContrato = (correoUsuario) => {
    // Llamamos al servicio para marcar el contrato como firmado por el usuario.
    ContratoService.firmarContrato(idContrato, correoUsuario);
    setContratoFirmado(true);  // Actualizamos el estado para indicar que el contrato ha sido firmado.
  };

  // Renderizamos el componente.
  return (
    <div className="firmar-contrato-container">  {/* Contenedor principal con estilos CSS */}
      <h1>Firmar Contrato</h1>  {/* Título de la página */}

      {/* Condición: Si el contrato ya fue firmado, mostramos un mensaje de éxito. */}
      {contratoFirmado ? (
        <p>El contrato ha sido firmado con éxito.</p>
      ) : (
        <div>
          <h2>Participantes</h2>  {/* Subtítulo para la lista de participantes */}

          {/* Si hay participantes, los mostramos en una lista; de lo contrario, mostramos un mensaje. */}
          {participantes.length > 0 ? (
            <ul>
              {participantes.map((correo, index) => (
                <li className="listakey" key={index}>  {/* Cada participante es un elemento de la lista */}
                  {correo}  {/* Mostramos el correo del participante */}
                  <button className="botoncorrec" onClick={() => firmarContrato(correo)}>
                    Elegir para firmar contrato
                  </button>  {/* Botón que llama a 'firmarContrato' para este participante */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay participantes para este contrato.</p> /* Si no hay participantes, mostramos este mensaje. */
          )}
        </div>
      )}
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en otros archivos.
export default FirmarContrato;