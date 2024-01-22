import React, { useEffect, useState } from "react";
import "./pagebiere.css";
import "../../Hadrien/reset.css";
import "../../screens/login/login.css";
import Navigation from "../navigation/Navigation";
import { BeerOutline, Star } from "react-ionicons";
import { EarthOutline } from "react-ionicons";
import { StorefrontOutline } from "react-ionicons";
import { PieChartOutline } from "react-ionicons";
import { HeartCircleOutline } from "react-ionicons";
import Etoile from "../Etoile/Etoile";
import { data_commentaire } from "./data_commentaire.js";
import Commentaire from "../commentaire/commentaire";
import Stars from "../Etoile/note";
import { ArrowBackOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import e from "cors";

function Pagebiere({
  nom,
  description,
  etoile,
  tarif,
  type,
  pourcentage,
  pays,
  usine,
  biere,
}) {
  const [info, setInfo] = useState("");
  useEffect(() => {
    let popupsBtn = document.querySelectorAll("[data-popup-ref]");
        popupsBtn.forEach((btn) => {
            btn.addEventListener("click", activePopup);
            function activePopup() {
                let popupId = btn.getAttribute("data-popup-ref");
                let popup = document.querySelector(
                    `[data-popup-id='${popupId}']`
                );
                if (popup !== undefined && popup !== null) {
                    let popupContent = popup.querySelector(".lg-popup-content");
                    let closeBtns = popup.querySelectorAll(
                        "[data-dismiss-popup]"
                    );
                    closeBtns.forEach((btn) => {
                        btn.addEventListener("click", onPopupClose);
                    });
                    popup.addEventListener("click", onPopupClose);
                    popupContent.addEventListener("click", (ev) => {
                        ev.stopPropagation();
                    });
                    popup.classList.add("active");
                    setTimeout(() => {
                        popupContent.classList.add("active");
                    }, 1);
                    function onPopupClose() {
                        setTimeout(() => {
                            popup.classList.remove("active");
                        }, 250);
                        popupContent.classList.remove("active");
                    }
                }
            }
        });
  }, []);
  const ajout = () => {
    const email = sessionStorage.getItem("email");
    const beerId = sessionStorage.getItem("BeerId");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://51.254.38.150:3000/connexion/" + email, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { id } = result;

        fetch("http://51.254.38.150:3000/connexion/biere/" + id, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data); // Affiche le tableau dans la console
            // Faites ce que vous souhaitez avec le tableau ici
            // Par exemple, stockez-le dans une variable de l'état de votre composant
            if (data[0] === null) {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var requestOptions2 = {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify({ beerId }), // Convertir le beerId en JSON
                redirect: "follow",
              };

              fetch(
                `http://51.254.38.150:3000/connexion/biere/${id}/${beerId}`,
                requestOptions2
              )
                .then((response) => response.text())
                .then((result) => {
                  console.log(result);
                  setInfo("Votre bière a été ajoutée à vos favoris")
                })
                .catch((error) =>
                  console.log("Erreur lors de la requête PATCH:", error)
                );
            } else {
              const foundBeer = data[0].find((item) => item === beerId);
              if (foundBeer) {
                setInfo("La bière est déjà dans vos favoris")
                return;
              } else {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var requestOptions2 = {
                  method: "PATCH",
                  headers: myHeaders,
                  body: JSON.stringify({ beerId }), // Convertir le beerId en JSON
                  redirect: "follow",
                };

                fetch(
                  `http://51.254.38.150:3000/connexion/biere/${id}/${beerId}`,
                  requestOptions2
                )
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(result);
                    setInfo("Votre bière a été ajoutée à vos favoris")
                  })
                  .catch((error) =>
                    console.log("Erreur lors de la requête PATCH:", error)
                  );
              }
            }
          })
          .catch((error) => {
            console.log("Erreur lors de la récupération du tableau:", error);
          });
      })
      .catch((error) =>
        console.log(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        )
      );
  };

  return (
    <>
      <div className="pb-main_pagebiere">
        <Link to="/Recherche">
          <button>
            {" "}
            <ArrowBackOutline color={"#f7f8fa"} className="pb-button-back" />
          </button>
        </Link>
        <img src={biere} alt="biere test" className="pb-biere"></img>
        <div className="pb-title-container">
          <h1 className="pb-nom">{nom}</h1>
        </div>
        <a data-popup-ref="lg-monPopup"><button onClick={(e) => ajout()}>
       
          <HeartCircleOutline
            color={"#F7F8FA"}
            height="100%"
            width="100%"
            className="pb-coeur-res"
          />
        </button>
        </a>
        <div className="pb-downtel">
          <Etoile nb_etoile={etoile} className="pb-etoile" />
          <p className="pb-tarif">{tarif}</p>
          <p className="pb-description">{description}</p>
          <div className="pb-container_picto">
            <div className="pb-container_biere">
              <BeerOutline
                color={"#000000"}
                height="45%"
                width="45%"
                className="pb-picto_biere"
              />
              <p className="pb-type">{type}</p>
            </div>
            <div className="pb-container_pourcentage">
              <PieChartOutline
                color={"#000000"}
                height="45%"
                width="45%"
                className="pb-picto_pourcentage"
              />

              <p className="pb-pourcentage">{pourcentage}</p>
            </div>
            <div className="pb-container_pays">
              <EarthOutline color={"#000000"} height="45%" width="45%" />
              <p className="pb-pays">{pays}</p>
            </div>
            <div className="pb-container_usine">
              <StorefrontOutline height="45%" width="45%" />
              <p className="pb-usine">{usine}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-deuxiemeP">
        <h1 className="pb-titre-avis">Avis et commentaires</h1>
        <div className="pb-all_commentaire">
          {data_commentaire.map(
            ({ nb_etoile, user, commentaire, key, img }) => {
              return (
                <Commentaire
                  nb_etoile={nb_etoile}
                  user={user}
                  description={commentaire}
                  key={key}
                  photo={img}
                />
              );
            }
          )}
        </div>
        <div className="lg-popup" data-popup-id="lg-monPopup">
                        <div className="lg-popup-content">
                            <span  className="lg-btn-close"  data-dismiss-popup >&times;</span>
                            
                                <h2>Favoris</h2>
                                <p>{info}</p>
                        
                        </div>
                    </div>
        <div className="pb-box-commentaire">
          <div className="pb-notecom">
            <Stars />
          </div>
          <h2 className="pb-titrecom">Laissez votre avis :</h2>
          <textarea className="pb-inputcom" />
          <button className="pb-envoyer">Envoyer</button>
        </div>
      </div>
    </>
  );
}

export default Pagebiere;
