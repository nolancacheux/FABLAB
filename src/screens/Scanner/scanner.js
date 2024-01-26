import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import './scanner.css'; 
import Navigation from "./../../components/navigation/Navigation";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

if (process.env.REACT_APP_NOWARNINGS === 'true') {
    console.warn = () => {}; // Désactive les avertissements console.warn
    console.error = () => {}; // Désactive les avertissements console.error
  }
const scanner = () => {
  const videoRef = useRef();
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    
    const scanner = new QrScanner(videoRef.current, (result) => {
      console.log(result);
      // Arrêter le scanner après un scan réussi
      setScanned(true);
      
      if(result.search('@') != -1){
        sessionStorage.setItem("scan-login",result);
        navigate('/');
      }
      else if (result.search('/') != -1 && result.search('-') != -1){
        sessionStorage.setItem("scan", result);

        
        navigate('/Reservation');
      }
      
      scanner.stop();
      
      });
    scanner.start();
    
    return () => {
      scanner.stop();
    };
  }, [navigate]);

  return (
    <div>
    <div className="qr-code-scanner-container">
      <video ref={videoRef} className="qr-code-video" />
      <div className="qr-code-overlay"></div>
    </div>


        <Navigation  library={false}  search={false}  map={true} profil={false} setting={false} position={true}/>
    </div>
     
    
  );
};

export default scanner;
