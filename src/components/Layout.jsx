import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../pages/Navbar';  
import Footer from '../pages/Footer';  

function Layout({ children }) {
  useEffect(() => {
    document.title = "Tienda de Ropa ";

    // Función que actualiza meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos (adaptados a blazers y shorts de cuerina)
    updateMetaTag('description', 'Explora nuestra colección de blazers y shorts de cuerina de alta calidad. Encuentra estilos elegantes y modernos para tu guardarropa. Compra en línea con los mejores precios.');
    updateMetaTag('keywords', 'blazers, shorts, cuerina, ropa, blazers de cuero, shorts de cuerina, tienda de ropa, comprar blazers, shorts elegantes');
    updateMetaTag('author', 'Tienda de Ropa - Blazers y Shorts');
    updateMetaTag('robots', 'index, follow');

    // Open Graph para redes sociales (adaptado)
    updateMetaTag('og:title', 'Tienda de Ropa | Blazers y Shorts de Cuerina', 'property');
    updateMetaTag('og:description', 'Descubre blazers y shorts de cuerina premium. Estilos únicos y cómodos para cualquier ocasión.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', window.location.origin + '/logo.jpg', 'property');  
    updateMetaTag('og:url', window.location.origin, 'property');
    updateMetaTag('og:site_name', 'Tienda de Ropa - Blazers y Shorts', 'property');


    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Tienda de Ropa | Blazers y Shorts de Cuerina');
    updateMetaTag('twitter:description', 'Compra blazers y shorts de cuerina en línea con entrega rápida');
    updateMetaTag('twitter:image', window.location.origin + '/logo.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin;

  }, []);

  return (
    <LayoutContainer>
      <Header role="banner">
        <Navbar />
      </Header>
      
      <Main role="main">
        {children}
      </Main>
      
      <FooterWrapper role="contentinfo">
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
}

export default Layout;


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  background-color: transparent;
  z-index: 100;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 0;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  margin-top: auto;
`;