import React, {useState} from "react";
import axios from "axios";
import {handleImageChange, handleImageClick, handleInputChange, handleNameChange, onValidate} from "../Function";
import ImageAdd from "../Images Compo/addsymbole.png";
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
        imageName = selectedFile.name
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
                            <ImageUploader />
                        </div>
                        <button id="adminbnt" onClick={onValidate(showPopup1,imageName)}>
                            Valider
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Add_Compo;