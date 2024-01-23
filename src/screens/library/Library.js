import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import ImageBackground from "../../assets/images/PB.PNG";
import "./library.css"

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


    const handleImageClick = () => {
        // Afficher le popup si administrateur
        if (userData && userData.admin) {
            setShowPopup(true);
        }else setShowPopup1(true);
    };

    const onValidate = () => {
        // Do something with the input value (in this case, log it to the console)
        console.log('Input value:', inputValue);
    
        // Close the popup
        setShowPopup1(false);
    };
  
    const closePopup = () => {
        setShowPopup(false);
    };
    const closePopup1 = () => {
        setShowPopup1(false);
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
            {/* Popup */}
            {showPopup1 && (
                <div className="popup1-overlay">
                    <div className="popup1" style={{ width: 'auto', height: 'auto' }}>
                        <span className="close" onClick={closePopup1}>
                            &times;
                        </span>
                        <QRCode id="qrc" value="1234567" />

                        <input id="adminput" type="text" placeholder="Enter something"/>

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