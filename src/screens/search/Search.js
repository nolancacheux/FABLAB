import React, {useState} from "react";
import "./../../components/navigation/navigation.css";
import "./../../components/header/header.css";
import "./search.css";
import "../../Hadrien/reset.css";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";

const Search =()=>{
 //! Front-End de la page Search !//
 const [data, setData] = useState([]);

 return (
   <div>
     <Header
       icon={"search-outline"}
       title={"IAssistant"}
       position={true}
     ></Header>
     <div>
     <section className="IAssistant" style={{ height: "auto", width: "100%", maxHeight: `calc(100vh - 10vh)`, display: "flex", flexWrap: "wrap" }}>
        
       </section>
     </div>
     <Navigation
       library={false}
       search={true}
       map={false}
       profil={false}
       setting={false}
       position={false}
     />
     ;
   </div>
 );
}



export default Search