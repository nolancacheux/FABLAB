import React from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "../../Hadrien/reset.css";
import "../../screens/map/map.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import Bar from "../../assets/images/Bar.jpg";
import Item from "./ItemMap";
import axios from 'axios';
import BeerRech from "./BeerRech";
import { Link } from "react-router-dom";
import DecoupeuseLaserImage from '../../equipements/decoupeuselaser.jpeg';
import Imprimante3DImage from '../../equipements/imprimante3D.jpg';
import PosteElectroniqueImage from '../../equipements/posteelectronique.jpg';
import AtelierClassiqueImage from '../../equipements/atelierclassique.png';
import PlotteurDecoupeImage from '../../equipements/plotteurdecoupe.jpg';
import FraiseuseCNCImage from '../../equipements/fraiseusecnc.png';
import SublimationImage from '../../equipements/sublimation.png';
import Scanner3DImage from '../../equipements/scanner3D.jpg';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      prenom: "",
      nom: "",
      genre: "",
      email: "",
      mdp: "",
      image: null,
      coordinates: {
        lat: 0,
        lng: 0
      },
      bars: [],
      value: 100,
      resultat: [],
      beer_name: 'Cuvée des trolls',
      tabbar: [],
      data: [],
      price: [],
      bar_in_radius: [],
      nbBiereAffiche: 6,
      input: "",
      placeholdersearch: "Rechercher une bière",
      recherchetype: "Rechercher un bar"
    };
  }

  handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (this.state.placeholdersearch === "Rechercher un bar") {

      //MATHIS CODE BAR

    }
    else {
      if (inputValue.length > 3) {
        let url = "http://51.254.38.150:3000/beers/findByName/" + inputValue;
        axios.get(url).then((res) => this.setState({ data: res.data }));
      } else {
        this.setState({ data: [] });
      }
    }
  };
  // ! ---------- Front-End de la page Map ----------//

  render() {
    return (

      <div>
        <Header icon={"map-outline"} title={"Accueil"} position={true} ></Header>
        <div class="slider">
          <input type="radio" name="testimonial" id="t-1" />
          <input type="radio" name="testimonial" id="t-2" />
          <input type="radio" name="testimonial" id="t-3" />
          <input type="radio" name="testimonial" id="t-4" />
          <input type="radio" name="testimonial" id="t-5" checked />
          <input type="radio" name="testimonial" id="t-6" />
          <input type="radio" name="testimonial" id="t-7" />
          <input type="radio" name="testimonial" id="t-8" />
          <h1 style={{ textAlign: "center",visibility:"hidden", fontSize: "2rem",  fontWeight: "bold", marginTop: "20px" }}>Nos équipements</h1>

          <div class="testimonials mb-8">
          <h1 style={{ textAlign: "center", fontSize: "2rem",  fontWeight: "bold", marginBottom: "360px" }}>Nos équipements</h1>

            <label class="item" for="t-1">
              <div class="mycard">
                <p class="cardtitle">Découpeuse laser</p>
                <div>
                  <img src={DecoupeuseLaserImage} alt="Découpeuse laser" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour découper et graver presque tout type de matière rapidement et précisément.</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-2">
              <div class="mycard">
                <p class="cardtitle">Imprimante 3D</p>
                <div>
                  <img src={Imprimante3DImage} alt="Imprimante 3D" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour créer des objets 3d en plastique (pièces de machines, figurines, petits objets...).</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-3">
              <div class="mycard">
                <p class="cardtitle">Poste d'électronique</p>
                <div>
                  <img src={PosteElectroniqueImage} alt="Poste d'électronique" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour tester des circuits, souder, expérimenter avec Arduino, des moteurs, des capteurs, ...</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-4">
              <div class="mycard">
                <p class="cardtitle">Atelier classique</p>
                <div>
                  <img src={AtelierClassiqueImage} alt="Atelier classique" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour scier, percer, coller, assembler, etc... travailler le bois, les métaux et les plastiques.</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-5">
              <div class="mycard">
                <p class="cardtitle">Plotter de découpe</p>
                <div>
                  <img src={PlotteurDecoupeImage} alt="Plotter de découpe" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour découper des stickers dans du vinyle ainsi que d'autres matériaux en feuille ou rouleau.</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-6">
              <div class="mycard">
                <p class="cardtitle">Fraiseuse CNC</p>
                <div>
                  <img src={FraiseuseCNCImage} alt="Fraiseuse CNC" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour usiner du bois ou du plastique...</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-7">
              <div class="mycard">
                <p class="cardtitle">Sublimation</p>
                <div>
                  <img src={SublimationImage} alt="Sublimation" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour personnaliser des objets avec des images.</p>
                </div>
              </div>
            </label>
            <label class="item" for="t-8">
              <div class="mycard">
                <p class="cardtitle">Scanner 3D</p>
                <div>
                  <img src={Scanner3DImage} alt="Scanner 3D" class="cardimg" />
                </div>
                <div>
                  <p class="carddescription">Pour obtenir le modèle 3d d'un objet physique.</p>
                </div>
              </div>
            </label>
          </div>

          <div class="dots">
            <label for="t-1"></label>
            <label for="t-2"></label>
            <label for="t-3"></label>
            <label for="t-4"></label>
            <label for="t-5"></label>
            <label for="t-6"></label>
            <label for="t-7"></label>
            <label for="t-8"></label>
          </div>
        </div>

        <section className="mp-maps" style={{ height: "auto", position: "relative", width: "100%", maxHeight: "calc(100vh - 10vh)", display: "flex", flexWrap: "wrap", }}>

          <button className="mp-btn mp-right" style={{ display: "none", }}>
            <ion-icon name="locate-outline"></ion-icon>
          </button>
          <button className="mp-btn mp-open-slider" style={{ display: "none", }}>
            <ion-icon name="search-outline"></ion-icon>
          </button>
          <div className="mp-slider" style={{ display: "none", }}>
            <button className="mp-btn mp-close-slider"></button>
            <div className="mp-menubar">
              <h1>Hop Pseudo !🍻</h1>
              <div className="mp-search_wrap">
                <button onClick={this.handleClick3}><ion-icon name="search-outline"></ion-icon></button>
                <input type="text" className="mp-input" id="inputBiereMap" placeholder={this.state.placeholdersearch} onKeyUp={this.handleInputChange} />
              </div>
              <ul className="cont_beers">
                {this.state.data.slice(0, this.state.nbBiereAffiche).map((beer, index) => (
                  <div className="click" onClick={this.handleClicke}>
                    <BeerRech beer={beer} key={index} />
                  </div>
                ))}
              </ul>
              <div className="mp-filter">
                <ul className="mp-tabs-box">
                  <button onClick={this.handleClickRecherche}><li className="mp-tab-recherchetype">{this.state.recherchetype}</li></button>
                  <button onClick={this.handleClickM1}><li className="mp-tab">🚶 100m</li></button>
                  <button onClick={this.handleClickM2}><li className="mp-tab">🏃🏻 500m</li></button>
                  <button onClick={this.handleClickM3}><li className="mp-tab">🚗 1km</li></button>
                </ul>
              </div>
              <div id="mp-container">
                {this.state.tabbar.map((item, index) => (
                  <Item
                    key={index}
                    image={Bar}
                    text={"Bar fréquenté"}
                    nom={item}
                    //adresse={"123 Main St, Anytown, USA"}
                    prix={`🍺 ${this.state.price[index]} €`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mp-overlay"></div>
        </section>
        
      <div className="content-container">
      <div className="tableau-container">
        <h1 style={{fontSize: "2rem",marginLeft: "23%",  fontWeight: "bold", marginBottom: "20px" }}>Nos horaires</h1>

        <table className="tableau-horaires">
          <thead>
            <tr>
              <th>Infos pratiques</th>
              <th>LUNDI</th>
              <th>MARDI</th>
              <th>MERCREDI</th>
              <th>JEUDI</th>
              <th>VENDREDI</th>
              <th>SAMEDI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9h40 - 12h30</td>
              <td>Ouvert</td>
              <td>Ouvert</td>
              <td>Ouvert</td>
              <td>Fermé</td>
              <td>Ouvert</td>
              <td>Fermé</td>
            </tr>
            <tr>
              <td>14h00 - 18h00</td>
              <td>Ouvert</td>
              <td>Fermé</td>
              <td>Ouvert</td>
              <td>Ouvert</td>
              <td>Ouvert</td>
              <td>Fermé</td>
            </tr>
          </tbody>
        </table>
      </div>
        <div className="youtube-container">
        <h1 style={{fontSize: "2rem",marginLeft: "36%",  fontWeight: "bold", marginBottom: "20px" }}>Le fablab</h1>

          <iframe
            width="450"  // Largeur réduite
            height="125" // Hauteur réduite (maintient l'aspect ratio 16:9)
            src="https://www.youtube.com/embed/9GxJ6IWBytY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
        <Navigation library={false} search={false} map={true} profil={false} setting={false} position={true} />
      </div>
    );
  }
}

export default Map;
