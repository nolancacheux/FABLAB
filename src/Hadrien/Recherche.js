import React, { useState } from "react";
import axios from "axios";
import BeerRech from "./BeerRech";

const Recherche = () => {
  const [data, setData] = useState([]);
  const nbBiereAffiche = 6;

  return (
    <div>
      <form>
        <input
          type="text"
          className="inputBiereMap"
          placeholder="Entrer une bière"
          onKeyUp={(e) => {
            let inputValue = e.target.value;
            if (inputValue.length > 3) {
              let url =
                "http://51.254.38.150:3000/beers/findByName/" + inputValue;
              axios.get(url).then((res) => setData(res.data));
            } else {
              setData([]);
            }
          }}
        />
      </form>
      <ul className="cont_beers">
        {data.slice(0, nbBiereAffiche).map((beer, index) => (
          <div
            className="click"
            onClick={(e) => {
              let input = document.querySelector(".inputBiereMap");
              input.value = e.target.outerText;
            }}
          >
            <BeerRech beer={beer} key={index} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Recherche;
