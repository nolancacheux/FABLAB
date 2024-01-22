import React from "react";
import "../../components/header/header.css";
import Logo from "../../assets/images/Logo.png";

function Header({ icon, title, position }) {
    const headerStyle = {
        position: position ? 'absolute' : 'relative',
    };

    return (
        <header style={headerStyle}>
            <img src={Logo} alt="Logo" />
            <div className="head-nomination">
                <ion-icon name={icon}></ion-icon>
                <h1>{title}</h1>
            </div>
        </header>
    );
}

export default Header;
