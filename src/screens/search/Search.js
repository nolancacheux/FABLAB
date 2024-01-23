
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "./search.css";
import "../../Hadrien/reset.css";
import React, { useState, useEffect } from "react";

import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";

import Chatbot from "../../assets/images/chatbot.png";

import DecoupeuseLaserImage from '../../equipements/decoupeuselaser.jpeg';
import Imprimante3DImage from '../../equipements/imprimante3D.jpg';
import PosteElectroniqueImage from '../../equipements/posteelectronique.jpg';
import AtelierClassiqueImage from '../../equipements/atelierclassique.png';
import PlotteurDecoupeImage from '../../equipements/plotteurdecoupe.jpg';
import FraiseuseCNCImage from '../../equipements/fraiseusecnc.png';
import SublimationImage from '../../equipements/sublimation.png';
import Scanner3DImage from '../../equipements/scanner3D.jpg';

const Search = () => {
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");

  const equipments = [
    { id: 1, name: "  Découpeuse laser", description: "Pour découper et graver presque tout type de matière.", image: DecoupeuseLaserImage },
    { id: 2, name: "  Imprimante 3D", description: "Pour créer des objets 3D en plastique.", image: Imprimante3DImage },
    { id: 3, name: "  Poste d'électronique", description: "Pour tester des circuits, souder, expérimenter avec Arduino, etc.", image: PosteElectroniqueImage },
    { id: 4, name: "  Atelier classique", description: "Pour scier, percer, coller, assembler, etc.", image: AtelierClassiqueImage },
    { id: 5, name: "  Plotter de découpe", description: "Pour découper des stickers dans du vinyle et autres matériaux.", image: PlotteurDecoupeImage },
    { id: 6, name: "  Fraiseuse CNC", description: "Pour usiner du bois ou du plastique.", image: FraiseuseCNCImage },
    { id: 7, name: "  Sublimation", description: "Pour personnaliser des objets avec des images.", image: SublimationImage },
    { id: 8, name: "  Scanner 3D", description: "Pour obtenir le modèle 3D d'un objet physique.", image: Scanner3DImage }
  ];


  const handleCheckboxChange = (equipmentId) => {
    setSelectedEquipments((prev) => {
      if (prev.includes(equipmentId)) {
        return prev.filter((id) => id !== equipmentId);
      } else {
        return [...prev, equipmentId];
      }
    });
  };

  

  useEffect(() => {
    if (loading) {
      const timeouts = [];
      timeouts.push(setTimeout(() => {
        setLoadingMessage("Notre assistant prépare la réponse");
        setMessageColor("brown");
      }, 3000));
      timeouts.push(setTimeout(() => {
        setLoadingMessage("Notre assistant a bientôt terminé");
        setMessageColor("green");
      }, 6000));
      timeouts.push(setTimeout(() => {
        setLoading(false);
      }, 9000));

      return () => timeouts.forEach(clearTimeout);
    }
  }, [loading]);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedEquipments.length === 0) {
        setShowError(true);
      } else {
        setLoading(true);
        setLoadingMessage("Notre assistant traite votre requête");
        setMessageColor("blue");
        setShowError(false);
      }
    };
  
    useEffect(() => {
      let timer1, timer2, timer3;
      if (loading) {
        timer1 = setTimeout(() => {
          setLoadingMessage("Notre assistant prépare la réponse");
          setMessageColor("brown");
        }, 3000);
        timer2 = setTimeout(() => {
          setLoadingMessage("Notre assistant a bientôt terminé");
          setMessageColor("green");
        }, 6000);
        timer3 = setTimeout(() => {
          setLoading(false);
          // Ici, vous pouvez afficher le contenu final après le chargement
        }, 9000);
      }
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }, [loading]);
  
    return (
      <div>
        <Header icon={"search-outline"} title={"IAssistant"} position={true} />
        <div className="search-container">
          <h1>IAssistant : des idées pour vos projets !</h1>
          {loading ? (
            <div className="loader-container">
              <div className="loader" style={{ borderTopColor: messageColor }}></div>

              <p style={{ color: messageColor }}>{loadingMessage}</p>
            </div>
          ) : (
            <div className="content-row">
              <div className="search-image">
                <img src={Chatbot} alt="Intelligence Artificielle" />
              </div>
              <form onSubmit={handleSubmit} className="equipment-form">
                <p className="form-heading">Sélectionnez les équipements que vous souhaitez pour votre projet :</p>
                {showError && <p className="error-message">Veuillez sélectionner au moins un équipement.</p>}
              {equipments.map((equipment) => (
                <div key={equipment.id} className="equipment-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedEquipments.includes(equipment.id)}
                      onChange={() => handleCheckboxChange(equipment.id)}
                    />
                    <span className="equipment-name">{equipment.name}</span>: <span className="equipment-description">{equipment.description}</span>
                  </label>
                </div>
              ))}
              <button type="submit" className="submit-btn">Envoyer</button>
            </form>
          </div>
          )}
        </div>
        <Navigation library={false} search={true} map={false} profil={false} setting={false} position={false} />
      </div>
    );
};

export default Search;
