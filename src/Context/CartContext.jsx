import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";  

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [mostrarModalCarrito, setMostrarModalCarrito] = useState(false);
  const [cargaCompleta, setCargaCompleta] = useState(false);  


  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true);  
  }, []);

  useEffect(() => {
    if (cargaCompleta && carrito.length > 0) {  
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else if (cargaCompleta && carrito.length === 0) {
      localStorage.removeItem("carrito"); 
    }
  }, [carrito, cargaCompleta]);


  const formatearNumeroArgentino = (numero) => {
    return numero.toLocaleString('es-AR', { minimumFractionDigits: 0 });
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id && item.talleSeleccionado === producto.talleSeleccionado);  
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id && item.talleSeleccionado === producto.talleSeleccionado
            ? { ...item, cantidad: (item.cantidad || 1) + (producto.cantidad || 1) }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: producto.cantidad || 1 }];
      }
    });
    const talle = producto.talleSeleccionado ? ` (Talle: ${producto.talleSeleccionado})` : '';
    const cantidad = producto.cantidad ? `, Cantidad: ${producto.cantidad}` : '';
    toast(`Producto ${producto.nombre}${talle}${cantidad} agregado.`);  
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };


  const cambiarTalle = (idProducto, nuevoTalle) => {
    setCarrito(prevCarrito => {
      return prevCarrito.map(item => {
        if (item.id === idProducto) {
          const itemExistente = prevCarrito.find(i => i.id === idProducto && i.talleSeleccionado === nuevoTalle);
          if (itemExistente && itemExistente !== item) {
            return null;  
          } else {
            return { ...item, talleSeleccionado: nuevoTalle };
          }
        }
        return item;
      }).filter(item => item !== null);  
    });
  };

  const quitarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map(producto => {
      if (producto.id === idProducto) {
        const cantidadActual = producto.cantidad || 1;
        if (cantidadActual === 1) {
          return null;
        }
        return { ...producto, cantidad: cantidadActual - 1 };
      }
      return producto;
    }).filter(producto => producto !== null);
    setCarrito(carritoActualizado);
  };

  const agregarCantidad = (idProducto) => {
    const nuevoCarrito = carrito.map(producto => {
      if (producto.id === idProducto) {
        return {
          ...producto,
          cantidad: (producto.cantidad || 1) + 1
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    return sum + (Number(item.precio) * cantidad);
  }, 0);


  const value = {  
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    cambiarTalle,  
    mostrarModalCarrito,
    setMostrarModalCarrito,
    // f(x) de Cantidad
    agregarCantidad,
    quitarCantidad,
    // f(x) total
    total,
    formatearNumeroArgentino
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
