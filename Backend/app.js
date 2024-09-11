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
        const employeesWithId = employees.map(employees => ({
            id: employees._id,
            name: employees.name,
            surname: employees.surname,
            rol: employees.rol,
            phone: employees.phone,
            email: employees.email,
            password: employees.password
        }));
        res.set('X-Total-Count', employees.length);
        console.log(employeesWithId);
        res.json(employeesWithId);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Create new user (POST /users)
app.post('/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
        });
        const savedUser = await newUser.save(); // Save the user in DB
        res.status(201).json({
            id: savedUser._id, // Transformar _id a id para React-Admin
            name: savedUser.name,
            surname: savedUser.surname,
            email: savedUser.email,
            phone: savedUser.phone,
        });

    }
    catch (err) {
        res.status(500).json({ err: 'Error al crear Usuario' }) // Change to Notify Hook later
    }
});

// Create new employee (POST /employees)
app.post('/employees', async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            surname: req.body.surname,
            rol: req.body.rol,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });
        const savedEmployee = await newEmployee.save(); // Save employee in DB
        res.status(201).json({
            id: savedEmployee._id,
            name: savedEmployee.name,
            surname: savedEmployee.surname,
            rol: savedEmployee.rol,
            phone: savedEmployee.phone,
            email: savedEmployee.email,
            password: savedEmployee.password
        });
    }
    catch (err) {
        res.status(500).json({ err: 'Error al crear Empleado' }) // Change to Notify Hook later
    }
});

app.listen(port, () => {
    connectDB()
    console.log(`Server running on http://localhost:${port}`);
});
