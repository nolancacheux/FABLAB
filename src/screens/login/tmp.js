const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 1234;

const options = {
  key: fs.readFileSync('chemin/vers/votre/cle_privee.pem'),
  cert: fs.readFileSync('chemin/vers/votre/certificat.pem'),
};

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur HTTPS Express!');
});

https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS Express en cours d'exécution sur le port ${port}`);
});