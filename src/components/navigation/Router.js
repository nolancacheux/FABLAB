import React from 'react'
import '../../Hadrien/reset.css';
import { Link } from 'react-router-dom';

function Router({ icon, text, active }) {
    const activeClass = active ? 'active' : '';
  
    return (
      <li className={`list ${activeClass}`}>
        <Link to={`/${text}`}>
          <span className="nav-icon">
            <ion-icon name={icon}></ion-icon>
          </span>
          <span className="nav-category">{text}</span>
        </Link>
      </li>
    );
  }
  
  export default Router;