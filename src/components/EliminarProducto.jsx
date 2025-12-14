import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;
 
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);  // Agregado para mostrar errores


  if (!producto) {
    return <p>Error: No se encontró el producto a eliminar.</p>;
  }

  const eliminarProducto = async () => {
    setCargando(true);
    setError(null);
    try {

      console.log('Producto a eliminar:', producto);
      console.log('ID del producto:', producto.id);
      console.log('URL de DELETE:', `https://68f805f2f7fb897c6617b5bd.mockapi.io/api/productos/${producto.id}`);
      
      const respuesta = await fetch(`https://68f805f2f7fb897c6617b5bd.mockapi.io/api/productos/${producto.id}`, {
        method: 'DELETE',
      });
     
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      alert('Producto eliminado correctamente.');
     
      navigate('/productos');
      setTimeout(() => {
        window.location.reload();  
      }, 100);
     
    } catch (error) {
      console.error('Error al eliminar:', error.message);
      setError(`Error al eliminar el producto: ${error.message}`);
      alert('Hubo un problema al eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );
   
    if (confirmar) {
      eliminarProducto();
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Eliminar Producto</h2>
     
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ color: '#dc3545' }}>¿Estás seguro de que deseas eliminar este producto?</h3>
       
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Categoría:</strong> {producto.categoria || 'Sin categoría'}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>ID:</strong> {producto.id}</p> 
          {producto.avatar && (
            <img
              src={producto.avatar}
              alt="Producto a eliminar"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>

        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Esta acción no se puede deshacer. El producto será eliminado permanentemente.
        </p>
      </div>

      {/* Muestra el error si ocurre */}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={manejarEliminar}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {cargando ? 'Eliminando...' : 'Sí, Eliminar'}
        </button>
       
        <button
          onClick={() => navigate('/productos')}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EliminarProducto;
