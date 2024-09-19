import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar el paquete 'cors'

import https from 'https'; // Para crear un servidor HTTPS
import fs from 'fs'; // Maneja archivos del sistem

// Scheme Models
import { User, Employee, Donation } from './Models/models.js';

// CRUD Elements
import crudRoutes from './CRUD/crud.js';



dotenv.config();
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors({ // Permite que cualquier origen pueda acceder a la API
    exposedHeaders: ['X-Total-Count'], // Expone el encabezado X-Total-Count
}));

app.use(express.json());

const port = 5001;

// Ruta para probar el backend en el navegador
app.get('/', (req, res) => {
    res.send('Hello World - TC2007B!'); // Mensaje que se verá en la ventana del navegador
});

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

// Leer certificados SSL
const privateKey = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');
const ca = fs.readFileSync('certs/ca/ca.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };


//Servidor HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () =>
    connectDB(),
    console.log(`Server running on port ${port} with HTTPS`)
)

/*
Servidor HTTP

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

*/
