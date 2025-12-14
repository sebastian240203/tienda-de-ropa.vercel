import { Link, useParams, useLocation } from "react-router-dom";
import styled from 'styled-components';

const ProductoDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto = location.state?.producto;

  if (!producto) {
    return (
      <div className="container-md py-3">
        <div className="alert alert-warning text-center">
          <h4>Producto no encontrado</h4>
          <p>No se pudo cargar la información del producto</p>
          <Link to="/productos" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-md py-3">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Detalles del Producto {id}</h2>
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img 
                src={producto.avatar} 
                alt={producto.nombre} 
                className="img-fluid mb-3 rounded" 
                style={{ maxWidth: '50%' }} 
              />
              <h3 className="card-title">{producto.nombre}</h3>
              <p className="card-text"><strong>Descripción:</strong> {producto.descripcion}</p>
              <p className="card-text"><strong>Talles disponibles:</strong> {producto.talles}</p>
              <p className="card-text fs-4 text-success"><strong>Precio:</strong> ${producto.precio}</p>
            </div>
            <div className="card-footer text-center">
              <Link to="/productos">
                <BotonEstilizado>Volver a Productos</BotonEstilizado>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;

const BotonEstilizado = styled.button`
  background: white;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #31312eff;
    color: white;
  }
`;
