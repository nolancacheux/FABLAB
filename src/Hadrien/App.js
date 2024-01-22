import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import BeerRech from "./BeerRech";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      tab: []

    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length > 3) {
      let url = "http://51.254.38.150:3000/beers/findByName/" + inputValue;
      axios.get(url).then((res) => this.setState({ data: res.data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleClicke = (e) => {
    let input = document.querySelector(".inputBiereMap");
    input.value = e.target.outerText;
  };

  handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    this.setState({value: newValue});
  };

  handleClick = () => {
    this.fetchData();
  };

  handleClick2 = () => {
    this.Get_ALLbar();
  };

  handleClick3 = () => {
    this.Get_filterbeer();
    //this.Get_filterbeer();
  };

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

  handleClickcenter = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log(latitude);
      console.log(longitude);
      Map.panTo(latitude,longitude);//UserCords = user current latitude, longitude. I suppose you have them!!!
    })
  };

  fetchData = async () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      console.log(latitude);
      console.log(longitude);
      const url = `http://localhost:4000/connexion/50.63433336574836/3.0486852943303195/${this.state.value}`;
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({ bars: data.results, coordinates: { lat: latitude, lng: longitude } })
        })
        .catch(error => console.log(error));
    });
  };

  Get_filterbeer = async () => {
    const url = `http://localhost:4000/connexion/50.63433336574836/3.0486852943303195/${this.state.value}`;
    console.log(url);
    let temptab = [];
    let temptab2 = [];
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({ bar_in_radius: data.results}, () =>{
        for (let v = 0; v < this.state.bar_in_radius.length; v++) {
          temptab.push(this.state.bar_in_radius[v].name);
        }
        this.setState({bar_in_radius: temptab}, () =>{
          temptab=[];
          for (let j = 0; j < this.state.bar_in_radius.length; j++) {
            const urlb = `http://localhost:4000/connexion/barjson/${this.state.bar_in_radius[j]}`;
            console.log(urlb);
            fetch(urlb)
              .then(response => response.json())
              .then(result => {
                if (result && result.length > 0 && result[0].hasOwnProperty('Beer_JSON')) {
                  console.log(result[0].Beer_JSON)
                  temptab.push(result[0].Beer_JSON);
                  if((j+1)===this.state.bar_in_radius.length){
                    for (let x = 0; x < temptab.length; x++) {
                      let tab = JSON.parse(temptab[x]);
                      console.log(tab.beer_name);
                      for (let y = 0; y < tab.beer_name.length; y++) {
                        if (tab.beer_name[y] === this.state.beer_name) {
                          for (let Posca = 0; Posca < this.state.bar_in_radius.length; Posca++) {
                            const url3 = `http://localhost:4000/connexion/Bar_beer/${this.state.beer_name}/${y}/beer/${this.state.bar_in_radius[Posca]}`;
                            console.log(url3)
                            fetch(url3)
                              .then(response => response.json())
                              .then(result => {
                                if (result && result.length > 0 && result[0].hasOwnProperty('Bar_name')) {
                                  temptab2.push(result[0].Bar_name)
                                  console.log(temptab2)
                                  this.setState({tabbar:temptab2}, () => {
                                    return this.state.tabbar;
                                  });
                                }
                              });
                          }
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

  render() {
    const placeholder = 'bars name';
    const { tab, nbBiereAffiche } = this.state;

      return (
        <div>
        <div>
          <form>
            <input
              type="text"
              className="inputBiereMap"
              placeholder="Entrer une bière"
              onKeyUp={this.handleInputChange}
            />
          </form>
          <ul className="cont_beers">
            {tab.slice(0, nbBiereAffiche).map((beer, index) => (
              <div className="click" onClick={this.handleClicke}>
                <BeerRech beer={beer} key={index} />
              </div>
            ))}
          </ul>
        </div>
      <div className="all">
        <div className="searchbar">
          <div className="SearchInputs">
            <input type="text" placeholder={placeholder} onKeyUp={(e) => {
              let inputvalue = e.target.value;
              if (inputvalue.length>3){
                let url = "http://51.254.38.150:3000/beers/findByName/"+ inputvalue;
                axios.get(url).then((res) => {this.setState({data: res.data})
                console.log(this.state.data); 
                });
              }
              
            }}/>
            <button variant="outlined">Reset</button>
            <button className="SearchIcon" onClick={this.handleClick2}>Search Bar</button>
            <button className="SearchIcon" onClick={this.handleClick3}>Search Bar by beer_name</button>
            <button className="SearchIcon" onClick={this.handleClick}>Search</button>
            <button className="MFilter_1" onClick={this.handleClickM1}>100M</button>
            <button className="MFilter_2" onClick={this.handleClickM2}>500M</button>
            <button className="MFilter_3" onClick={this.handleClickM3}>1KM</button>
            <button className="Recenter" onClick={this.handleClickcenter}>recentrer</button>
            <div className="slider-container">
            <input
              type="range"
              min={100}
              max={5000}
              value={this.state.value}
              className="slider"
              onChange={this.handleChange}
            />
            <div className="value">Recherche de bars à {this.state.value} M</div>
          </div>
          </div>
          <div className="Results">
          {this.state.tabbar.map((bar) => (
              <li>{bar}</li>
            ))}
          </div>
          <div className="Results">
          {this.state.bars.map((bar) => (
              <li key={bar.place_id}>{bar.name}</li>
            ))}
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={this.state.coordinates}
            center={this.state.coordinates}
            defaultZoom={15}
            margin={[50, 50, 50, 50]}
            options={''}
          ></GoogleMapReact>
        </div>
      </div>
      </div>
    );
  }
}

export default App;