import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar el paquete 'cors'
import { User, Employee } from './Models/models.js';

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


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        const usersWithId = users.map(users => ({
            id: users._id, // Transformar _id a id para React-Admin
            name: users.name,
            surname: users.surname,
            email: users.email,
            phone: users.phone,
            num_donations: users.num_donations
        }));
        res.set('X-Total-Count', users.length);  // Estima el tamaño de los resultados y lo agrega a X-Total-Count en el envabezado de la respuesta para que React-Admin pueda hacer una asignación correcta
        console.log(usersWithId);
        res.json(usersWithId);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
        console.log(employees);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});


app.listen(port, () => {
    connectDB()
    console.log(`Server running on http://localhost:${port}`);
});
