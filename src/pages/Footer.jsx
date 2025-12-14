import React from 'react';

function Footer() {
    return (
        <footer>
            <hr />
            <p>Desarrollado por: @sebastian.saavedra</p>
            
            
            <div style={{ marginTop: '10px' }}>
                <p>Síguenos en redes sociales:</p>
                <a href="https://www.instagram.com/instagram?igsh=NTc4MTIwNjQ2YQ" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#E4405F', textDecoration: 'none' }}>
                    <i className="fa-brands fa-instagram"></i> Instagram
                </a>
                <a href="https://www.facebook.com/share/1EcReBRHdC/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#1877F2', textDecoration: 'none' }}>
                    <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#25D366', textDecoration: 'none' }}>
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        </footer>
    );
}

export default Footer;
