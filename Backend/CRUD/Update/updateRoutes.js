import express from 'express';
import bcrypt from 'bcrypt';
import { Employee } from '../../Models/models.js'; // Assuming Employee is the model for employees

const router = express.Router();

// API route to update employee password
router.put('/empleados/:id', async (req, res) => {
    try {
        const { password } = req.body;

        // Find employee by ID
        const employee = await Employee.findById(req.params.id);

        const hashedPassword = await bcrypt.hash(password, 10);

        employee.password = hashedPassword;
        // Save the updated employee information to the database
        const savedEmployee = await employee.save();

        res.status(201).json({
            id: savedEmployee._id,
            name: savedEmployee.name,
            surname: savedEmployee.surname,
            rol: savedEmployee.rol,
            phone: savedEmployee.phone,
            email: savedEmployee.email,
            password: savedEmployee.password
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
export default router;
