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
          <Header icon={"cash-outline"} 
          title={"Stockage"} 
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


const ProductCard = ({ product, userData }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [inputValue, setInputValue] = useState(product.quantity);
    const [newProductName, setNewProductName] = useState(product.name);
    const [newProductImage, setNewProductImage] = useState(product.image);
  
    const handleImageClick = () => {
      // Afficher le popup si administrateur
      if (userData && userData.admin) {
        setShowPopup1(true);
      } else setShowPopup(true);
    };
  
    const onValidate = () => {
      const numericValue = parseFloat(inputValue);
      console.log(numericValue);
      if (!isNaN(numericValue)) {
        console.log('Nouveau Stock :', numericValue);
        setShowPopup1(false);
      } else {
        alert('Valeur Fausse Entrer un Nombre');
      }
    };
  
    const closePopup = () => {
      setShowPopup(false);
    };
  
    const closePopup1 = () => {
      setShowPopup1(false);
    };
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleNameChange = (event) => {
      setNewProductName(event.target.value);
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProductImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="product-card">
        <div className="product-image" onClick={handleImageClick}>
          <div className="quantity-overlay">
            <div className="product-quantity"> Quantité disponible: {product.quantity}</div>
          </div>
          <img src={product.image} alt={product.name} />
          <div className="product-name">{product.name}</div>
        </div>
  
        {/* Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <QRCode value="1234567" />
            </div>
          </div>
        )}
        {/* Popup */}
        {showPopup1 && (
            <div className="popup1-overlay">
                <div className="popup1">
                <span className="close" onClick={closePopup1}>
                    &times;
                </span>
                <div>
                    <label htmlFor="newProductName">Nouveau Nom:</label>
                    <input
                        id="newProductName"
                        type="text"
                        placeholder="Enter new name"
                        value={newProductName}
                        onChange={handleNameChange}
                    />
                </div>

                <div>
                    <label htmlFor="adminput">Nouvelle Quantité:</label>
                    <input
                        id="adminput"
                        type="text"
                        placeholder="Enter new quantity"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="newProductImage">Nouvelle Image URL:</label>
                    <input
                        id="newProductImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        />
                </div>
                <button id="adminbnt" onClick={onValidate}>
                    Valider
                </button>
                </div>
            </div>
            )}
      </div>
    );
  };

export default Machine;