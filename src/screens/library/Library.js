import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import ImageBackground from "./Images Compo/interrupteur+en+t.png";
import ImageBackground2 from "./Images Compo/ampli+lc+2,3-18+v.png";
import ImageBackground3 from "./Images Compo/amplificateur+af+18v.png";
import ImageBackground4 from "./Images Compo/condensateur+chimique+bizarre.png";
import ImageBackground5 from "./Images Compo/condensateur+chimique+bleu.png";
import "./library.css"
import axios from "axios";
import "./Function.js"

const Library = () => {
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

      /*const data = JSON.stringify({
          'nom':"Ampli lc 2,3-18V",
          'prenom':"Baum",
          'email':"mattbaum288@gmail.com",
          'mdp':"ampli+lc+2,3-18+v.png"
      });

      const baseURL = "https://192.168.184.122:1234/users/register";
      console.log(data);
      const headers = {
          'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
          'Access-Control-Allow-Origin':'*',
      };
      axios.post(baseURL,data,{ headers })
          .then(res => {
              console.log(res.data)
          })*/


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
          destination = '/Machine'
          ></Header>
          <section>
              <div className="product-container">
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground2,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground3,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground4,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
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
            <div> Quantité : {product.quantity}</div>
          </div>
          <img id="img" src={product.image} alt={product.name} />
          <div className="product-name">{product.name}</div>
        </div>
  
        {/* Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <QRCode id="qrc" value="1234567" />
            </div>
          </div>
        )}
        {/* Popup */}
        {showPopup1 && (
            <div className="popup1-overlay">
                <div className="popup1">
                <span className="close" onClick={closePopup}>
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
  
  export default Library;
