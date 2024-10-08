import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Soporte from './components/Soporte';
import PedidosEmpresa from './components/PedidosEmpresa';
import PedidosProveedor from './components/PedidosProveedor';
import Inicio from './components/Inicio';
import CrearContrato from './components/CrearContrato';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/pedidos-empresa" element={<PedidosEmpresa />} />
          <Route path="/pedidos-proveedor" element={<PedidosProveedor />} />
          <Route path="/crear-contrato" element={<CrearContrato />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

