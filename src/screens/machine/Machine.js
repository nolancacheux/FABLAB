import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import ImageBackground from "../../assets/images/PB.PNG";
import "./machine.css"

const Machine = () => {
  const [userData, setUserData] = useState({
      id: "",
      prenom: "",
      nom: "",
      genre: "",
      email: "",
      mdp: "",
      data: [],
      image: null,
      tab: [],
  });
  

  useEffect(() => {
      const email = sessionStorage.getItem("email");
      var requestOptions = {
          method: "GET",
          redirect: "follow",
      };

      fetch("http://51.254.38.150:3000/connexion/" + email, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              const { id, prenom, nom, email, mdp } = result;
              setUserData({ id, prenom, nom, email, mdp });
          })
          .catch((error) =>
              console.log(
                  "Erreur lors de la récupération des données de l'utilisateur:",
                  error
              )
          );
  }, []);

  return (
      <div>
          <Header icon={"print-outline"} 
          title={"Machine"} 
          position={false}
          destination = '/Stockage'
          ></Header>
          <section>
              <div className="product-container">
                  <ProductCard
                      product={{
                          name: 'LED Bleu 4V',
                          quantity: 600,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Bleu 4V',
                          quantity: 600,
                          image: ImageBackground,
                      }}
                  />
              </div>
          </section>
          <Navigation
              library={true}
              search={false}
              map={false}
              profil={false}
              setting={false}
              position={false}
          />
      </div>
  );
};


const ProductCard = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
      setShowPopup(true);
  };

  const closePopup = () => {
      setShowPopup(false);
  };

  return (
      <div className="product-card">
          <div className="product-image" onClick={handleImageClick}>
              <div className="quantity-overlay">
                  <div className="product-quantity"> Quantité disponible : {product.quantity}</div>
              </div>
              <img src={product.image} alt={product.name} />
              <div className="product-name">{product.name}</div>
          </div>

          {/* Popup */}
          {showPopup && (
              <div className="popup-overlay">
                  <div className="popup" style={{ width: 'auto', height: 'auto' }}>
                      <span className="close" onClick={closePopup}>
                          &times;
                      </span>
                      <QRCode value="1234567" />
                  </div>
              </div>
          )}
      </div>
  );
};

export default Machine;