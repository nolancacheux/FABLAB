import React, { useState, useEffect } from "react";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import "./machine.css"
import config from "../../configip.js"

import Add_Compo_Outils from "./Component JS Stock/Add_Compo_Outils.js";

import Product_Card_Machine from "./Component JS Stock/Product_Card_Machine.js";
import Add_Compo_Machine from "./Component JS Stock/Add_Compo_Machine.js";

import axios from "axios";
import Product_Card_Outils from "./Component JS Stock/Product_Card_Outils";

const ProduitList = () => {
    const admin = !(sessionStorage.getItem("admin"));

    const [produits2, setProduits2] = useState([]);
    const [produits3, setProduits3] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduits2 = async () => {
            try {
                const response = await axios.get(`https://${config.ipserveur}:${config.portserveur}/stock/getAllProduit2`);
                setProduits2(response.data.produits2);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };

        fetchProduits2(); 
    }, []);


    useEffect(() => {
        const fetchProduits3 = async () => {
            try {
                const response = await axios.get(`https://${config.ipserveur}:${config.portserveur}/stock/getAllProduit3`);
                setProduits3(response.data.produits3);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };

        fetchProduits3();   
    }, []);

    return (
        <div>
            <h1>Liste des Machines & Outils</h1>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                
                <div className="product-container">
                    {produits2.map((produit) => (
                        <Product_Card_Outils key={produit.numberId}
                                              product={{
                                                  iD:produit.numberId,
                                                  name: produit.name,
                                                  pret: produit.pret,
                                                  nbJour: produit.nbJour,
                                                  reserved: produit.reserved,
                                                  is_late: produit.is_late,
                                                  image: `https://${config.ipserveur}:${config.portserveur}/uploads/${produit.image1}`,  // Utilisez le préfixe /uploads
                            }}
                                             admin={admin}
                        />
                    ))}
                    {produits3.map((produit) => (
                        <Product_Card_Machine key={produit.numberId}
                                product={{
                                    iD:produit.numberId,
                                    name: produit.name,
                                    pret: produit.pret,
                                    nbHeure: produit.nbHeure,
                                    reserved: produit.reserved,
                                    is_late: produit.is_late,
                                    image: `https://${config.ipserveur}:${config.portserveur}/uploads/${produit.image1}`,  // Utilisez le préfixe /uploads
                                }}
                                admin={admin}
                        />
                    ))}
                    {admin && (

                        <Add_Compo_Machine admin={admin}/>
                    )}
                    {admin && (
                            <Add_Compo_Outils admin={admin}/>
                    )}
                </div>
            )}
        </div>
    );
};

const Machine = () => {
     
    const [profiltxt, setprofiltxt] = useState("Profil");
    const [paratxt, setparatxt] = useState("Profil");
    if(sessionStorage.getItem("admin")=== true){
        setprofiltxt("Reservation")
        setparatxt("AdminGestion")
        
    }
    let admin=false;
  return (
      <div>
          <Header icon={"cash-outline"} 
          title={"Stockage"} 
          position={false}
          destination = '/Stockage'
          ></Header>
          <section>
              <ProduitList admin={admin}/>
          </section>
          <Navigation
                library={false}
                search={true}
                map={false}
                profil={false}
                setting={false}
                position={false}
                profil_txt={profiltxt}
            para_txt={paratxt}
            />
      </div>
  );
};
  
export default Machine;