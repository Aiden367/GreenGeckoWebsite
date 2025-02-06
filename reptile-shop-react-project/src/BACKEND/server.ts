
import { connectToDatabase } from "./db/conn";
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
const user = require("./routes/user");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Resolve absolute paths for the key and certificate
const keyPath = path.resolve(__dirname, 'keys/privatekey.pem');
const certPath = path.resolve(__dirname, 'keys/certificate.pem');

// Check if the files exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("❌ SSL key files are missing. Please check the 'keys' folder inside BACKEND.");
  process.exit(1);
}

// Read SSL files
const options = {
  key: fs.readFileSync(keyPath),   
  cert: fs.readFileSync(certPath),
};

 //Routes 
 app.use(cors());
 app.use(express.json());
 app.use('/user',user);
 app.route("/user")
  .get(user)  // Handles GET requests
  .post(user); // Handles POST requests


// Connect to MongoDB before starting the server
connectToDatabase()
  .then(() => {
    https.createServer(options, app).listen(PORT, () => {
      console.log(`✅ Server is running on https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database', error);
    process.exit(1);
  });

 

