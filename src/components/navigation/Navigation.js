import React from 'react';
import NavigationItem from './Router';
import './navigation.css';

function Navigation({ library, search, map, profil, setting, position }) {
  const list = document.querySelectorAll('.list');

  function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
  }

  list.forEach((item) => item.addEventListener('click', activeLink));

  const footerStyle = {
    position: position ? 'absolute' : 'relative',
  };

  return (
    <footer style={footerStyle}>
      <div className="navigation">
        <span className="nav-credit">© 2024 FabLab, Inc.</span>
        <ul>
          <NavigationItem icon="cash-outline" text="Stockage" active={library} />
          <NavigationItem icon="search-outline" text="IAssistant" active={search} />
          <NavigationItem icon="storefront-outline" text="Accueil" active={map} />
          <NavigationItem icon="happy-outline" text="Profil" active={profil} />
          <NavigationItem icon="construct-outline" text="Paramètre" active={setting} />
          <div className="nav-animation"></div>
        </ul>
        <span className="nav-slogan">Votre système de gestion FabLab</span>
      </div>
    </footer>
  );
}

export default Navigation;


