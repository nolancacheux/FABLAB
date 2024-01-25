import React, {useState} from "react";
import axios from "axios";
import {handleImageChange, handleImageClick, handleInputChange, handleNameChange} from "../Function";
import ImageAdd from "../Images Compo/addsymbole.png";
import {Refresh} from "react-ionicons";
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
            const response = await axios.post("https://10.224.1.225:1234/stock/upload", formData, {
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

const reloadPage = () => {
    window.location.reload(true);
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
            console.log(document.getElementById('newProductName').value);
            if (document.getElementById('newProductName').value != null) {
                const requestData = {
                    name: document.getElementById('newProductName').value.toString(),
                    quantity: document.getElementById('adminput').value.toString(),
                    image1: imageName,
                };
                console.log(requestData);

                const response = await axios.post('https://10.224.1.225:1234/stock/register1', requestData, {
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