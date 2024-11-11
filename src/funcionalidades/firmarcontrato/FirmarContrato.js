// Importamos las dependencias necesarias.
import React, { useState, useEffect } from 'react'; // React y hooks para manejar estado y efectos secundarios.
import { useParams } from 'react-router-dom'; // Permite acceder a parámetros dinámicos en la URL.
import ContratoService from '../ServicioContrato/ContratoService'; // Importamos el servicio que maneja los contratos.
import './FilmarContrato.css'; // Importamos los estilos CSS para este componente.

const FirmarContrato = () => {
  // Extraemos el parámetro 'idContrato' de la URL usando el hook useParams.
  const { idContrato } = useParams();

  // Declaramos los estados para manejar los participantes, nombres y la firma del contrato.
  const [participantes, setParticipantes] = useState([]); // Guarda la lista de participantes del contrato.
  const [contratoFirmado, setContratoFirmado] = useState(false); // Marca si el contrato ha sido firmado.
  const [empresaNombre, setEmpresaNombre] = useState(''); // Nombre de la empresa.
  const [proveedorNombre, setProveedorNombre] = useState(''); // Nombre del proveedor.
  const [fechaContrato, setFechaContrato] = useState(''); // Fecha del contrato.
  const [mostrarContrato, setMostrarContrato] = useState(false); // Controla si el contrato debe ser mostrado.
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes de aceptación o rechazo.

  // Obtener los datos del usuario registrado desde localStorage
  useEffect(() => {
    const obtenerParticipantes = async () => {
      const participantesContrato = await ContratoService.obtenerParticipantes(idContrato);
      setParticipantes(participantesContrato);
    };
    obtenerParticipantes();

    const obtenerDetallesContrato = () => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      // Busca la empresa y el proveedor en la lista de usuarios
      const empresa = users.find(user => user.accountType === 'empresa');
      const proveedor = users.find(user => user.accountType === 'proveedor');

      if (empresa) {
        setEmpresaNombre(`${empresa.firstName} ${empresa.lastName}`);
      } else {
        setEmpresaNombre('Empresa no especificada');
      }

      if (proveedor) {
        setProveedorNombre(`${proveedor.firstName} ${proveedor.lastName}`);
      } else {
        setProveedorNombre('Proveedor no especificado');
      }

      // Setea la fecha del contrato
      setFechaContrato(new Date().toLocaleDateString());
    };
    obtenerDetallesContrato();
  }, [idContrato]);

  // Función que firma el contrato para un usuario específico y muestra el contrato.
  const firmarContrato = (correoUsuario) => {
    ContratoService.firmarContrato(idContrato, correoUsuario);
    setContratoFirmado(true);
    setMostrarContrato(true);
  };

  const aceptarContrato = () => {
    setMensaje('El contrato ha sido aceptado exitosamente');
  };

  // Función para manejar el rechazo del contrato
  const rechazarContrato = () => {
    setMensaje('El contrato ha sido rechazado');
  };

  return (
    <div className="firmar-contrato-container"> {/* Contenedor principal con estilos CSS */}
      <h1>Firmar Contrato</h1> {/* Título de la página */}

      {/* Condición: Si el contrato ya fue firmado, mostramos el contrato personalizado */}
      {mostrarContrato ? (
        <div className="contenido-contrato">
          <h2>CONTRATO DE COMPRA Y DISTRIBUCIÓN DE PRODUCTOS AGRÓNOMOS</h2>
          <p><strong>{empresaNombre}</strong>, en adelante denominada "La Empresa".</p>
          <p>Y</p>
          <p><strong>{proveedorNombre}</strong>, en adelante denominado "El Proveedor".</p>
          <p>CON LA INTERVENCIÓN DE</p>
          <p>Allpa, como intermediario facilitador de la comunicación entre La Empresa y El Proveedor para la presente transacción comercial.</p>
          <hr />
          <p><strong>CLAUSULAS</strong></p>
          <p><strong>1. Objeto del Contrato</strong></p>
          <p>Este contrato tiene como objeto formalizar el acuerdo entre La Empresa y El Proveedor para la compra y distribución de productos agrónomos, descritos en el Anexo I. Allpa actúa exclusivamente como facilitador de comunicación y no tiene responsabilidad en la ejecución o gestión de pagos.</p>
          <p><strong>2. Derechos y Obligaciones de La Empresa</strong></p>
          <p>2.1. La Empresa tiene derecho a recibir los productos agrónomos en las cantidades y condiciones acordadas.</p>
          <p>2.2. La Empresa es responsable de gestionar el pago directamente con El Proveedor, sin intervención de Allpa en esta fase.</p>
          <p>2.3. La Empresa tiene el derecho de inspeccionar los productos y comunicar a El Proveedor cualquier inconsistencia.</p>
          <p><strong>3. Derechos y Obligaciones de El Proveedor</strong></p>
          <p>3.1. El Proveedor se compromete a suministrar los productos en las especificaciones y tiempos acordados.</p>
          <p>3.2. El Proveedor tiene derecho a recibir el pago directamente de La Empresa y bajo los términos acordados entre ambas partes.</p>
          <p>3.3. El Proveedor se compromete a responder a cualquier requerimiento de calidad que La Empresa manifieste, garantizando la aptitud de los productos para su uso agrícola.</p>
          <p><strong>4. Rol de Allpa como Intermediario</strong></p>
          <p>4.1. Allpa se limita a facilitar la comunicación entre La Empresa y El Proveedor y no es responsable de la calidad, entrega, o pago de los productos.</p>
          <p>4.2. Este contrato, con la intervención de Allpa, da fe de que se ha establecido un acuerdo entre La Empresa y El Proveedor para la venta de los productos descritos, sin que Allpa asuma responsabilidades contractuales más allá de la facilitación de esta comunicación.</p>
          <p><strong>5. Plazo y Vigencia del Contrato</strong></p>
          <p>El presente contrato tendrá vigencia por un periodo de [FECHA DE CONTRATO], renovable automáticamente, a menos que cualquiera de las partes notifique su intención de no renovarlo.</p>
          <p><strong>Fecha del contrato:</strong> {fechaContrato}</p>
          <p><strong>6. Incumplimiento y Rescisión del Contrato</strong></p>
          <p>En caso de incumplimiento, cualquiera de las partes puede rescindir el contrato notificando a la otra con al menos 30 días de antelación. Allpa no será responsable de los efectos de la rescisión.</p>
          <p><strong>7. Jurisdicción y Legislación Aplicable</strong></p>
          <p>Las partes acuerdan someterse a los tribunales de Lima, Perú para cualquier controversia derivada de este contrato.</p>
          <p><strong>8. Validez de la Transacción</strong></p>
          <p>La transacción es válida y ejecutable conforme a las leyes de Perú. Cualquier modificación deberá realizarse por escrito y firmarse por ambas partes.</p>
          <hr />
          {/* Sección de botones para aceptar o rechazar */}
          <div className="botones-contrato">
            <button className="boton-aceptar" onClick={aceptarContrato}>Aceptar</button>
            <button className="boton-rechazar" onClick={rechazarContrato}>Rechazar</button>
          </div>
          {/* Muestra el mensaje de aceptación o rechazo */}
          {mensaje && <p>{mensaje}</p>}
        </div>
      ) : (
        <div>
          <h2>Participantes</h2> {/* Subtítulo para la lista de participantes */}
          {/* Si hay participantes, los mostramos en una lista; de lo contrario, mostramos un mensaje */}
          {participantes.length > 0 ? (
            <ul>
              {participantes.map((correo, index) => (
                <li key={index} className="listakey"> {/* Cada participante es un elemento de la lista */}
                  {correo} {/* Mostramos el correo del participante */}
                  <button className="botoncorrec" onClick={() => firmarContrato(correo)}>
                    Elegir para firmar contrato
                  </button> {/* Botón que llama a 'firmarContrato' para este participante */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay participantes para este contrato.</p> /* Si no hay participantes, mostramos este mensaje */
          )}
        </div>
      )}
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en otros archivos.
export default FirmarContrato;
