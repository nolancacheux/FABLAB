import axios from 'axios';
import config from "../../configip.js"

export const handleImageClick = (admin, setShowPopup, setShowPopup1) => {
    console.log("dnejdnjiqzdiqdiqzd")
    // Afficher le popup si administrateur
    if (admin) {
        console.log("dnejdnjiqzdiqdiqzd")
        setShowPopup1(true);
    } else {
        setShowPopup(true);
    }
};


export const handleImageChange = (event, setSelectedFile) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(file);
        };
        reader.readAsDataURL(file);
    }
};

export const onValidate = async (showPopup1, imageName) => {
    try {
        console.log(document.getElementById('newProductName').value);
        if (document.getElementById('newProductName').value != null) {
            const requestData = {
                name: document.getElementById('newProductName').value.toString(),
                quantity: document.getElementById('adminput').value.toString(),
                image1: imageName,
            };

            const response = await axios.post(`https://${config.ipserveur}:${config.portserveur}/stock/register1`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Ajout réussi!');
            } else {
                console.error('Erreur lors de l\'inscription.');
            }

            showPopup1 = false;
        } else {
            alert('Valeur Fausse Entrer un Nombre');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
    return showPopup1;
};

export const onModificate = async (showPopup1, imageName) => {
    try {
        console.log(document.getElementById('newProductName').value);
        if (document.getElementById('newProductName').value != null) {
            const requestData = {
                name: document.getElementById('newProductName').value.toString(),
                quantity: document.getElementById('adminput').value.toString(),
                image1: imageName,
            };

            const response = await axios.post(`https://${config.ipserveur}:${config.portserveur}/stock/modif1`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Ajout réussi!');
            } else {
                console.error('Erreur lors de l\'inscription.');
            }

            showPopup1 = false;
        } else {
            alert('Valeur Fausse Entrer un Nombre');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
    return showPopup1;
};


const ImageUploader = ({ setSelectedFile }) => {
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        // Your image upload logic here
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Envoyer l'image</button>
        </div>
    );
};

export default ImageUploader;