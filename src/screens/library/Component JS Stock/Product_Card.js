import React, { useState } from "react";
import axios from "axios";
import { handleImageClick, handleInputChange, handleNameChange, onValidate } from "../Function";
import QRCode from "react-qr-code";

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
      <button onClick={handleUpload}>Envoyer l'image</button>
    </div>
  );
};

const ProductCard = ({ product, admin }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [inputValue, setInputValue] = useState(product.quantity);
  const [newProductName, setNewProductName] = useState(product.name);
  const [newProductImage, setNewProductImage] = useState(product.image);

  const closePopup = () => {
    setShowPopup(false);
    setShowPopup1(false);
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
              <input id="newProductName" type="text" placeholder={newProductName} onChange={handleNameChange} />
            </div>

            <div>
              <label htmlFor="adminput">Nouvelle Quantité:</label>
              <input id="adminput" type="text" placeholder={inputValue} onChange={handleInputChange} />
            </div>

            <div>
              <label htmlFor="newProductImage">Nouvelle Image URL:</label>
              <ImageUploader />
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

export default ProductCard;
