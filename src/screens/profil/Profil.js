import React, { useState, useRef } from 'react';
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import Wave from "../../assets/images/waving-hand.png";
import syb from "./addsymbole.png";
import QRCode from "react-qr-code";

const Profil = () => {
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
    donneesDynamiques: [
      { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
      { date: "2022-02-15", nomObjet: "Objet 2", image: syb },
      { date: "2022-03-20", nomObjet: "Objet 3", image: syb },
      // ... other data
    ],
    url: "",
    qr: "",
  });

  const { prenom, nom } = state;

  const tableauDynamique = (
    <div className="tableau" style={{ height: "400px", overflowY: "auto" }}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom / Quantité de l'objet emprunté</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {state.donneesDynamiques.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td className="object">Nom : {item.nomObjet}, Quantité : {item.quantite}</td>
              <td>
                <img className="object-photo"
                  src={item.image}
                  alt={`Photo de ${item.nomObjet}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) return console.error(err)

      console.log(url)
      setQr(url)
    })
  }

  return (
    <div>
      <Header
        icon={"happy-outline"}
        title={"Profil"}
        position={false}
      ></Header>
      <section
        className="profil"
        style={{
          height: "70%",
          width: "100%",
          padding: "0px 30px",
          maxHeight: "calc(100vh - 10vh)",
          flexWrap: "wrap",
          position: "fixed",
          display: "flex",
        }}
      >
        <div className="prf-card">
          <div className="prf-card-inner">
            <div className="prf-back">
              <img src={Wave} alt="" />
              <h1>
                {prenom} <span>{nom}</span>
              </h1>{" "}
              <p>{state.description}</p>{" "}

              <div className="app">
                <h1>QR Generator</h1>
                <input
                  type="text"
                  placeholder="e.g. https://google.com"
                  value={url}
                  onChange={e => setUrl(e.target.value)} />
                <button onClick={GenerateQRCode}>Generate</button>
                {qr && <>
                  <img src={qr} alt="QR Code" />
                  <a href={qr} download="qrcode.png">Download</a>
                </>}
              </div>
            </div>
          </div>
        </div>
        {tableauDynamique}
      </section>
      <Navigation
        library={false}
        search={false}
        map={false}
        profil={true}
        setting={false}
        position={false}
      />
      ;
    </div>
  );
}

export default Profil;
