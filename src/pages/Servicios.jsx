import React from 'react';


function Servicios() {
  return (
    <main className="servicios">
      <h1>Nuestros Servicios</h1>
      
      <section className="servicio">
        <h2>🚚 Envíos y Logística</h2>
        <p>Ofrecemos envíos rápidos y seguros a través de Correo Argentino, OCA y Andreani.</p>
        <ul>
          <li><strong>Envío gratuito:</strong> En compras mayores a $50.000 dentro de CABA.</li>
          <li><strong>Tiempos:</strong> 24-48 hs en CABA, 3-7 días hábiles en el resto del país.</li>
          <li><strong>Seguimiento:</strong> Recibe un código de rastreo por email.</li>
          <li><strong>Cobertura:</strong> Todo Argentina, con tarifas fijas por zona.</li>
        </ul>
      </section>

      <section className="servicio">
        <h2>🔄 Devoluciones y Cambios</h2>
        <p>Tu satisfacción es nuestra prioridad. Aceptamos devoluciones en 30 días.</p>
        <ul>
          <li><strong>Condiciones:</strong> Producto en estado original, con etiquetas.</li>
          <li><strong>Proceso:</strong> Contactanos por WhatsApp o email para coordinar.</li>
          <li><strong>Costo:</strong> Envío de devolución a cargo del cliente (excepto defectos de fábrica).</li>
        </ul>
      </section>

      <section className="servicio">
        <h2>📞 Atención al Cliente</h2>
        <p>Estamos aquí para ayudarte con cualquier consulta.</p>
        <ul>
          <li><strong>Horarios:</strong> Lunes a viernes, 9:00-18:00 hs.</li>
          <li><strong>Canales:</strong> Email: atencionalcliente@gmail.com | Tel: 11 22335587 | WhatsApp.</li>
          <li><strong>Asesoría:</strong> Recomendaciones de tallas y estilos.</li>
        </ul>
      </section>

      <section className="servicio">
        <h2>✨ Servicios Adicionales</h2>
        <p>Agregamos valor a tu experiencia de compra.</p>
        <ul>
          <li><strong>Personalización:</strong> Grabados o diseños a medida (consulta precios).</li>
          <li><strong>Cuidado de la Ropa:</strong> Consejos de lavado y mantenimiento en cada producto.</li>
          <li><strong>Promociones:</strong> Programa de fidelidad con puntos por compras.</li>
        </ul>
      </section>
    </main>
  );
}

export default Servicios;