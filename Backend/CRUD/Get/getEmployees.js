
import express from 'express';
import { Employee } from '../../Models/models.js'

const router = express.Router();

// Get all employees (GET /employees)
router.get('/empleados', async (req, res) => {
    try {
        const employees = await Employee.find();
        const employeesWithId = employees.map(employees => ({
            id: employees._id, // Transformar _id a id para React-Admin
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;