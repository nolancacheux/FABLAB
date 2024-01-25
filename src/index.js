import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./Hadrien/reportWebVitals";
import Connexion from "./Hadrien/connexion";
import Map from "./screens/map/Map";
import Profil from "./screens/profil/Profil";
import Login from "./screens/login/Login";
import Setting from "./screens/setting/Setting";
import Search from "./screens/search/Search";
import Library from "./screens/library/Library";
import Machine from "./screens/machine/Machine";
import Jeu from './screens/jeu/jeu';
import ResultatBiere from "./screens/search/resultatbiere";
import Scanner from "./screens/Scanner/scanner";
import Reservation from "./screens/reservation/reservation"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Stockage" element={<Library />} />
                <Route path="/Machine" element={<Machine />} />
                <Route path="/IAssistant" element={<Search />} />
                <Route path="/Accueil" element={<Map />} />
                <Route path="/Jeu" element={<Jeu />} />
                <Route path="/Profil" element={<Profil />} />
                <Route path="/Biere" element={<ResultatBiere />}/>
                <Route path="/Paramètre" element={<Setting />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/Scanner" element={<Scanner />} />
                <Route path="/Reservation" element={<Reservation />} />
                
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();