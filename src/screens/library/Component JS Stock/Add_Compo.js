import {useState} from "react";

const Add_Compo = ({ product }) => {
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [inputValue, setInputValue] = useState(product.quantity);
    const [newProductName, setNewProductName] = useState(product.name);
    const [newProductImage, setNewProductImage] = useState(product.image);
};
export default Add_Compo;