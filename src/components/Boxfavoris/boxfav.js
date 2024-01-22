import React, {useState, useEffect} from 'react'
import './boxfav.css'
import Etoile from '../Etoile/Etoile'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BoxFav = ({beer}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let url = 'http://51.254.38.150:3000/beers/findById/' + beer.toString();
        axios.get(url).then((res) => setData(res.data));
    }, []);

    return(
        <Link to="/Biere" >
        <button key={beer} className="bo-boxbiere"onClick={(e) => {
            sessionStorage.setItem("BeerId", beer);
          }}>
            <p className='bo-num'>#</p>
            <img src={data.img_optimized} alt='biere test' className='bo-biere'></img>
            <p className='bo-name'>{data.name}</p>
            <p className='bo-pourcentage'>{data.alcohol/100}</p>
            <Etoile nb_etoile={data.first_avg_rating} className='bo-etoile'/>
        </button>
        </Link>
    )
}

export default BoxFav