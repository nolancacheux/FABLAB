import React, {useState} from "react";
import {handleImageChange, handleImageClick, handleInputChange, handleNameChange, onValidate} from "../Function";
import QRCode from "react-qr-code";

export const ProductCard = ({ product, admin }) => {
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
                <div className="popup1-overlay" >
                    <div className="popup1">
                <span className="close" onClick={closePopup}>
                    &times;
                </span>
                        <div>
                            <label htmlFor="newProductName">Nouveau Nom:</label>
                            <input
                                id="newProductName"
                                type="text"
                                placeholder={newProductName}
                                onChange={handleNameChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="adminput">Nouvelle Quantité:</label>
                            <input
                                id="adminput"
                                type="text"
                                placeholder={inputValue}
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

export default ProductCard;