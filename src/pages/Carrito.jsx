import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";

export default function CarritoCompras({ cerrarModal }) {  
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, cambiarTalle } = useCartContext();  // Agregado cambiarTalle
  const navigate = useNavigate();

  console.log("CarritoCompras renderizado, carrito:", carrito);

  const manejarVaciar = () => {
    vaciarCarrito(); 
    if (cerrarModal) cerrarModal();
  };

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
    if (cerrarModal) cerrarModal();
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.precio) * (item.cantidad || 1), 0);

  console.log("Total calculado:", total);

  return (
    <div className="carrito-modal">
      <div className="carrito-header">
        <h2>Carrito de Compras</h2>
        <button className="cerrar-modal" onClick={cerrarModal}>×</button>
      </div>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío</p>
      ) : (
        <>
          <div className="carrito-items">
            {carrito.map((item) => {
              const talles = item.talles ? item.talles.split('-') : ['S', 'M', 'L'];  // Tallos del producto
              return (
                <div key={`${item.id}-${item.talleSeleccionado || 'default'}`} className="carrito-item">
                  <img 
                    src={item.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaW4gSW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='}
                    alt={item.nombre} 
                    className="carrito-imagen" 
                  />
                  <div className="carrito-detalles">
                    <h3>{item.nombre}</h3>
                    {/* Nuevo: Selector de talle */}
                    <label>Talle: </label>
                    <select
                      value={item.talleSeleccionado || talles[0]}
                      onChange={(e) => cambiarTalle(item.id, e.target.value)}
                      className="carrito-select-talle"
                    >
                      {talles.map((talle, index) => (
                        <option key={`${item.id}-${talle}-${index}`} value={talle}>{talle}</option>
                      ))}
                    </select>
                    <p>Precio unitario: ${Number(item.precio).toFixed(0)}</p>
                    <div className="carrito-cantidad">
                      <button onClick={() => quitarCantidad(item.id)} className="boton-cantidad">-</button>
                      <span>Cantidad: {item.cantidad || 1}</span>
                      <button onClick={() => agregarCantidad(item.id)} className="boton-cantidad">+</button>
                    </div>
                    <p className="carrito-subtotal">Subtotal: ${(Number(item.precio) * (item.cantidad || 1)).toFixed(0)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="carrito-total">
            <h3>Total: ${Number(total).toFixed(0)}</h3>
          </div>
          <div className="carrito-botones">
            <button onClick={manejarVaciar} className="boton-vaciar">Vaciar Carrito</button>
            <button onClick={irAPagar} className="boton-pagar">Ir a Pagar</button>
          </div>
        </>
      )}
    </div>
  );
}