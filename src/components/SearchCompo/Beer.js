import React from "react";
import  {Navigate, Link}  from "react-router-dom";
import BubblesComponent from "../animations/bulle";

const SearchBeer = ({beer}) => {
  let srcBeer = "";
  if (beer.img_optimized == null) {
    srcBeer = 'Map.png'; //image par défault si n'existe pas
  } else {
    srcBeer = beer.img_optimized;
  }
  
  return (
      <div key ={beer.id} className="search-item">
        <Link to="/Biere" >
          <button id={beer.id} onClick={(e) => {
            sessionStorage.setItem("BeerId", beer.id);
            
          }}>
            <img src={srcBeer} alt="photo" className="search-image" />
            <span className="text">{beer.name}</span>
          </button>
        </Link>
      </div>
  );
}
export default SearchBeer;
