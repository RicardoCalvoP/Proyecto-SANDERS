
import express from 'express';
import { Employee } from '../../Models/models.js'
import router from './getUsers.js';

// Get all employees (GET /employees)
router.get('/empleados', async (req, res) => {
    try {
        // Get parameters sort & order from frontend
        const { _sort = 'date', _order = 'ASC' } = req.query;
        // Convert order to mongoose format
        const sortOrder = _order === 'ASC' ? 1 : -1;

        // Map fields that can be sorted to the real fields in mongo db
        const sortFields = {
            name: 'name',
            surname: 'surname',
            rol: 'rol',
        };
        // Verify if the sort field exists in map
        const sortField = sortFields[_sort] || 'date'; // Default: sort date if any there's no input

        //Create order object for mongo
        const sortQuery = { [sortField]: sortOrder };
        const employees = await Employee.find().sort(sortQuery);
        const employeesWithId = employees.map(employees => ({
            id: employees._id, // Transform _id to id for React-Admin
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