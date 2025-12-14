import React from "react";
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Navbar from './pages/Navbar' 
import Productos from "./pages/Productos";  
import ProductoDetalle from './pages/DetalleProductos'
import Contacto from "./pages/Contacto";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from './pages/Footer' 
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider, useCartContext } from "./Context/CartContext" 
import { ProductsProvider } from "./Context/ProductsContext"
import Dashboard from "./pages/Dashboard";
import FormularioProducto from "./components/FormularioProducto";
import EliminarProducto from "./components/EliminarProducto";
import Layout from "./components/Layout"; 
import CarritoCompras from "./pages/Carrito";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ModalCarritoGlobal() {
  const { mostrarModalCarrito, setMostrarModalCarrito } = useCartContext();
  console.log("ModalCarritoGlobal renderizado, mostrarModalCarrito:", mostrarModalCarrito);  
  if (!mostrarModalCarrito) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <CarritoCompras cerrarModal={() => setMostrarModalCarrito(false)} />
      </div>
    </div>
  );
}

// Error Boundary Simple para el Modal
class ModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en ModalCarritoGlobal:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Error al cargar el carrito. Intenta recargar la página.</p>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Layout>  
              <Routes>
                
                {/* RUTAS PÚBLICAS */}
                <Route path="/" element={<Inicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:id" element={<ProductoDetalle />} />
                <Route path="/productos/:categoria/:id" element={<ProductoDetalle />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                
                {/* RUTAS PROTEGIDA - Usuarios */}
                <Route path="/pagar" element={<RutaProtegida><Pagar /></RutaProtegida>}/>
                
                {/* RUTA PROTEGIDA - para Admins */}
                  <Route path="/dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard /></RutaProtegida>}/>
                 
                  {/* Ruta para formulario Agrega/Edita*/}
                  <Route
                    path="/formulario-producto"
                    element={
                      <RutaProtegida>
                        <FormularioProducto />
                      </RutaProtegida>
                    }
                  />
                 
                  <Route
                    path="/eliminar-producto"
                    element={
                      <RutaProtegida>
                        <EliminarProducto />
                      </RutaProtegida>
                    }
                  />
                 

                  <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
            <ModalErrorBoundary>
              <ModalCarritoGlobal />
            </ModalErrorBoundary>
            <ToastContainer />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
