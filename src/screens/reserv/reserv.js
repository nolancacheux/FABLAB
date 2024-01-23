import React from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "./reserv.css";
import "../../Hadrien/reset.css";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import BoxFav from "../../components/Boxfavoris/boxfav";
import PB from "../../assets/images/PB.PNG";

class Reserv extends React.Component {
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
        this.setState({ id, prenom, nom, email, mdp })
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
            icon={"print-outline"}
            title={"Réservation"}
            position={false}
          ></Header>
          <section>
            <div className="pf-lst-coeur"></div>
            <div className="pf-gauche">
              <img src={PB} className="pf-imgjaune"></img>
              <h1 className="pf-nom">Réservation</h1>
              <p className="pf-nbfav">{"0"} Bières</p>
            </div>
          </section>
          <Navigation
            reserv={true}
            library={flase}
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
            icon={"print-outline"}
            title={"Réservation"}
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
              <h1 className="pf-nom">Réservation</h1>
              <p className="pf-nbfav">{this.state.data.length} Bières</p>
            </div>
          </section>
          <Navigation
            reserv={true}
            library={false}
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

export default Reserv;
