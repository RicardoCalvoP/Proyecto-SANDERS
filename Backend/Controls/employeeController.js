import bcrypt from 'bcrypt';
import Employee from "../Models/employees.js";
import jwt from 'jsonwebtoken';

// Authenticate employee
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const employee = await Employee.findOne({ name });

        if (!employee) {
            return res.status(401).json({ error: 'Este empleado no trabaja aquí' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee._id, rol: employee.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, rol: employee.rol });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};


export default login;