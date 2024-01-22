import React from "react"
import Etoilecom from "../Etoile/Etoilecom"
import './commentaire.css'
function Commentaire ({nb_etoile,user,description, key, photo}){
    return(
        <div className="co-commentaire" key={key}>
            
            
                <img src={photo} alt='img pp' className="co-img-com"></img>
                <h3 className="co-user">{user}</h3>
                
                <p className="co-description_commentaire">{description}</p>
                <Etoilecom nb_etoile={nb_etoile} />
        </div>
    )
}

export default Commentaire