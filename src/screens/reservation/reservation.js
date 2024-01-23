import React from "react";
import "./../../screens/setting/setting.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import Header from "./../../components/header/Header";
import "../../Hadrien/reset.css";
import Navigation from "./../../components/navigation/Navigation";
import PP from "../../assets/images/Profil.png";
import { Navigate } from "react-router";
import bcrypt from "bcryptjs";
import { Link } from 'react-router-dom';
class Setting extends React.Component {
  render() {
   
      
    
    return (
      <div>
        <Header
          icon={"qr-code-outline"}
          title={"QR"}
          position={false}
          destination = '/scanner'
        ></Header>
        
        <section
          className="setting"
          style={{
            height: "68vh",
            width: "100%",
            padding: "0px 30px",
            maxHeight: "calc(100vh - 10vh)",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <form
            method="post"
            name="sign-up"
            className="stg-forms"
            id="stg-form"
          >
            <div className="stg-left">
              <h2>Prenom</h2>
              <div className="stg-champ-de-saisie" id="stg-manerror">
                <i className="fas fa-book" id="stg-man" />
                <div className="stg-div">
                  <input
                    type="text"
                    
                    name="prenom"
                    placeholder="Prenom"
                   
                    
                    className="stg-input"
                    id="stg-names"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Nom</h2>
              <div className="stg-champ-de-saisie" id="stg-usererror">
                <i className="fas fa-user" id="stg-homme" />
                <div className="stg-div">
                  <input
                    type="text"    
                    name="nom"
                    placeholder="Nom"
                    className="stg-input"
                    id="stg-username"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Email</h2>
              <div className="stg-champ-de-saisie" id="stg-emailerror">
                <i className="fas fa-envelope" id="stg-lettre" />
                <div className="stg-div">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="stg-input"
                    id="stg-email"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Mot de Passe</h2>
              <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse">
                <i className="fas fa-lock" id="stg-cadenas" />
                <div className="stg-div stg-mdp">
                  <input
                    type="password"
                    spellCheck="false"
                    name="mdp"
                    placeholder="Mot de passe"
                    
                    className="stg-input"
                    id="stg-password"
                    disabled
                  />
                  <span className="stg-show-btn">
                    <i className="fas fa-eye show_hide" />
                  </span>
                </div>
                <div className="stg-indicate">
                  <div className="stg-icon-text">
                    <i
                      className="fas fa-exclamation-circle error_icon"
                      id="stg-exclamation-circle-for-pass"
                    />
                    <h6 className="stg-text" />
                  </div>
                </div>
              </div> 
            </div>
          </form>
        </section>
        <Navigation
          library={false}
          search={false}
          map={false}
          profil={false}
          setting={true}
          position={false}
        />
        ;
      </div>
    );
  }
}

export default Setting;
