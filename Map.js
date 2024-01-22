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
              value:100,
              resultat:[],
              beer_name:'Cuvée des trolls',
              tabbar:[],
              data: [],
              price: [],
              bar_in_radius: [],
              nbBiereAffiche: 6,
              input: "",
              placeholdersearch: "Rechercher un bar",
              recherchetype: "Rechercher une bière"
        };
    }

    handleInputChange = (e) => {
        let inputValue = e.target.value;
        if(this.state.placeholdersearch === "Rechercher un bar"){

          //MATHIS CODE BAR

        }
        else{        
        if (inputValue.length > 3) {
          let url = "http://51.254.38.150:3000/beers/findByName/" + inputValue;
          axios.get(url).then((res) => this.setState({ data: res.data }));
        } else {
          this.setState({ data: [] });
        }
      }
      };

      handleClickRecherche = () => {
        if (this.state.recherchetype === "Rechercher un bar") {
          this.setState({ 
            recherchetype: "Rechercher une bière",
            placeholdersearch: "Rechercher un bar"
          });
        } else {
          this.setState({ 
            recherchetype: "Rechercher un bar",
            placeholdersearch: "Rechercher une bière"
          });
        }
      }
    
      handleClicke = (e) => {
        let inpute = document.getElementById("inputBiereMap");
        inpute.value = e.target.outerText;
        this.setState({input: inpute.value})
      };
    
      handleClick = () => {
        this.fetchData();
      };
      
      handleClick3 = () => {
        if(this.state.placeholdersearch == "Rechercher une bière"){
          this.Get_filterbeer();
        }
        else{
          //MATHIS RECHERCHE
        }
      };

    // ! ---------- Radius value modifier ----------//
      handleClickM1 = () => {
        this.setState({value: 100});
        console.log(this.state.value);
      };
    
      handleClickM2 = () => {
        this.setState({value: 500});
        console.log(this.state.value);
      };
    
      handleClickM3 = () => {
        this.setState({value: 1000});
        console.log(this.state.value);
      };
    // ! ---------- Récup bar radius ----------//
      fetchData = async () => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          console.log(latitude);
          console.log(longitude);
          const url = `http://51.254.38.150:3000/beer_bar/50.63433336574836/3.0486852943303195/${this.state.value}`;
          console.log(url);
          fetch(url)
            .then(response => response.json())
            .then(data => {
              this.setState({ bars: data.results, coordinates: { lat: latitude, lng: longitude } })
            })
            .catch(error => console.log(error));
        });
      };
    // ! ---------- Récup bar avec bière in radius ----------//
      Get_filterbeer = async () => {
        const url = `http://51.254.38.150:3000/beer-bar/50.63433336574836/3.0486852943303195/${this.state.value}`;
        console.log(url);
        let temptab = [];
        let temptab2 = [];
        let temptab3 = [];
        console.log (this.state.input)
        fetch(url)
        .then(response => response.json())
        .then(truc => {
          this.setState({ bar_in_radius: truc.results}, () =>{
            for (let v = 0; v < this.state.bar_in_radius.length; v++) {
              temptab.push(this.state.bar_in_radius[v].name);
            }
            this.setState({bar_in_radius: temptab}, () =>{
              temptab=[];
              for (let j = 0; j < this.state.bar_in_radius.length; j++) {
                const urlb = `http://51.254.38.150:3000/beer-bar/barjson/${this.state.bar_in_radius[j]}`;
                console.log(urlb);
                fetch(urlb)
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    if (result && result.length > 0 && result[0].hasOwnProperty('Beer_JSON')) {
                      console.log("fsehfbsufbsefuefusbfsufbsuyfbsefuhsbfuhsefbseufbsufseufbsef")
                      temptab.push(result[0].Beer_JSON);
                      console.log(this.state.bar_in_radius.length)
                      console.log(j)
                      if((j+1)===this.state.bar_in_radius.length){
                        for (let x = 0; x < temptab.length; x++) {
                          let tab = JSON.parse(temptab[x]);
                          console.log("JSON FILE TIME:")
                          console.log(temptab[x])
                          console.log(this.state.bar_in_radius[x])
                          for (let y = 0; y < tab.beer_name.length; y++) {
                            if (tab.beer_name[y] === this.state.beer_name) {
                              console.log(tab.beer_name[y])
                              console.log(tab.price[y])
                              temptab3.push(tab.price[y])
                              temptab2.push(this.state.bar_in_radius[x])
                              this.setState({price: temptab3}, () => {
                                console.log(this.state.price);
                              });
                              console.log(temptab2)
                              console.log(temptab3)
                              this.setState({tabbar:temptab2}, () => {
                                return this.state.tabbar;
                              });
                            }
                          }
                        }
                      }
                    }
                  })
                }
              });
            });
          });
        }

    // ! ---------- Animation Slider ----------//

    componentDidMount() {
            const openSliderBtn = document.querySelector(".mp-open-slider");
            const closeSliderBtn = document.querySelector(".mp-close-slider");
            const slider = document.querySelector(".mp-slider");
            const overlay = document.querySelector(".mp-overlay");
            openSliderBtn.addEventListener("click", function () {
                if (window.innerWidth > 780) {
                    slider.style.transform = "translateX(0)";
                } else {
                    slider.style.transform = "translateY(0)";
                }
                overlay.style.opacity = "1";
                overlay.style.visibility = "visible";
            });
            closeSliderBtn.addEventListener("click", function () {
                if (window.innerWidth > 780) {
                    slider.style.transform = "translateX(-100%)";
                } else {
                    slider.style.transform = "translateY(100%)";
                }
                overlay.style.opacity = "0";
                overlay.style.visibility = "hidden";
            });
            overlay.addEventListener("click", function () {
                if (window.innerWidth > 780) {
                    slider.style.transform = "translateX(-100%)";
                } else {
                    slider.style.transform = "translateY(100%)";
                }
                overlay.style.opacity = "0";
                overlay.style.visibility = "hidden";
            });
            window.addEventListener("orientationchange", function () {
                if (window.innerWidth > 780) {
                    slider.style.transform = "translateX(-100%)";
                } else {
                    slider.style.transform = "translateY(100%)";
                }
                overlay.style.opacity = "0";
                overlay.style.visibility = "hidden";
            });
        

        //! ---------- DragScroll ----------//
        const tabsContainer = document.querySelector(".mp-tabs-box");
        const tabs = tabsContainer.querySelectorAll(".mp-tab");
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                tabs.forEach((tab) => tab.classList.remove("active"));
                tab.classList.add("active");
            });
        });
    }

    // ! ---------- Front-End de la page Map ----------//

    render() {
        return (
            <div>
                <Header icon={"map-outline"} title={"Carte"} position={true} ></Header>
                <div className="mp-day"></div>
                <section  className="mp-maps" style={{ height: "auto",  position: "relative", width: "100%",  maxHeight: "calc(100vh - 10vh)", display: "flex",  flexWrap: "wrap",  }}>  
                    <div className="mp-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20246.980587340433!2d3.0394145999999997!3d50.629483949999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d57e621f9ced%3A0xd27c4853215a4e22!2sZoo%20de%20Lille!5e0!3m2!1sfr!2sfr!4v1684249924874!5m2!1sfr!2sfr" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <button className="mp-btn mp-right">
                        <ion-icon name="locate-outline"></ion-icon>
                    </button>
                    <button className="mp-btn mp-open-slider">
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                    <div className="mp-slider">
                        <button className="mp-btn mp-close-slider"></button>
                        <div className="mp-menubar">
                            <h1>Hop Pseudo !🍻</h1>
                            <div className="mp-search_wrap">
                                <button  onClick={this.handleClick3}><ion-icon name="search-outline"></ion-icon></button>
                                <input  type="text" className="mp-input" id="inputBiereMap" placeholder= {this.state.placeholdersearch} onKeyUp={this.handleInputChange}/>
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
                <Navigation  library={false}  search={false}  map={true} profil={false} setting={false} position={true}/>             
            </div>
        );
    }
}

export default Map;
