import React, { useState } from "react";
import axios from "axios";
import { handleImageClick, handleInputChange, handleNameChange, onModificate } from "../Function.js";
import QRCode from "react-qr-code";
var imageName = '';
import config from "../../../configip.js"

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
      const response = await axios.post(`https://${config.ipserveur}:${config.portserveur}/stock/upload`, formData, {
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
      <button onClick={handleUpload}>Envoyer l'image</button>
    </div>
  );
};

const ProductCard = ({ product, admin }) => {
  // Ajout des nouveaux états
  const [pret, setPret] = useState(product.pret);
  const [nbJour, setNbJour] = useState(product.nbJour);
  const [isLate, setIsLate] = useState(product.is_late);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [inputValue, setInputValue] = useState(product.quantity);
  const [newProductName, setNewProductName] = useState(product.name);
  const [newProductImage, setNewProductImage] = useState(product.image);

  const closePopup = () => {
    setNewProductName(String(newProductName));
    setInputValue(String(inputValue));
    setShowPopup(false);
    setShowPopup1(false);
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
              <input id="newProductName" type="text" value={String(newProductName)} onChange={handleNewProductNameChange} />
            </div>

            {/* Ajout des champs pour les nouvelles propriétés */}
            <div>
              <label htmlFor="pret">Prêt (Date):</label>
              <input type="date" value={pret} onChange={(e) => setPret(e.target.value)} />
            </div>
            <div>
              <label htmlFor="nbJour">Nombre d'heures:</label>
              <input type="number" value={nbJour} onChange={(e) => setNbJour(e.target.value)} />
            </div>
            <div>
              <label htmlFor="isLate">En Retard:</label>
              <input type="checkbox" checked={isLate} onChange={(e) => setIsLate(e.target.checked)} />
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


