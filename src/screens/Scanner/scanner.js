import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import './scanner.css'; // Créez un fichier CSS séparé pour les styles
import Navigation from "./../../components/navigation/Navigation";
if (process.env.REACT_APP_NOWARNINGS === 'true') {
    console.warn = () => {}; // Désactive les avertissements console.warn
    console.error = () => {}; // Désactive les avertissements console.error
  }
const scanner = () => {
  const videoRef = useRef();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    
    const scanner = new QrScanner(videoRef.current, (result) => {
      let apiurl = "http://192.168.184.122:1234/?c="+ result

      fetch(apiurl)
        .then(response => {
          // Vérification de la réussite de la requête (status code 200 OK)
          
          // Conversion de la réponse JSON
          return response.json();
        })
      console.log(result);
      // Arrêter le scanner après un scan réussi
      setScanned(true);
      scanner.stop();
      });
    scanner.start();

    return () => {
      scanner.stop();
    };
  }, []);

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
