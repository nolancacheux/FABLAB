import {useState} from "react";
import axios from 'axios';
export const handleImageClick = (admin, setShowPopup, setShowPopup1) => {
    // Afficher le popup si administrateur
    if (admin) {
        setShowPopup1(true);
    } else {
        setShowPopup(true);
    }
};

export const onValidate = () => {
    const numericValue = parseFloat(inputValue);
    console.log(numericValue);
    if (!isNaN(numericValue)) {
        console.log('Nouveau Stock :', numericValue);
        setShowPopup1(false);
    } else {
        alert('Valeur Fausse Entrer un Nombre');
    }
};

export const handleInputChange = (event) => {
    setInputValue(event.target.value);
};

export const handleNameChange = (event) => {
    setNewProductName(event.target.value);
};

export const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Affiche le nom du fichier dans la console
        console.log("Nom du fichier :", file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProductImage(reader.result);
        };
        reader.readAsDataURL(file);
        ImageUploader.handleFileChange(event);
    }
};

export const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('https://192.168.184.122:1234/stock/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Réponse du serveur:', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'image:', error.message);
        }
    };

    // Appeler handleFileChange ici directement plutôt que de le retourner
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Télécharger</button>
        </div>
    );
};
