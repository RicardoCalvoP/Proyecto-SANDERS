import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors package
import crudRoutes from './CRUD/crud.js'; // Import CRUD routes
import { connectDB } from './Server/connect.js'; // Import Connection with DB

import { startHttpServer } from './Server/http.js';
import { startHttpsServer } from './Server/https.js';


dotenv.config();
const app = express();
const port = 5001;
app.use(express.json());

/*
// Habilitar CORS para todas las solicitudes HTTP
app.use(cors({ // Permite que cualquier origen pueda acceder a la API
    exposedHeaders: ['X-Total-Count'], // Expone el encabezado X-Total-Count
}));
*/
connectDB();
// Habilitar CORS para todas las solicitudes HTTPS
app.use(cors({
    origin: 'https://localhost:5173',
    //origin: 'http://localhost:3000',
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));




// Use the combined CRUD routes
app.use(crudRoutes);    // Full Code on ./CRUD


export default app;


app.get('/', (req, res) => {
    res.send('Hello World - TC2007B!');
});


// Start HTTP Server
//startHttpServer(port);
// Start HTTPS Server
startHttpsServer(port);


