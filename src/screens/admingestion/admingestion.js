import React, { useState, useEffect } from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "./admingestion.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import syb from './addsymbole.png'
import Wave from "../../assets/images/waving-hand.png";
import QRCode from 'qrcode'
import config from "../../configip";
import axios from "axios";
import { render } from "@testing-library/react";
function boutonrendre(id){
  const baseURL = `https://${config.ipserveur}:${config.portserveur}/reservation/rendre/${id}`;
    console.log(baseURL)
    axios.get(baseURL).then((resp) => {
      console.log("ook");
      window.location.reload();
      
    }
    );
}
function Admingestion() {
    const [url, setUrl] = useState('');
    const [qr, setQr] = useState('');

    const [state, setState] = useState({
      id: "",
      prenom: "",
      nom: "",
      genre: "",
      email: "",
      mdp: "",
      image: "",
      description: "",
      ville: "",
      pays: "",
      emailTmp: "",
      imageAffiche: "",
      donneesDynamiques: [],
      oko: true
    });
    if(state.oko){
    const baseURL = `https://${config.ipserveur}:${config.portserveur}/adminpanel`;
    
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      setState((prevState) => ({
        ...prevState, 
        donneesDynamiques:resp.data.data, 
     
      }))
      console.log(state.donneesDynamiques);
      
    }
    );
    setState((prevState) => ({
      ...prevState, 
      oko:false, 
      
    }))
  }

  const tableauDynamique = (
    <div className="tableau-admin" style={{ height: "80%", overflowY: "auto" }}>
      <table className="custom-table">
        <thead>
          <tr id="admin-tr">
            <th>Date</th>
            <th>Nom / Quantité de l'objet emprunté</th>
            <th>Rendre</th>
          </tr>
        </thead>
        <tbody>
          {state.donneesDynamiques.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td className="object">{item.nom}</td>
              <td>
                <button onClick={() => boutonrendre(item.id)}>
                <img className="object-photo-admin"
                  src= {syb}
                  alt={`Photo de ${item.nomObjet}`} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

    return (
        <div>
            <Header icon={"happy-outline"} title={"Profil"} position={false} ></Header>
            <section className="profil" style={{
            height: "70%",
            width: "100%",
            padding: "0px 30px",
            maxHeight: "calc(100vh - 10vh)",
            flexWrap: "wrap",
            position: "fixed",
            display: "flex",
          }}>
                
                {tableauDynamique}
            </section>
            <Navigation library={false} search={false} map={false} profil={true} setting={false} position={false}/>;      
        </div>
        
    );

}
export default Admingestion;