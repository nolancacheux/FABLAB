import React from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "./library.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import BoxFav from "../../components/Boxfavoris/boxfav";
import PB from "../../assets/images/PB.PNG";

class Library extends React.Component {
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
      data: [],
      image: null,
      tab: [],
    };
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
        const { id, prenom, nom, email, mdp } = result;
        this.setState({ id, prenom, nom, email, mdp }, () => {
          fetch(
            "http://51.254.38.150:3000/connexion/biere/" + this.state.id,
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              //console.log(data); // Affiche le tableau dans la console
              // Faites ce que vous souhaitez avec le tableau ici
              // Par exemple, stockez-le dans une variable de l'état de votre composant
              this.setState({ data: data[0] }, () => {});
            })
            .catch((error) => {
              console.log("Erreur lors de la récupération du tableau:", error);
            });
        });
      })
      .catch((error) =>
        console.log(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        )
      );
  }

  componentDidMount() {
    this.recup();
  }

  render() {
    //! Front-End de la page Library !//
    if (this.state.data === null) {
      return (
        <div>
          <Header
            icon={"cash-outline"}
            title={"Stockage"}
            position={false}
          ></Header>
          <section>
            <div className="pf-lst-coeur"></div>
            <div className="pf-gauche">
              <img src={PB} className="pf-imgjaune"></img>
              <h1 className="pf-nom">Favoris</h1>
              <p className="pf-nbfav">{"0"} Bières</p>
            </div>
          </section>
          <Navigation
            library={true}
            search={false}
            map={false}
            profil={false}
            setting={false}
            position={false}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Header
            icon={"cash-outline"}
            title={"Stockage"}
            position={false}
          ></Header>
          <section>
            <div className="pf-lst-coeur">
              {this.state.data.map((beer, index) => (
                <BoxFav key={index} beer={beer} />
              ))}
            </div>
            <div className="pf-gauche">
              <img src={PB} className="pf-imgjaune"></img>
              <h1 className="pf-nom">Favoris</h1>
              <p className="pf-nbfav">{this.state.data.length} Bières</p>
            </div>
          </section>
          <Navigation
            library={true}
            search={false}
            map={false}
            profil={false}
            setting={false}
            position={false}
          />
        </div>
      );
    }
  }
}

export default Library;
