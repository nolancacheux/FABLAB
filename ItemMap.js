import React from "react";

function Item({image, nom, adresse, prix, text}) {
  return (
    <div className="mp-item">
      <div className="mp-bar">
        <img src={image} alt="Bar" />
        <div className="mp-important">
          <ion-icon className="mp-icon" name="Beer"></ion-icon>
          <span className="mp-text"> {text} </span>
        </div>
      </div>
      <div className="mp-nom">
        <div className="mp-adress">
          <h1>{nom}</h1> 
          <span>{adresse}</span>
        </div>
        <p>{prix}</p>
      </div>
    </div>
  );
}

export default Item;