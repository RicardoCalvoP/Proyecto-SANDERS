
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

// API route to get employee by ID
router.get('/empleados/:id', async (req, res) => {
    try {
        // Find employee by ID
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Transform the employee object to include 'id' instead of '_id'
        const employeeWithId = {
            id: employee._id, // Convert _id to id for React Admin
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            phone: employee.phone,
            password: employee.password,
            rol: employee.rol,
        };
        res.set('X-Total-Count', 1);
        console.log(employeeWithId);
        res.json(employeeWithId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching employee' });
    }
});




export default router;