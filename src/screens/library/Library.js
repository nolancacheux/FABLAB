import React, { useState, useEffect } from "react";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import "./library.css"
import ProductCard from "./Component JS Stock/Product_Card";
import Add_Compo from "./Component JS Stock/Add_Compo";
import axios from "axios";

const ProduitList = ({ admin }) => {
    const [produits1, setProduits1] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduits1 = async () => {
            try {
                const response = await axios.get('https://10.224.1.225:1234/stock/getAllProduit1');
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
                        <ProductCard key={produit.numberId}
                                product={{
                                    name: produit.name,
                                    quantity: produit.quantity,
                                    image: `https://10.224.1.225:1234/uploads/${produit.image1}`,
                                    iD: produit.numberId
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



const Library = () => {
    let admin=false;
    return (
        <div>
            <Header icon={"print-outline"}
                    title={"Machine"}
                    position={false}
                    destination = '/Machine'
            ></Header>
            <section>
                <ProduitList admin={admin}/>
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