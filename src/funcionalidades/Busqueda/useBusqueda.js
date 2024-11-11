import { useState, useEffect } from 'react';

const useBusqueda = (datos) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(datos);

  // Filtrado en tiempo real solo basado en el término de búsqueda
  useEffect(() => {
    const resultados = datos.filter((item) =>
      item.producto.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setDatosFiltrados(resultados);
  }, [terminoBusqueda, datos]);

  const filtrarPorCategoria = () => {
    // Filtrado por categoría que se activa solo al presionar el botón de "Buscar"
    const resultados = datos.filter(
      (item) =>
        item.producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) &&
        (categoriaSeleccionada ? item.categoria === categoriaSeleccionada : true)
    );
    setDatosFiltrados(resultados);
  };

  return {
    terminoBusqueda,
    setTerminoBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    datosFiltrados,
    filtrarPorCategoria,
  };
};

export default useBusqueda;
