import React from "react";
import "../../components/header/header.css";
import Logo from "../../assets/images/Logo.png";
import { Link } from 'react-router-dom';

function Header({ icon, title, position , destination}) {
    const headerStyle = {
        position: position ? 'absolute' : 'relative',
    };

    return (
        <header style={headerStyle}> 
        
            <img src={Logo} alt="Logo" />
           <div classname="link-head">
            <Link to= {destination} >
            <div className="head-nomination">
                <ion-icon name={icon} className ="ion-head"></ion-icon>
               
                <h1>{title}</h1>
            </div>
            </Link>
            </div>
        </header>
    );
}

export default Header;
