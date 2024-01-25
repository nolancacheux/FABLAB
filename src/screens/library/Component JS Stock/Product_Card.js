import React, { useState } from "react";
import axios from "axios";
import { handleImageClick} from "../Function";
import QRCode from "react-qr-code";
var imageName = '';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("Veuillez sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    imageName = selectedFile.name;
    try {
      const response = await axios.post("https://192.168.184.122:1234/stock/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Réponse du serveur:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image:", error.message);
    }
  };

  return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button
            onClick={handleUpload}
            style={{
              padding: '10px',
              backgroundColor: 'var(--tertary)',
              color: 'black',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'white'} // Changer la couleur du texte en blanc au survol
            onMouseOut={(e) => e.target.style.color = 'black'} // Revenir à la couleur d'origine lorsque la souris quitte
        >
          Envoyer l'image
        </button>

      </div>
  );
};

const ProductCard = ({ product, admin }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [inputValue, setInputValue] = useState(product.quantity);
  const [newProductName, setNewProductName] = useState(product.name);
  const [newProductImage, setNewProductImage] = useState(product.image);
  const [newProductId, setNewProductId] = useState(product.iD);

  const closePopup = () => {
    setNewProductName(String(newProductName));
    setInputValue(String(inputValue));
    setShowPopup(false);
    setShowPopup1(false);
  };

    const reloadPage = () => {
        window.location.reload(true);
    };

    const onModificate = async () => {
        try {
            console.log(document.getElementById('newProductName').value);
            if (document.getElementById('newProductName').value != null) {
                console.log("id du produit:"+ newProductId);
                console.log("nom du produit:"+ document.getElementById('newProductName').value.toString());
                console.log("quantité du produit:"+ document.getElementById('adminput').value.toString());
                console.log("image du produit:"+ imageName);
                const requestData = {
                    name: document.getElementById('newProductName').value.toString(),
                    quantity: document.getElementById('adminput').value.toString(),
                    image1: imageName,
                    productId: newProductId
                };

                const response = await axios.post('https://10.224.1.225:1234/stock/modif1', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log('Ajout réussi!');
                    reloadPage();
                } else {
                    console.error('Erreur lors de l\'inscription.');
                }

                setShowPopup1(false);
            } else {
                alert('Valeur Fausse Entrer un Nombre');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNewProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };

  return (
      <div className="product-card">
        <div className="product-image" onClick={() => handleImageClick(admin, setShowPopup, setShowPopup1)}>
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
                  <input id="newProductName" type="text" value={String(newProductName)} onChange={handleNewProductNameChange}/>
                </div>

                <div>
                  <label htmlFor="adminput">Nouvelle Quantité:</label>
                  <input id="adminput" type="text" value={String(inputValue)} onChange={handleInputChange}/>
                </div>

                <div>
                  <label htmlFor="newProductImage">Nouvelle Image URL:</label>
                  <ImageUploader />
                </div>
                <button id="adminbnt" onClick={onModificate}>
                  Valider
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default ProductCard;