import React from 'react';
import { Link } from 'react-router-dom';
import datosProductos from "../assets/productos.json";  

function Inicio() {
    const productos = datosProductos || [];  
    console.log('datosProductos:', datosProductos);  
    console.log('productos:', productos);  

    const productosDestacados = productos.slice(0, 3);  

    return (
        <>
            <section className="banner-bienvenida">
                <div className="banner-contenido">
                    <h1>Bienvenidos a Nuestra Tienda de Ropa</h1>
                    <p>Descubre la mejor colección de blazers, shorts y más. Estilo y comodidad para ti.</p>
                    <Link to="/productos">
                        <button className="boton-ver-productos">Ver Productos</button>
                    </Link>
                </div>
            </section>

            <section className="categorias">
                <h2>Categorías</h2>
                <div className="categorias-grid">
                    <Link to="/productos" className="categoria-card">
                        <i className="fas fa-tshirt"></i>  
                        <h3>Blazers</h3>
                        <p>Estilo elegante</p>
                    </Link>
                    <Link to="/productos" className="categoria-card">
                        <span className='emoji-icono'>👖</span> 
                        <h3>Shorts</h3>
                        <p>Comodidad diaria</p>
                    </Link>
                </div>
            </section>

            <section className="productos-destacados">
                <h2>Productos Destacados</h2>
                <div className="productos-grid">
                    {productosDestacados.length > 0 ? (
                        productosDestacados.map((producto) => (
                            <div key={producto.id} className="producto-card">
                                <img src={producto.avatar} alt={producto.nombre} />
                                <h4>{producto.nombre}</h4>
                                <p>${producto.precio}</p>
                                <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{ producto }}>
                                    <button className="boton-comprar">Ver Detalles</button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos destacados disponibles.</p>
                    )}
                </div>
            </section>

            <section className="testimonios">
                <h2>Lo que dicen nuestros clientes</h2>
                <div className="testimonios-grid">
                    <div className="testimonio">
                        <p>"¡Excelente calidad y envío rápido!"</p>
                        <cite>- Cliente Satisfecho</cite>
                    </div>
                    <div className="testimonio">
                        <p>"Los blazers son perfectos para el trabajo."</p>
                        <cite>- Ana López</cite>
                    </div>
                    <div className="testimonio">
                        <p>"Me encantaron los shorts, muy cómodos."</p>
                        <cite>- Juan Pérez</cite>
                    </div>
                </div>
            </section>

            <section className="beneficios">
                <h2>¿Por Qué Elegirnos?</h2>
                <div className="beneficios-grid">
                    <div className="beneficio">
                        <i className="fas fa-shipping-fast"></i>
                        <h3>Envío Rápido</h3>
                        <p>Entregas en 24-48 hs en CABA.</p>
                    </div>
                    <div className="beneficio">
                        <i className="fas fa-shield-alt"></i>
                        <h3>Garantía de Calidad</h3>
                        <p>Productos duraderos y de primera.</p>
                    </div>
                    <div className="beneficio">
                        <i className="fas fa-headset"></i>
                        <h3>Atención 24/7</h3>
                        <p>Soporte personalizado.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Inicio;