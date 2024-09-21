import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar el paquete 'cors'

import https from 'https'; // Para crear un servidor HTTPS
import fs from 'fs'; // Maneja archivos del sistem

// CRUD Elements
import crudRoutes from './CRUD/crud.js';



dotenv.config();
const app = express();


// Habilitar CORS para todas las solicitudes HTTP
app.use(cors({ // Permite que cualquier origen pueda acceder a la API
    exposedHeaders: ['X-Total-Count'], // Expone el encabezado X-Total-Count
}));

/*
// Habilitar CORS para todas las solicitudes HTTPS
app.use(cors({
    origin: 'https://localhost:5001',
    //origin: 'http://localhost:3000',
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
*/

app.use(express.json());

const port = 5001;

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/SANDERS", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Server connected to DataBase');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

// Use the combined CRUD routes
// Full Code on ./CRUD
app.use(crudRoutes);

/*
//Servidor HTTPS 

// Ruta para probar el backend en el navegador
app.get('/', (req, res) => {
    res.send('Hello World - TC2007B!'); // Mensaje que se verá en la ventana del navegador
});

// Leer certificados SSL
const privateKey = fs.readFileSync('certs/ca/server.key', 'utf8');
const certificate = fs.readFileSync('certs/ca/server.crt', 'utf8');
const ca = fs.readFileSync('certs/ca/ca.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };


const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () =>
    connectDB(),
    console.log(`Server running on port ${port} with HTTPS`)
)

*/

//Servidor HTTP

app.listen(port, () => {
    connectDB(),
        console.log(`Server running on http://localhost:${port}`);
});




