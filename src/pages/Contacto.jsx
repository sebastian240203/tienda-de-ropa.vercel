import React from 'react';

function Contacto() {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-5">Contacto</h1>
      
      <div className="row g-4">
        {/* Información de Contacto */}
        <div className="col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title h5">Información de Contacto</h2>
              <p className="mb-2"><strong>Dirección:</strong> Avenida San Pedrito 85, Ciudad Autónoma de Buenos Aires</p>
              <p className="mb-2"><strong>Teléfono:</strong> 11 12345678</p>
              <p className="mb-0"><strong>Correo electrónico:</strong> <a href="mailto:atencionalciente@gmail.com" className="text-decoration-none">atencionalciente@gmail.com</a></p>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title h5">Formulario de Contacto</h2>
              <form action="https://formspree.io/f/mblodanw" method="POST">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" name="Nombre" id="nombre" className="form-control" placeholder="Ingrese su nombre" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  <input type="text" name="Apellido" id="apellido" className="form-control" placeholder="Ingrese su apellido" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="Email" id="email" className="form-control" placeholder="Ingrese su email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="consulta" className="form-label">Consulta</label>
                  <textarea name="Consulta" id="consulta" rows="4" className="form-control" placeholder="Escriba aquí su consulta" required></textarea>
                </div>
                <div className="d-flex gap-2">
                  <input type="reset" className="btn btn-outline-secondary" value="Restablecer" />
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title h5">Ubicación</h2>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.123456789!2d-58.46969078292972!3d-34.63186718409279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc98f4fa864ab%3A0x8f73a6c29adc5646!2sARCURI!5e0!3m2!1ses!2sar!4v1698698665998!5m2!1ses!2sar" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0, borderRadius: '8px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de la tienda"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;