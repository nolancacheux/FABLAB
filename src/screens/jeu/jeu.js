import React,{useEffect,useState} from "react"
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import BubblesComponent from "../../components/animations/bulle";
import './jeton.css';
import  {Navigate, Link}  from "react-router-dom";
import axios from "axios";



   
    function Jeu(){
        
        const [data,setData] = useState([]);
        const url = 'http://51.254.38.150:3000/beers/random/';
        useEffect(() => {
            axios.get(url).then((res) => setData(res.data));
        }, []);
        
        const partie2 = document.getElementById('jt-partie2');
        const partie3 = document.getElementById('jt-partie3');
       
 

    

        return(
            <div>
                <section class="jeton">
            <canvas class="yearJeton" id="bubblesJeton"></canvas>
    <div class="jt-header">
        <Link to="/Carte" >
        <button> <ion-icon name="arrow-back"></ion-icon></button>
        </Link>
        <div class="jt-category">
            <ion-icon name="game-controller-outline"></ion-icon>
            <h1>HopBeer</h1>
        </div>
    </div>
    <div class="jt-container">
        <div id="jt-partie2">
          <h1>Quel est le degré de la bière ?</h1>
          <div class="jt-card">
            <img src={data.img_optimized} alt=""/>
            <div class="jt-important">
              <ion-icon class="jt-icon" name="Beer"></ion-icon>
              <span class="jt-text">{data.name}</span>
            </div>
          </div>
          <button id="reponseBtn" class="jt-designBtn" onClick={(e)=>{
            partie2.classList.add('hidden');
            partie3.classList.remove('hidden');
          }}>
          
            <span>Réponse 💡</span>
            <div class="liquid"></div>
          </button>
        </div>
        <div id="jt-partie3" class="hidden">
          <h1>Réponse</h1>
          <div class="jt-card">
            <h2>{data.alcohol/100}</h2>
            <div class="jt-important">
              <ion-icon class="jt-icon" name="Beer"></ion-icon>
              <span class="jt-text">{data.name}</span>
            </div>
            <div class="jt-actions">
              <button id="rejouerBtn" class="jt-designBtn" onClick={(e)=>{

                axios.get(url).then((res) => setData(res.data));
                partie3.classList.add('hidden');
                partie2.classList.remove('hidden');
                }}>
                <span>Rejouer🔄</span>
                <div class="liquid"></div>
              </button>
            </div>
          </div>
        </div>
        <BubblesComponent />
      </div>
            </section>
            </div>
        )
    }


export default Jeu;