// Importamos React y el hook useState para manejar el estado del componente
import React, { useState } from 'react';
// Importamos el archivo de estilos CSS para el componente
import './CrearPedido.css';
// Importamos el servicio de pedidos para manejar la lógica relacionada con los pedidos
import PedidoService from '../funcionalidades/ServicioPedido/PedidoService';

const CrearPedido = () => {
  // Definimos el estado para la categoría, producto e imagen del pedido
  const [categoria, setCategoria] = useState(''); // Estado para la categoría seleccionada
  const [producto, setProducto] = useState(''); // Estado para el producto seleccionado
  const [imagen, setImagen] = useState(''); // Estado para la imagen del producto

  // Definimos las categorías y sus productos disponibles
  const categorias = {
    vegetales: ['Papa', 'Quinua', 'Trigo'],
    granos: ['Maiz', 'Arroz', 'Algodon'],
    frutas: ['Kiwicha', 'Canihua'],
  };

  // Maneja el cambio de categoría y reinicia el producto seleccionado
  const manejarCambioCategoria = (e) => {
    setCategoria(e.target.value); // Actualiza la categoría seleccionada
    setProducto(''); // Reinicia la selección de producto cuando cambia la categoría
  };

  // Maneja el cambio de producto y establece la imagen correspondiente
  const manejarCambioProducto = (e) => {
    const seleccionado = e.target.value; // Obtiene el producto seleccionado
    setProducto(seleccionado); // Actualiza el producto
    // Establece la ruta de la imagen basándose en el nombre del producto
    setImagen(`${process.env.PUBLIC_URL}/${seleccionado}.jpg`);
  };

  // Maneja el envío del formulario
  const manejarEnvioFormulario = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Crea un objeto pedido con los datos del formulario
    const pedido = {
      empresa: document.getElementById('empresa').value,
      tipoPedido: document.getElementById('tipoPedido').value,
      cantidad: document.getElementById('cantidad').value,
      fechaPublicacion: document.getElementById('fechaPublicacion').value,
      categoria,
      producto,
      imagen
    };
    
    // Llama al servicio para crear el pedido
    PedidoService.crearPedido(pedido);
    alert('Pedido creado exitosamente'); // Mensaje de éxito

    // Limpia el formulario después de crear el pedido
    document.getElementById('empresa').value = '';
    document.getElementById('tipoPedido').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('fechaPublicacion').value = '';
    setCategoria(''); // Reinicia la categoría
    setProducto(''); // Reinicia el producto
    setImagen(''); // Reinicia la imagen
  };

  return (
    <div className="formulario-pedido-container"> {/* Contenedor del formulario */}
      <h2>Crear Pedido</h2> {/* Título del formulario */}
      <form onSubmit={manejarEnvioFormulario}> {/* Formulario que maneja el envío */}
        {/* Campo para el nombre de la empresa */}
        <label htmlFor="empresa">Nombre de la empresa</label>
        <input type="text" id="empresa" placeholder="Nombre de la empresa" required />

        {/* Campo para seleccionar el tipo de pedido */}
        <label htmlFor="tipoPedido">Tipo de pedido</label>
        <select id="tipoPedido" required>
          <option value="">Selecciona el tipo de pedido</option>
          <option value="programado">Programado</option>
          <option value="recojo en tienda">Recojo en tienda</option>
        </select>

        {/* Campo para ingresar la cantidad */}
        <label htmlFor="cantidad">Cantidad (en Kg)</label>
        <input type="number" id="cantidad" placeholder="Cantidad" required />

        {/* Campo para seleccionar la fecha de publicación */}
        <label htmlFor="fechaPublicacion">Fecha de publicación</label>
        <input type="date" id="fechaPublicacion" required />

        {/* Campo para seleccionar la categoría */}
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" value={categoria} onChange={manejarCambioCategoria} required>
          <option value="">Selecciona una categoría</option>
          <option value="vegetales">Vegetales</option>
          <option value="granos">Granos</option>
          <option value="frutas">Frutas</option>
        </select>

        {/* Si hay una categoría seleccionada, muestra el campo para seleccionar el producto */}
        {categoria && (
          <>
            <label htmlFor="producto">Producto</label>
            <select id="producto" value={producto} onChange={manejarCambioProducto} required>
              <option value="">Selecciona un producto</option>
              {/* Mapea los productos disponibles según la categoría seleccionada */}
              {categorias[categoria].map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn-enviar">
          Crear Pedido
        </button>
      </form>

      {/* Previsualización de la imagen del producto */}
      <div className="imagen-previsualizacion">
        {producto && <img src={imagen} alt={`Previsualización de ${producto}`} />}
      </div>
    </div>
  );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default CrearPedido;
