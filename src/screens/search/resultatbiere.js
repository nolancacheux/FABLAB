import React,{useEffect,useState} from "react"
import Pagebiere from "../../components/pagebiere/pagebiere"
import axios from "axios";

const ResultatBiere = () => {
    const beerId = sessionStorage.getItem("BeerId");
    const [data,setData] = useState([]);
    const url = 'http://51.254.38.150:3000/beers/findById/'+ beerId.toString();
                      
    
    useEffect(()=>{
        axios.get(url).then((res)=>setData(res.data));
        console.log(data)
    },[])

return(

    <Pagebiere 
    nom = {data.name}
    description ={data.description}
    etoile = {data.first_avg_rating}
    tarif =''
    type = {data.beer_type}
    pourcentage = {data.alcohol/100}
    pays ={data.country}
    usine ={data.brewery}
    biere={data.img_original}
    />

);
}

export default ResultatBiere