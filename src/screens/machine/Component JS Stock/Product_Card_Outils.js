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
          <div> Outil disponible : {product.reserved ? "NON" : "OUI"}</div>
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
            <QRCode id="qrc" value={product.iD+"/"+sessionStorage.getItem("numberId")} />
            {console.log(product.iD+"/"+sessionStorage.getItem("numberId"))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;