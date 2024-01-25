import axios from 'axios';

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