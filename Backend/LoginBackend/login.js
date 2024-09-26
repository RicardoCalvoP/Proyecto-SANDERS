import express from 'express'
import bcrypt from 'bcrypt';
import { Employee } from "../Models/models.js";
import jwt from 'jsonwebtoken';
const router = express.Router();


// Authenticate employee
router.post('/login', async (req, res) => {
    try {

        console.log("Request login ", req.body);
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(401).json({ error: 'Este empleado no trabaja aquí' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        console.log("expected password ", password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee._id, rol: employee.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, rol: employee.rol });
        console.log("Response: ", { token, rol: employee.rol });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message }) // Change to Notify Hook later
    }
});

export default router; // Will be called on postRoutes.js