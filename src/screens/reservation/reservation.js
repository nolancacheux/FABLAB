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
import './reservation.css';
import axios from "axios";
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      tmp_id: '',
      tmp_id_user: '',
      name:''
    };
    this.componentDidMount();
    
  }
fonction_valider(){
      event.preventDefault()
      sessionStorage.setItem("scan",'');
      window.location.reload();
    }
componentDidMount() {
  if (sessionStorage.getItem("scan") !== null) {

    const phrase = sessionStorage.getItem("scan")

    const first = phrase.substring(0,phrase.search("/"))
    const second = phrase.substring(phrase.search("/")+1,phrase.length)

  
    this.state.tmp_id_user = second ;
    console.log(this.state.tmp_id_user);
    this.state.tmp_id = first;

    axios.get('https://192.168.184.122:1234/users/' + this.state.tmp_id).then(resp => {
      this.state.name = resp.data;
      console.log(resp.data);
    });

  }
  
  
  if (this.state.tmp_id.substring(0,1) === '1') {
    this.state.type= 1
    console.log(this.state.type)
  
  } else if (this.state.tmp_id.substring(0, 1) === '2') {
    this.state.type= 2
    console.log(this.state.type)
    
  } else if (this.state.tmp_id.substring(0, 1) === '3') {
    this.state.type= 3
    console.log(this.state.type)
    
  }
}
  render() {
    
    console.log(this.state.type + "tkt");
    if(this.state.type == 1){
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
              <div className="resa-left">
                <h2>Prenom & Nom</h2>
                <div className="stg-champ-de-saisie" id="stg-manerror">
                  <i className="fas fa-book" id="stg-man" />
                  <div className="stg-div">
                    <input
                      type="text"
                      
                      name="prenom"
                      placeholder="Prenom & Nom"
                     
                      value= {this.state.name}
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
                <h2>ID utilisateur</h2>
                <div className="stg-champ-de-saisie" id="stg-usererror">
                  <i className="fas fa-user" id="stg-homme" />
                  <div className="stg-div">
                    <input
                      type="text"    
                      name="nom"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-username"
                      value= {this.state.tmp_id_user}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                <h2>ID équipement</h2>
                <div className="stg-champ-de-saisie" id="stg-emailerror">
                  <i className="fa-solid fa-calendar" id="stg-lettre" />
                  <div className="stg-div">
                    <input
                      type="email"
                      name="email"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-email"
                      value= {this.state.tmp_id}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                
               
                <h2>Quantité</h2>
                <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse">
                  <i className="fas fa-loc" id="stg-cadenas" />
                  <div className="stg-div stg-mdp">
                    <input
                      type="number"
                      spellCheck="false"
                      name="mdp"
                      placeholder="Quantité"
                      
                      className="stg-input"
                      id="stg-password"
                      
                    />
                    
                  </div>
                  
                </div> 
                <button className="resa-valider" onClick={this.fonction_valider}> Valider</button>
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
    else if(this.state.type == 2){
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
              <div className="resa-left">
                <h2>Prenom & Nom</h2>
                <div className="stg-champ-de-saisie" id="stg-manerror">
                  <i className="fas fa-book" id="stg-man" />
                  <div className="stg-div">
                    <input
                      type="text"
                      
                      name="prenom"
                      placeholder="Prenom & Nom"
                     
                      value= {this.state.name}
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
                <h2>ID utilisateur</h2>
                <div className="stg-champ-de-saisie" id="stg-usererror">
                  <i className="fas fa-user" id="stg-homme" />
                  <div className="stg-div">
                    <input
                      type="text"    
                      name="nom"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-username"
                      value= {this.state.tmp_id_user}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                <h2>ID équipement</h2>
                <div className="stg-champ-de-saisie" id="stg-emailerror">
                  <i className="fas fa-envelop" id="stg-lettre" />
                  <div className="stg-div">
                    <input
                      type="email"
                      name="email"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-email"
                      value= {this.state.tmp_id}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                
               
                <h2>Nombre de jour :</h2>
                <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse">
                  <i className="fas fa-loc" id="stg-cadenas" />
                  <div className="stg-div stg-mdp">
                    <input
                      type="number"
                      spellCheck="false"
                      name="mdp"
                      placeholder="Nombre de jour"
                      className="stg-input"
                      id="stg-password"
                      
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
                <button className="resa-valider" onClick={this.fonction_valider}>Valider</button>
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
    else if (this.state.type == 3){
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
              <div className="resa-left">
                <h2>Prenom & Nom</h2>
                <div className="stg-champ-de-saisie" id="stg-manerror">
                  <i className="fas fa-book" id="stg-man" />
                  <div className="stg-div">
                    <input
                      type="text"
                      
                      name="prenom"
                      placeholder="Prenom & Nom"
                     
                      value= {this.state.name}
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
                <h2>ID utilisateur</h2>
                <div className="stg-champ-de-saisie" id="stg-usererror">
                  <i className="fas fa-user" id="stg-homme" />
                  <div className="stg-div">
                    <input
                      type="text"    
                      name="nom"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-username"
                      value= {this.state.tmp_id_user}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                <h2>ID équipement</h2>
                <div className="stg-champ-de-saisie" id="stg-emailerror">
                  <i className="fas fa-envelop" id="stg-lettre" />
                  <div className="stg-div">
                    <input
                      type="email"
                      name="email"
                      placeholder="Id utilisateur"
                      className="stg-input"
                      id="stg-email"
                      value= {this.state.tmp_id}
                      disabled
                    />
                    <div className="stg-icones">
                      <i className="fas sucess"></i>
                      <i className="fas error"></i>
                    </div>
                    <small className="stg-message">error message</small>
                  </div>
                </div>
                
               
                <h2>Nombre d'heures</h2>
                <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse">
                  <i className="fa-solid fa-calendar" id="stg-cadenas"></i>
                  <div className="stg-div stg-mdp">
                    <input
                      type="number"
                      spellCheck="false"
                      name="mdp"
                      placeholder="Nombre d'heures"
                      className="stg-input"
                      id="stg-password"
                      
                    />
                    
                  </div>
                </div> 
                <button className="resa-valider" onClick={this.fonction_valider}>Valider</button>
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
}
 

export default Reservation;
