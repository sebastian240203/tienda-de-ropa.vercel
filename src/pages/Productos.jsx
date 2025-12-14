import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";  
import { useAuthContext } from "../Context/AuthContext"; 
import { useProducts } from "../Context/ProductsContext";  
import { useState, useEffect } from "react";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito, formatearNumeroArgentino } = useCartContext(); 
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [selecciones, setSelecciones] = useState({});  // Agregado: Estado para selecciones de talle y cantidad
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1); 
  const productosPorPagina = 3;

  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

  // Agregado: Función para actualizar selecciones de talle y cantidad
  const actualizarSeleccion = (id, campo, valor) => {
    setSelecciones((prev) => ({
      ...prev,
      [id]: { ...prev[id], [campo]: valor },
    }));
  };

  // Agregado: Función para manejar agregar al carrito con selecciones
  const manejarAgregarAlCarrito = (producto) => {
    const talles = producto.talles ? producto.talles.split('-') : ['S', 'M', 'L'];
    const seleccion = selecciones[producto.id] || { talle: talles[0], cantidad: 1 };
    const cantidadValida = Number(seleccion.cantidad) || 1;
    const productoConSeleccion = {
      ...producto,
      talleSeleccionado: seleccion.talle,
      cantidad: cantidadValida,
    };
    agregarAlCarrito(productoConSeleccion);
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    (producto.categoria && producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };


  useEffect(() => {
    document.title = "Productos  Tienda de Ropa ";

    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Página de productos: catálogo de blazers y shorts de cuerina elegantes y modernos. Encuentra prendas de alta calidad para tu guardarropa.');
    updateMetaTag('keywords', 'blazers, shorts, cuerina, ropa, blazers de cuero, shorts de cuerina, tienda de ropa, comprar blazers, shorts elegantes');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Productos - Tienda de Ropa | Blazers y Shorts de Cuerina', 'property');
    updateMetaTag('og:description', 'Explora nuestro catálogo de blazers y shorts de cuerina. Estilos únicos y cómodos para cualquier ocasión.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', window.location.origin + '/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.origin + '/productos', 'property');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + '/productos';
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header className="container mt-4">
        <h1 className="display-5 fw-bold">Tienda de Ropa</h1>
        <p className="lead text-muted">Filtra por nombre o categoría para encontrar la prenda perfecta.</p>
      </header>

      <div className="container mt-4">
        {/* Barra de búsqueda */}
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Buscar productos</label>
            <input
              type="text"
              placeholder="Buscar por nombre o categoría (ej. blazer, short)..."
              className="form-control"
              value={busqueda}
              onChange={manejarBusqueda}
            />
            {busqueda && (
              <small className="text-muted">
                Mostrando {productosFiltrados.length} de {productos.length} productos
              </small>
            )}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="row">
          {productosActuales.map((producto) => {
            const talles = producto.talles ? producto.talles.split('-') : ['S', 'M', 'L'];
            const seleccion = selecciones[producto.id] || { talle: talles[0], cantidad: 1 };

            return (
              <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                 
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">
                      {producto.descripcion}
                    </p>
                    {/* Precio formateado */}
                    <p className="card-text fw-bold text-primary">
                      ${formatearNumeroArgentino(producto.precio)} {/* Formateado aquí */}
                    </p>
                    
                    {/* Agregado: Selección de talle */}
                    <label>Talle: </label>
                    <select
                      value={seleccion.talle}
                      onChange={(e) => actualizarSeleccion(producto.id, 'talle', e.target.value)}
                      className="form-select mb-2"
                    >
                      {talles.map((talle, index) => (
                        <option key={`${producto.id}-${talle}-${index}`} value={talle}>{talle}</option> 
                      ))}
                    </select>
                    
                    {/* Agregado: Selección de cantidad */}
                    <label>Cantidad: </label>
                    <input
                      type="number"
                      min="1"
                      defaultValue={seleccion.cantidad}
                      onChange={(e) => actualizarSeleccion(producto.id, 'cantidad', Number(e.target.value) || 1)}
                      className="form-control mb-2"
                    />
                    
                    <div className="mt-auto">
                      <div className="d-grid gap-2">
                        <Link
                          to={`/productos/${producto.id}`}
                          state={{producto}}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver detalles
                        </Link>
                        <button
                          onClick={() => manejarAgregarAlCarrito(producto)}
                          className="btn btn-sm"
                          style={{ backgroundColor: '#556B2F', color: 'white' }}
                        >
                          Agregar al carrito
                        </button>
                      </div>

                      {/* Botones de admin */}
                      {esAdmin && (
                        <div className="mt-3 pt-3 border-top">
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => manejarEditar(producto)}
                              className="btn btn-light btn-sm flex-fill"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => manejarEliminar(producto)}
                              className="btn btn-light btn-sm flex-fill"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginador */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Información de la página actual */}  
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}
      </div>
    </>
  );
}
