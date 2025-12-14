import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Agregado: Función para convertir números argentinos 
  const convertirNumeroArgentino = (v) => {
    const texto = String(v || 0);
    return Number(texto.replace(/\./g, '').replace(',', '.')) || 0;
  };

  // Valida el Producto (mejorado con convertirNumeroArgentino)
  const validarProducto = (producto) => {
    const errores = {};

    // nombre
    if (!producto.nombre?.trim()) {
      errores.nombre = 'El nombre es obligatorio.';
    }

    // precio - usando la función de conversión (mejorado)
    if (!producto.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      try {
        const precioNumerico = convertirNumeroArgentino(producto.precio);
        
        if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
          errores.precio = 'Solo números, puntos o comas.';
        } else if (isNaN(precioNumerico)) {
          errores.precio = 'Precio no válido.';
        } else if (precioNumerico <= 0) {
          errores.precio = 'Debe ser mayor a 0.';
        }
      } catch (error) {
        errores.precio = 'Formato de precio inválido.';
      }
    }

    // descripción
    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }

    return errores;
  };

  // Valida el Formulario
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('https://68f805f2f7fb897c6617b5bd.mockapi.io/api/productos');  
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch('https://68f805f2f7fb897c6617b5bd.mockapi.io/api/productos', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      const data = await respuesta.json();
      setProductos(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
  try {
    console.log('Producto a editar:', productoActualizado);  // Agregado
    console.log('ID:', productoActualizado.id, 'Tipo:', typeof productoActualizado.id);  // Agregado
    const respuesta = await fetch(`https://68f805f2f7fb897c6617b5bd.mockapi.io/api/productos/${productoActualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoActualizado),
    });

    if (!respuesta.ok) {
      console.error('Respuesta no ok:', respuesta.status, respuesta.statusText);  // Agregado
      throw new Error('Error al editar el producto');
    }

    const data = await respuesta.json();
    setProductos(prev =>
      prev.map(producto =>
        producto.id === productoActualizado.id ? data : producto
      )
    );
    return data;
  } catch (error) {
    console.error('Error en editarProducto:', error);  // Agregado
    throw error;
  }
};


  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar,
        convertirNumeroArgentino  
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};
