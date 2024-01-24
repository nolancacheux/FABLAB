import React, {useState} from "react";
import {handleImageChange, handleImageClick, handleInputChange, handleNameChange, onValidate} from "../Function";
import ImageAdd from "../Images Compo/addsymbole.png";

const Add_Compo = ({admin}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        setShowPopup1(false);
    };

    return (
        <div className="product-card">
            <div className="product-image" onClick={() => handleImageClick(admin, setShowPopup, setShowPopup1)}>
                <img id="img" src={ImageAdd} alt="ADD_COMPO" />
                <div className="product-name">Ajout composant</div>
            </div>
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
                            placeholder="Nom du composant"/>
                    </div>
                    <div>
                        <label htmlFor="adminput">Nouvelle Quantité:</label>
                        <input
                            id="adminput"
                            type="text"
                            placeholder={String(0)}
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
                    <button id="adminbnt" onClick={onValidate(showPopup1)}>
                            Valider
                    </button>
                </div>
            </div>
                )}
        </div>
    );
};
export default Add_Compo;