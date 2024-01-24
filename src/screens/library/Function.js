export const handleImageClick = (userData, setShowPopup, setShowPopup1) => {
    // Afficher le popup si administrateur
    if (userData && userData.admin) {
        setShowPopup(true);
    } else {
        setShowPopup1(true);
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
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProductImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};