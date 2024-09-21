import express from 'express';
import bcrypt from 'bcrypt';
import { Employee } from '../../Models/models.js';

const router = express.Router();

// Create new employee (POST /employees)
router.post('/empleados', async (req, res) => {
    try {

        const { name, surname, rol, phone, email, password } = req.body;

        //console.log(req);
        const hashedPassword = await bcrypt.hash(password, 10); // <- Hashing password given
        console.log(hashedPassword);
        const newEmployee = new Employee({
            name,
            surname,
            rol,
            phone,
            email,
            password: hashedPassword
        });
        console.log(newEmployee)
        const savedEmployee = await newEmployee.save(); // Save employee in DB
        console.log(savedEmployee)
        res.status(201).json({
            id: savedEmployee._id,
            name: savedEmployee.name,
            surname: savedEmployee.surname,
            rol: savedEmployee.rol,
            phone: savedEmployee.phone,
            email: savedEmployee.email,
            password: savedEmployee.password
        });
        console.log(res);
        console.log(res);
    }
    catch (err) {
        res.status(500).json({ error: err.message }) // Change to Notify Hook later
    }
});

export default router;