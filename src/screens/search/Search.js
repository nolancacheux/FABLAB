import React, {useState} from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "../../screens/search/search.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";

import SearchBeer from "../../components/SearchCompo/Beer";
import axios from "axios";
import BubblesComponent from "../../components/animations/bulle";

const Search =()=>{
 //! Front-End de la page Search !//
 const [data, setData] = useState([]);

 return (
   <div>
     <Header
       icon={"search-outline"}
       title={"Recherche"}
       position={true}
     ></Header>
     <div>
     <section className="recherche" style={{ height: "auto", width: "100%", maxHeight: `calc(100vh - 10vh)`, display: "flex", flexWrap: "wrap" }}>
         <div className="search">
           <h1>Bière parfaite en temps record</h1>
           <span>
             HopBeer c'est l'appli gratuite qui te permet de trouver et
             découvrir <br />
             la bière parfaite parmi les 220 000 bières référencées
           </span>
           <div className="search-container">
             <button id="search-button">
               <ion-icon name="search-outline"></ion-icon>
               <input
                 type="text"
                 id="search-input"
                 placeholder="Recherche une bière ou une boisson"
                 onKeyUp={(e) => {
                  let inputValue = e.target.value;
                  if (inputValue.length > 3) {
                    let url =
                      "http://51.254.38.150:3000/beers/findByName/" + inputValue;
                    axios.get(url).then((res) => setData(res.data));
                  }
                }}

               />
             </button>
           </div>
            <BubblesComponent />
         </div>
         
         <div className="search-main">
           {data.map((beer, index) => (
            <SearchBeer key={index} beer={beer}/>
           ))}
           
         </div>
       </section>
     </div>
     <Navigation
       library={false}
       search={true}
       map={false}
       profil={false}
       setting={false}
       position={false}
     />
     ;
   </div>
 );
}



export default Search