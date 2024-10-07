
import express from 'express';
import { Employee } from '../../Models/models.js'
import router from './getUsers.js';

// Get all employees (GET /employees)
router.get('/employees', async (req, res) => {
    try {
        const { _sort = 'rol', _order = 'ASC', name, surname, rol, email } = req.query;

        // Convert order to mongoose format
        const sortOrder = _order === 'ASC' ? 1 : -1;

        // Map fields that can be sorted to the real fields in mongo db
        const sortFields = {
            name: 'name',
            surname: 'surname',
            rol: 'rol',
        };
        const sortField = sortFields[_sort] || 'date'; // Default: sort by date if no input

        // Create order object for MongoDB
        const sortQuery = { [sortField]: sortOrder };

        // Building filter query based on provided filters (role and email)
        const filterQuery = {};

        if (name) {
            filterQuery.name = name;
        }
        if (surname) {
            filterQuery.surname = surname;
        }
        // Add role filter if provided
        if (rol) {
            filterQuery.rol = rol;
        }

        // Add email filter if provided
        if (email) {
            filterQuery.email = email;
        }

        // Execute query with filters and sorting
        const employees = await Employee.find(filterQuery).sort(sortQuery);
        const employeesWithId = employees.map(employee => ({
            id: employee._id, // Transform _id to id for React-Admin
            name: employee.name,
            surname: employee.surname,
            rol: employee.rol,
            phone: employee.phone,
            email: employee.email,
            password: employee.password
        }));

        // Set the X-Total-Count header required by React-Admin for pagination
        res.set('X-Total-Count', employees.length);
        res.json(employeesWithId);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API route to get employee by ID
router.get('/employees/:id', async (req, res) => {
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