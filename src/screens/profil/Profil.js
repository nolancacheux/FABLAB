import React from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import PP from '../../assets/images/user.png'
import Wave from "../../assets/images/waving-hand.png";

class Profil extends React.Component {

    //! Back-End pour afficher les données de l'utilisateur //

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            prenom: "",
            nom: "",
            genre: "",
            email: "",
            mdp: "",
            image: "",
            description: "",
            ville: "",
            pays: "",
            emailTmp: "",
            imageAffiche: "",
        };
    }

    componentDidMount() {
        this.recup();
    }

    recup() {
        const email = sessionStorage.getItem("email");
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
      
        fetch("http://51.254.38.150:3000/connexion/" + email, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            const { id, prenom, nom, genre, email, mdp, description, ville, pays, image } = result;
            this.setState({ id, prenom, nom, genre, email, mdp, description, ville, pays, image });
            this.setState({ emailTmp: email }, () => {
                if ((this.state.image !== null) && (this.state.image !== '')) {
                  var requestOptions2 = {
                    method: "GET",
                    redirect: "follow",
                  };
                  fetch("http://51.254.38.150:3000/connexion/photo/" + this.state.image, requestOptions2)
                    .then(response => response.blob())
                    .then(blob => {
                      const imageURL = URL.createObjectURL(blob);
                      this.setState({ imageAffiche: imageURL }, () => {
                        this.forceUpdate(); // Forcer le composant à se rendre à nouveau
                      });
                    })
                    .catch(error => console.log('Erreur lors de la récupération de l\'image :', error));
                } else {
                  this.setState({ imageAffiche: PP }, () => {
                    this.forceUpdate(); // Forcer le composant à se rendre à nouveau
                  });
                }
              });
            return email;
          })
          .catch((error) =>
            console.log(
              "Erreur lors de la récupération des données de l'utilisateur:",
              error
            )
          );
      }
      
      

    

    render() {

        //! Front-End de la page Profil !//

        const { prenom, nom, email } = this.state;
        return (
            <div>
                <Header icon={"happy-outline"} title={"Profil"} position={false}></Header>
                <section className="profil" style={{ height: "70%", width: "100%", padding: "0px 30px", maxHeight: "calc(100vh - 10vh)", flexWrap: "wrap", position: "fixed", display: "flex" }}>
                    <div className="prf-card">
                        <div className="prf-card-inner">
                            <div className="prf-front" style={{backgroundImage: `url(${this.state.imageAffiche})`}}>
                                <h2> {prenom} {nom} </h2>
                                <p>{email}</p>
                                <div className="prf-button-container">
                                    <button className="prf-custom-button">
                                        <ion-icon name="language-outline"></ion-icon>
                                        <span>{this.state.pays}</span>{" "}
                                    </button>
                                    <button className="prf-custom-button">
                                        <ion-icon name="earth-outline"></ion-icon>
                                        <span>{this.state.ville}</span>{" "}
                                    </button>
                                </div>
                            </div>
                            <div className="prf-back">
                                <img src={Wave} alt="" />
                                <h1>
                                    {prenom} <span>{nom}</span>
                                </h1>{" "}
                                <p>{this.state.description}</p>{" "}
                                <div className="prf-row">
                                    <div className="prf-col">
                                        <h2>12</h2>
                                        <p>Notation</p>
                                    </div>
                                    <div className="prf-col">
                                        <h2>234 k</h2>
                                        <p>Abonnés</p>
                                    </div>
                                    <div className="prf-col">
                                        <h2>679</h2>
                                        <p>Suivi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prf-right-block">
                        <div className="prf-phone-only">
                            <h2>  {prenom} {nom}  </h2>
                            <p>{email}</p>
                            <div className="prf-button-container">
                                <button className="prf-custom-button">
                                    <ion-icon name="language-outline"></ion-icon>
                                    <span>{this.state.pays}</span>
                                </button>
                                <button className="prf-custom-button">
                                    <ion-icon name="earth-outline"></ion-icon>
                                    <span>{this.state.ville}</span>
                                </button>
                            </div>
                        </div>
                        <div className="prf-top-right">
                            <div className="prf-block">
                                <ion-icon name="trophy-outline"></ion-icon>
                                <h3>100e</h3>
                                <p>Classement</p>
                            </div>
                            <div className="prf-block">
                                <ion-icon name="beer-outline"></ion-icon>
                                <h3>1700 bières</h3>
                                <p>Bière bue</p>
                            </div>
                            <div className="prf-block">
                                <ion-icon name="star-outline"></ion-icon>
                                <h3>13000</h3>
                                <p>Avis</p>
                            </div>
                            <div className="prf-block">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <h3>2 ans</h3>
                                <p>Membre depuis</p>
                            </div>
                        </div>
                        <div className="prf-bottom-right">
                            <div className="prf-contact">
                                <h3>Restons en contact</h3>
                                <a href="/">
                                    <ion-icon name="mail-open-outline"></ion-icon>
                                    <p>Nous contacter</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="logo-tiktok"></ion-icon>
                                    <p>Tiktok</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <p>Instagram</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <p>Facebook</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </div>
                            <div className="prf-confidence">
                                <h3>Zone légale</h3>
                                <a href="/">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <p>Politique de confidentialité</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="document-text-outline"></ion-icon>
                                    <p>Conditions d'utilisation</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="refresh-outline"></ion-icon>
                                    <p>Réinitialiser l'application</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                                <a href="/">
                                    <ion-icon name="trash-outline"></ion-icon>
                                    <p>Supprimer mes données</p>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <Navigation library={false} search={false} map={false} profil={true} setting={false} position={false}/>;
            </div>
        );
    }
}

export default Profil;
