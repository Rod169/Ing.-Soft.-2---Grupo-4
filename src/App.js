// Importamos React necesario para crear componentes.
import React from 'react';

// Importamos los estilos CSS asociados al componente principal.
import './App.css';

// Importamos los componentes necesarios de react-router-dom para manejar las rutas de la aplicación.
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importamos los componentes que forman las distintas partes de la interfaz.
import Header from './components/Header'; // El encabezado que estará presente en todas las páginas.
import Login from './components/Login'; // Pantalla de inicio de sesión.
import Signup from './components/Signup'; // Pantalla de registro de usuarios.
import Soporte from './components/Soporte'; // Página de soporte para ayuda técnica.
import PedidosEmpresa from './components/PedidosEmpresa'; // Vista de pedidos desde la perspectiva de una empresa.
import PedidosProveedor from './components/PedidosProveedor'; // Vista de pedidos desde la perspectiva de un proveedor.
import Inicio from './components/Inicio'; // Página de inicio.
import CrearContrato from './components/CrearContrato'; // Página para crear un contrato.
import RestablecerContraseña from './funcionalidades/RestablecerPassword/RestablecerContraseña'; // Pantalla para restablecer la contraseña.
import NotificacionesProveedor from './funcionalidades/NotificacionesProveedor/NotificacionesProveedor'; // Notificaciones para proveedores.
import FirmarContrato from './funcionalidades/firmarcontrato/FirmarContrato'; // Pantalla para firmar un contrato.
import Footer from './components/Footer'; // Pie de página que aparece en todas las vistas.

function App() {
  return (
    // Configuramos el Router.
    <Router>
      <div className="App">
        {/* Renderizamos el componente Header en la parte superior de la aplicación */}
        <Header />

        {/* Definimos las rutas dentro de Routes. Cada Route representa una vista distinta. */}
        <Routes>
          {/* Redirige desde la raíz '/' hacia la página de inicio */}
          <Route path="/" element={<Navigate to="/inicio" />} />

          {/* Ruta para la pantalla de inicio de sesión */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para la pantalla de registro */}
          <Route path="/signup" element={<Signup />} />

          {/* Ruta para la página de inicio */}
          <Route path="/inicio" element={<Inicio />} />

          {/* Ruta para la página de soporte */}
          <Route path="/soporte" element={<Soporte />} />

          {/* Ruta para ver los pedidos de la empresa */}
          <Route path="/pedidos-empresa" element={<PedidosEmpresa />} />

          {/* Ruta para ver los pedidos del proveedor */}
          <Route path="/pedidos-proveedor" element={<PedidosProveedor />} />

          {/* Ruta para la pantalla de creación de contratos */}
          <Route path="/crear-contrato" element={<CrearContrato />} />

          {/* Ruta para restablecer la contraseña */}
          <Route path="/restablecer-contraseña" element={<RestablecerContraseña />} />

          {/* Ruta para ver las notificaciones del proveedor */}
          <Route path="/notificaciones" element={<NotificacionesProveedor />} />

          {/* Ruta dinámica para firmar un contrato, que recibe un parámetro idContrato */}
          <Route path="/firmar-contrato/:idContrato" element={<FirmarContrato />} />
        </Routes>

        {/* Renderizamos el componente Footer en la parte inferior de la aplicación */}
        <Footer />
      </div>
    </Router>
  );
}

// Exportamos el componente App para que pueda ser usado en otros archivos (como index.js).
export default App;