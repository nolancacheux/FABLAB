import {useState} from "react";

const [showPopup, setShowPopup] = useState(false);
const [showPopup1, setShowPopup1] = useState(false);

const handleAddClick = () => {

};

const closePopup = () => {
    setShowPopup(false);
    setShowPopup1(false);
};