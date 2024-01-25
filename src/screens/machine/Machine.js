import React, { useState, useEffect } from "react";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import ImageBackground from "./Images Compo/interrupteur+en+t.png";
import ImageBackground2 from "./Images Compo/ampli+lc+2,3-18+v.png";
import ImageBackground3 from "./Images Compo/amplificateur+af+18v.png";
import ImageBackground4 from "./Images Compo/condensateur+chimique+bizarre.png";
import ImageBackground5 from "./Images Compo/condensateur+chimique+bleu.png";
import "./machine.css"
import ProductCard from "./Component JS Stock/Product_Card";
import Add_Compo from "./Component JS Stock/Add_Compo";
import axios from "axios";

const ProduitList = (admin) => {
    const [produits1, setProduits1] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduits1 = async () => {
            try {
                const response = await axios.get('https://192.168.184.122:1234/stock/getAllProduit1');
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
            <h1>Liste des Composants</h1>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <div className="product-container">
                    {produits1.map((produit) => (
                        <ProductCard key={produit._id}
                                     product={{
                                         name: produit.name,
                                         quantity: produit.quantity,
                                         image: `https://10.224.1.225:1234/uploads/${produit.image1}`,  // Utilisez le préfixe /uploads
                                     }}
                                     admin={admin}
                        />
                    ))}
                    {admin && (
                        <Add_Compo admin={admin}/>
                    )}
                </div>
            )}
        </div>
    );
};

const Machine = () => {
     

      /*const data = JSON.stringify({
          'nom':"Ampli lc 2,3-18V",
          'prenom':"Baum",
          'email':"mattbaum288@gmail.com",
          'mdp':"ampli+lc+2,3-18+v.png"
      });

      const baseURL = "https://192.168.184.122:1234/users/register";
      console.log(data);
      const headers = {
          'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
          'Access-Control-Allow-Origin':'*',
      };
      axios.post(baseURL,data,{ headers })
          .then(res => {
              console.log(res.data)
          })

    const getconnexion = sessionStorage.getItem("email");

    if (getconnexion == undefined) {
        window.location.href = "/";
        alert("Vous n'êtes pas connecté");
    }else;*/
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
              <div className="product-container">
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground2,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground2,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground4,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground3,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                      }}
                      admin={admin}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                      }}
                      admin={admin}
                  />
                  {admin && (
                  <Add_Compo admin={admin}/>
                  )}
              </div>
          </section>
          <Navigation
              library={true}
              search={false}
              map={false}
              profil={false}
              setting={false}
              position={false}
          />
      </div>
  );
};
  
export default Machine;
