import React, {useState} from "react";
import axios from "axios";
import {handleImageChange, handleImageClick, handleInputChange, handleNameChange} from "../Function.js";
import ImageAdd from "../Images Compo/addsymbole.png";
import config from "../../../configip.js"


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

const Add_Compo = ({admin}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        setShowPopup1(false);
    };

    const onValidate = async () => {
        try {
            const name = document.getElementById('newProductName').value;
            const pret = document.getElementById('pret').value;
            const nbHeure = document.getElementById('nbHeure').value;
            const isLate = document.getElementById('isLate').checked;

            if (name) {
                const requestData = {
                    name,
                    pret,
                    nbHeure: parseInt(nbHeure),
                    reserved: isLate,
                    image: imageName, // image est le nom du fichier après le téléchargement
                };

                const response = await axios.post(`https://${config.ipserveur}:${config.portserveur}/stock/register2`, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log('Ajout d\'outil réussi!');
                } else {
                    console.error('Erreur lors de l\'ajout de l\'outil.');
                }

                setShowPopup1(false);
            } else {
                alert('Veuillez entrer un nom pour l\'outil.');
            }
        } catch (error) {
            console.error('Une erreur inattendue est survenue:', error);
        }
    };


    return (
        <div className="product-card">
            <div className="product-image" onClick={() => handleImageClick(admin, setShowPopup, setShowPopup1)}>
                <img id="img" src={ImageAdd} alt="ADD_COMPO" />
                <div className="product-name">Ajout Machine</div>
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
                            <label htmlFor="pret">Prêt (Date):</label>
                            <input type="date" id="pret" />
                        </div>
                        <div>
                            <label htmlFor="nbHeure">Nombre d'heures:</label>
                            <input type="number" id="nbHeure" />
                        </div>
                        <div>
                            <label htmlFor="isLate">En Retard:</label>
                            <input type="checkbox" id="isLate" />
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
export default Add_Compo;