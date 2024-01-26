import React from "react";
import "./../../screens/setting/setting.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import Header from "./../../components/header/Header";
import "../../Hadrien/reset.css";
import Navigation from "./../../components/navigation/Navigation";
import config from "./../../configip";

import './reservation.css';
import axios from "axios";

if (process.env.REACT_APP_NOWARNINGS === 'true') {
    console.warn = () => {}; // Désactive les avertissements console.warn
    console.error = () => {}; // Désactive les avertissements console.error
  }

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      tmp_id: '',
      tmp_id_user: '',
      name:'',
      duree:'',
      quantite:undefined,
      borderColor: 'transparent',
      quantite_txt: '',
      quantite_ok: false
    };
    //this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidMount();
    this.handleChange = this.handleChange.bind(this);
    this.fonction_valider = this.fonction_valider.bind(this);
    
  }
  handleChange = (event) => {
    
    this.state.duree = event.target.value;
    if(parseInt(this.state.duree) > this.state.quantite){
      console.log("ta daronne y'en a plus");
      this.setState(
        {
          borderColor :'red',
          quantite_txt: 'insufisante',
          quantite_ok: true
        }
      )
      
    }
    else{
      this.setState(
        {
          borderColor :'transparent',
          quantite_txt: '',
          quantite_ok: false
        }
      )
    }
  };
fonction_valider(){
      event.preventDefault()
      const baseURL = `https://${config.ipserveur}:${config.portserveur}/reservation`;
      const data = JSON.stringify({
      'iduser':this.state.tmp_id_user,
      'idequipement':this.state.tmp_id,
      'duree': this.state.duree,
      'type':this.state.type

      });
      console.log(data);
      const headers = {
          'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
          'Access-Control-Allow-Origin':'*',
      };
      axios.post(baseURL,data,{ headers })
            .then(res => {
          console.log(res)
         // window.location.reload();
      })
      sessionStorage.setItem("scan",'');
      this.setState(
        {
          type: 1,
          tmp_id: '',
          tmp_id_user: '',
          name:'',
          duree:'',
          quantite:undefined,
          borderColor: 'transparent',
          quantite_txt: '',
          quantite_ok: false
        }
      )  

    }
componentDidMount() {
  

  if (sessionStorage.getItem("scan") !== null) {

    const phrase = sessionStorage.getItem("scan")

    const first = phrase.substring(0,phrase.search("/"))
    const second = phrase.substring(phrase.search("/")+1,phrase.length)

    const baseURL = `https://${config.ipserveur}:${config.portserveur}/reservation/${first}`;

        axios.get(baseURL).then((resp) => {
          this.setState({
            quantite: resp.data,
            
          }
          )
          console.log(this.state.quantite);
        }
        );
    
    this.setState(
      {
        tmp_id_user: second,
        tmp_id: first,
      },
      () => {
        const baseURL = `https://${config.ipserveur}:${config.portserveur}/users/${this.state.tmp_id_user}`;

        axios.get(baseURL).then((resp) => {
          this.setState({
            name: resp.data,
          });
          console.log(resp.data);
          console.log(this.state)
          console.log(this.state.tmp_id +"ok");
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
        });
      }
    );
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
                
               
                <h2>Quantité {this.state.quantite_txt}</h2>
                <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse" style={{border: `2px solid ${this.state.borderColor} `}}>
                  <i className="fas fa-loc" id="stg-cadenas" />
                  <div className="stg-div stg-mdp">
                    <input
                      type="number"
                      spellCheck="false"
                      name="mdp"
                      placeholder="Quantité"
                      
                      className="stg-input"
                      id="stg-password"
                      onChange={this.handleChange}
                      
                    />
                    
                  </div>
                  
                </div> 
                <button className="resa-valider" onClick={this.fonction_valider} disabled = {this.state.quantite_ok}> Valider</button>
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
                  <i className="fa-solid fa-calendar" id="stg-cadenas" />
                  <div className="stg-div stg-mdp">
                    <input
                      type="number"
                      spellCheck="false"
                      name="mdp"
                      placeholder="Nombre de jour"
                      className="stg-input"
                      id="stg-password"
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
