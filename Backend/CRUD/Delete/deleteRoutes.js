import express from 'express';
import { User, Employee } from '../../Models/models.js';

const router = express.Router();

// Eliminar un empleado (DELETE /empleados/:idEmpleado)
router.delete('/empleados/:idEmpleado', async (req, res) => {
    try {
        // Accede al id del empleado desde req.params.idEmpleado
        const deletedEmployee = await Employee.findOneAndDelete({ _id: req.params.idEmpleado });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'El empleado no trabaja aquí' });
        }

        res.status(200).json({ message: 'Empleado despedido con éxito', employee: deletedEmployee });
    } catch (err) {
        res.status(500).json({ error: 'Error al despedir empleado' });
    }
});

export default router;
