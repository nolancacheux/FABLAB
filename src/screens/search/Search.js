
// 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
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
  const [isCopied, setIsCopied] = useState(false); // Nouvel état pour suivre la copie
  const [loadingProgress, setLoadingProgress] = useState(0); // Nouvel état pour le chargement
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");
  const [apiResponse, setApiResponse] = useState("");
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  

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

  const stopWriting = () => {
    setIsWriting(false);
    setShowActionButtons(true);
    console.log("displayedResponse after stopping writing:", displayedResponse);
  };
   // Simuler l'augmentation du chargement de 1%
   useEffect(() => {
    if (loading && loadingProgress < 100) {
        const timer = setTimeout(() => {
            setLoadingProgress(loadingProgress + 1); // Augmenter de 1% toutes les 100 millisecondes
        }, 80);
        return () => clearTimeout(timer);
    }
}, [loading, loadingProgress]);

  const retry = async () => {
    setDisplayedResponse(""); // Réinitialiser la réponse affichée
    setApiResponse(""); // Réinitialiser la réponse de l'API
    setShowActionButtons(false); // Réinitialiser l'affichage des boutons d'action
    setLoading(true);
    setLoadingProgress(0); // Réinitialiser le pourcentage de chargement
  
    // Première étape (bleue)
    setLoadingMessage("Envoi de la requête...");
    setMessageColor("orange");
  
    setTimeout(async () => {
      // Deuxième étape (blue)
      setLoadingMessage("Traitement en cours...");
      setMessageColor("blue");
  
      const equipmentNames = selectedEquipments.map(id => equipments.find(e => e.id === id).name);
      const prompt = `Tu dois faire une réponse synthétique. Commence ta phrase par : Bonjour cher Fablaber ! ;) puis ensuite à la ligne propose un UNIQUE projet sous forme de réponse structurée (Projet : titre, Description : courte, Niveau difficulté: un mot) avec les équipements suivants : ${equipmentNames.join(", ")}`;
  
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({ prompt })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
  
          // Troisième étape (verte)
          setLoadingMessage("Récupération de la réponse...");
          setMessageColor("green");
          
          setTimeout(() => {
            setApiResponse(data.message); // Stocker toute la réponse
            setLoading(false);
          }, 1000); // Vous pouvez ajuster la durée de la troisième étape selon vos préférences
        } else {
          throw new Error('Erreur lors de la récupération de la réponse de l\'API');
        }
      } catch (error) {
        setApiResponse({ error: error.message }); // Stocker l'erreur
      }
    }, 1000); // Vous pouvez ajuster la durée de la deuxième étape selon vos préférences
    setIsWriting(true); // Commencer l'affichage du texte
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedEquipments.length === 0) {
      setShowError(true);
    } else {
      setLoading(true);
  
      // Première étape (bleue)
      setLoadingMessage("Envoi de la requête...");
      setMessageColor("orange");
  
      setTimeout(async () => {
        // Deuxième étape (blue)
        setLoadingMessage("Traitement en cours...");
        setMessageColor("blue");
  
        const equipmentNames = selectedEquipments.map(id => equipments.find(e => e.id === id).name);
        const prompt = `Tu dois faire une réponse synthétique. Commence ta phrase par : Bonjour cher Fablaber ! ;) puis ensuite à la ligne propose un UNIQUE projet sous forme de réponse structurée (Projet : titre, Description : courte, Niveau difficulté: un mot) avec les équipements suivants : ${equipmentNames.join(", ")}`;
  
        try {
          const response = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({ prompt })
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            // Troisième étape (verte)
            setLoadingMessage("Récupération de la réponse...");
            setMessageColor("green");
  
            setTimeout(() => {
              setApiResponse(data.message);
              setLoading(false);
            }, 1000); // Vous pouvez ajuster la durée de la troisième étape selon vos préférences
          } else {
            throw new Error('Erreur lors de la récupération de la réponse de l\'API');
          }
        } catch (error) {
          setApiResponse(error.message);
        }
      }, 100); // Vous pouvez ajuster la durée de la deuxième étape selon vos préférences
    } 
    setIsWriting(true); // Commencer l'affichage du texte
  };
  
  
  
  
  useEffect(() => {
    let timer;
    if (apiResponse && isWriting) {
      let index = 0;
      timer = setInterval(() => {
        if (index < apiResponse.length) {
          setDisplayedResponse(disp => disp + apiResponse.charAt(index-1));
          index++;
        } else {
          clearInterval(timer);
          setIsWriting(false); // Arrêter d'écrire
          setShowActionButtons(true); // Montrer les boutons d'action automatiquement
        }
      }, 20);
    }
    return () => clearInterval(timer);
  }, [apiResponse, isWriting]);
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayedResponse)
      .then(() => {
        setIsCopied(true); // Mise à jour de l'état après la copie réussie
        setTimeout(() => setIsCopied(false), 2000); // Réinitialisation après 2 secondes
      })
      .catch(err => {
        console.error("Erreur lors de la copie : ", err);
        alert("Erreur lors de la copie dans le presse-papiers.");
      });
  };
  
  

  return (
    <div>
      <Header icon={"search-outline"} title={"IAssistant"} position={true} />
      <div className="search-container">
      {!loading && !displayedResponse && <h1 className="title">IAssistant : des idées pour vos projets !</h1>}
        {loading ? (
          <div className="loader-container">
            <div className="loader" style={{ borderTopColor: messageColor }}></div>
            <p className="loading-text">{loadingProgress}%</p>
            <p style={{ color: messageColor }}>{loadingMessage}</p>
          </div>
        ) : displayedResponse ? (
          <div className="response-container">
             <div className="response-header">
                <div className="header-left">
                  <img src={Chatbot} alt="IASSISTANT" className="response-logo" />
                  <span className="response-title">IASSISTANT</span>
                </div>
                {!isWriting && (isCopied ? (
    <div className="copy-confirmation">&#10004;</div> // Croix de validation
  ) : (
    <button className="copy-button" onClick={copyToClipboard}>📋</button>)
  )}
              </div>
            <div className="response-message">
              {apiResponse && displayedResponse}
            </div>
          
            {!showActionButtons && (
  <button className="stop-writing-button" onClick={stopWriting}>Arrêter d'écrire</button>
)}
          {showActionButtons && (
            <div className="button-container">
              <button className="action-button" onClick={retry}>Réessayer</button>
              <button className="action-button" onClick={() => window.location.reload()}>Retour</button>
            </div>
          )}
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
