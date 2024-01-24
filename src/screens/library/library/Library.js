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
     

      const data = JSON.stringify({
          'nom':"Ampli lc 2,3-18V",
          'prenom':"Baum",
          'imagepath':"mattbaum288@gmail.com",
      });

      const baseURL = "https://192.168.184.122:1234/stock/register1";
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
    }else;
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
                          image: ImageBackground3,
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
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
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
                          name: 'LED Verte 4V',
                          quantity: 15,
                          image: ImageBackground,
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
  
  export default Library;
