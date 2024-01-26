import React, { useState, useEffect } from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import "../../Hadrien/reset.css";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import syb from './addsymbole.png'
import Wave from "../../assets/images/waving-hand.png";
import QRCode from 'qrcode'

function Profil() {
    const [stringue, setStirngue] = useState('');
    const [qr, setQr] = useState('');

    // Récupérer la chaîne JSON du sessionStorage
    var historicJSONRecupere = sessionStorage.getItem('historic');

    const nom = sessionStorage.getItem("firstName");
    const prenom = sessionStorage.getItem("lastName");
    const email = sessionStorage.getItem("email");

    console.log(historicJSONRecupere)

    // Convertir la chaîne JSON en tableau d'objets
    var historicDataRecupere = JSON.parse(historicJSONRecupere);

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
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
            { date: "2022-01-01", nomObjet: "Objet 1", quantite: "17", image: syb },
        ],
    });

    const GenerateQRCode = () => {
        const tmp = `${sessionStorage.getItem("email")}/${sessionStorage.getItem("password")}`;
        setStirngue(tmp);
        console.log(stringue)
        QRCode.toDataURL(tmp, { 
            width: 800,
            margin: 2,
            color: {
                dark: '#335383FF',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)

            console.log(url)
            setQr(url);
        });
    }

    const ProduitList = (admin) => {
        const [produits1, setProduits1] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchProduits1 = async () => {
                try {
                    const response = await axios.get(`https://${config.ipserveur}:${config.portserveur}/stock/getAllProduit1`);
                    setProduits1(response.data.produits1);
                    setLoading(false);
                } catch (error) {
                    console.error('Erreur lors de la récupération des produits:', error);
                    setLoading(false);
                }
            };

            fetchProduits1();
        }, []);

        return (
            <div>
                <h1>Liste des Produits1</h1>
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : (
                    <ul>
                        {produits1.map((produit) => (
                            <li key={produit._id}>
                                <ProductCard
                                    product={{
                                        name: produit.name,
                                        quantity: produit.quantity,
                                        image: `https://${config.ipserveur}:${config.portserveur}/uploads/` + produit.image1
                                    }}
                                    admin={admin}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };



    function getObjectNameAndQuantity(item) {
        if (item.numberId.charAt(0) == '1') {
          // Pour produit1
          return `Nom : ${item.name}, Quantité : ${item.quantity}`;
        } else if (item.numberId.charAt(0) == '2') {
          // Pour produit2
          return `Nom : ${item.name}`;
        } else if (item.numberId.charAt(0) == '3') {
          // Pour produit3
          return `Nom : ${item.name}}`;
        }
        // Gérez d'autres cas si nécessaire
        return '';
      }
      

    function getObjectDate(item){
        if (item.numberId.charAt(0) == '1') {
            // Pour produit1
            return ``;
          } else if (item.numberId.charAt(0) == '2') {
            // Pour produit2
            return `Date : ${item.pret.substring(0,10)}`;
          } else if (item.numberId.charAt(0) == '3') {
            // Pour produit3
            return `Date : ${item.pret.substring(0,10)}`;
          }
          // Gérez d'autres cas si nécessaire
          return '';
    }


    const tableauDynamique = (
        <div className="tableau" style={{ height: "100%", overflowY: "auto", borderRadius: "10px", order: 1, marginTop: "20px" }}>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Nom / Quantité de l'objet emprunté</th>
                        <th>Temps du pret</th>
                    </tr>
                </thead>
                <tbody>
                    {historicDataRecupere.map((item, index) => (
                        <tr key={index}>
                            <td>  
                                {getObjectDate(item)}
                            </td>
                            <td className="object">
                                {getObjectNameAndQuantity(item)}
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
                height: "72%",
                width: "100%",
                padding: "0px 30px",
                maxHeight: "calc(100vh - 10vh)",
                flexWrap: "wrap",
                position: "fixed",
                display: "flex",
            }}>
                <div className="prf-card">
                    <div className="prf-card-inner">
                        <div className="prf-front" style={{ backgroundImage: `url(${state.imageAffiche})` }}>
                            <h2> {prenom} {nom} </h2>
                            <p>{email}</p>
                            <div className="prf-button-container">
                                <button className="prf-custom-button">
                                    <ion-icon name="language-outline"></ion-icon>
                                    <span>{state.pays}</span>{" "}
                                </button>
                                <button className="prf-custom-button">
                                    <ion-icon name="earth-outline"></ion-icon>
                                    <span>{state.ville}</span>{" "}
                                </button>
                            </div>
                        </div>
                        <div className="prf-back">
                            <div className="black-Title">Nom : {nom} </div>
                            <div className="black-Title">Prénom : {prenom} </div>
                            <div className="bottom-right">
                                <button className="adminbnt" onClick={GenerateQRCode}>Afficher QRcode</button>
                                {qr && (
                                    <>
                                        <img src={qr} alt="QR Code" className="pimg" />
                                        <a href={qr} className="adminbnt1" download={`qrcode_${prenom + nom}.png`}>
                                            Télécharger
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {tableauDynamique}
            </section>
            <Navigation library={false} search={false} map={false} profil={true} setting={false} position={false} />
        </div>

    );
}

export default Profil;