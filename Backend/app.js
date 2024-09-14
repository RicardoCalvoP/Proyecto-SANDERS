import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar el paquete 'cors'

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


app.listen(port, () => {
    connectDB()
    console.log(`Server running on http://localhost:${port}`);
});
