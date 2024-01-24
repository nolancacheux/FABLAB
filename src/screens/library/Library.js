import React, { useState, useEffect } from "react";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import ImageBackground from "./Images Compo/interrupteur+en+t.png";
import ImageBackground2 from "./Images Compo/ampli+lc+2,3-18+v.png";
import ImageBackground3 from "./Images Compo/amplificateur+af+18v.png";
import ImageBackground4 from "./Images Compo/condensateur+chimique+bizarre.png";
import ImageBackground5 from "./Images Compo/condensateur+chimique+bleu.png";
import "./library.css"
import ProductCard from "./Component JS Stock/Product_Card";
import Add_Compo from "./Component JS Stock/Add_Compo";
import axios from "axios";
const Library = () => {
  const [userData, setUserData] = useState({
      id: "",
      prenom: "",
      nom: "",
      genre: "",
      email: "",
      mdp: "",
      data: [],
      image: null,
      tab: [],
  });



  useEffect(() => {

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
          })*/


      const email = sessionStorage.getItem("email");
      var requestOptions = {
          method: "GET",
          redirect: "follow",
      };

      fetch("http://51.254.38.150:3000/connexion/" + email, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              const { id, prenom, nom, email, mdp } = result;
              setUserData({ id, prenom, nom, email, mdp });
          })
          .catch((error) =>
              console.log(
                  "Erreur lors de la récupération des données de l'utilisateur:",
                  error
              )
          );
  }, []);
  let admin=true;
  return (
      <div>
          <Header icon={"print-outline"} 
          title={"Machine"} 
          position={false}
          destination = '/Machine'
          ></Header>
          <section>
              <div className="product-container">
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground2,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground3,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground4,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground5,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
                      }}
                  />
                  <ProductCard
                      product={{
                          name: 'LED Rouge 4V',
                          quantity: 12,
                          image: ImageBackground,
                          setUserData
                      }}
                  />
                  {admin && (
                  <Add_Compo/>
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
  
  export default Library;
