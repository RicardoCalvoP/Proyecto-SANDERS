import express from 'express';
import { User, Donation, Employee } from '../Models/models.js';

const router = express.Router();

// Create new user (POST /users)
router.post('/users', async (req, res) => {
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
router.post('/employees', async (req, res) => {
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

// Create new donation (POST /donations)
router.post('/donations', async (req, res) => {
    try {
        // Search for user from email
        let user = await User.findOne({ email: req.body.donator_email });

        // If user doesn't exist 
        if (!user) {
            user = new User({
                name: req.body.donator_name,
                surname: req.body.donator_surname,
                email: req.body.donator_email,
                phone: req.body.donator_phone,
                num_donations: 1
            });
        } else {
            // If user exists just increase num of donations by 1
            user.num_donations += 1;
        }

        // Check DB, creation of new element '__v:0'
        const savedUser = await user.save(); // Save or update user

        // Create Donation
        const newDonation = new Donation({
            donator_name: req.body.donator_name,
            donator_surname: req.body.donator_surname,
            donator_email: req.body.donator_email,
            donator_phone: req.body.donator_phone,
            comment: req.body.comment,
            amount: req.body.amount,
        });

        const savedDonation = await newDonation.save(); // Save Donation in DB

        // Respond with user and donation
        res.status(201).json({
            user: {
                id: savedUser._id, // Map _id to id so it works in React
                name: savedUser.name,
                surname: savedUser.surname,
                email: savedUser.email,
                phone: savedUser.phone,
                num_donations: savedUser.num_donations,
            },
            donation: {
                id: savedDonation._id, // Map _id to id so it works in React
                donator_name: savedDonation.donator_name,
                donator_surname: savedDonation.donator_surname,
                donator_email: savedDonation.donator_email,
                donator_phone: savedDonation.donator_phone,
                comment: savedDonation.comment,
                amount: savedDonation.amount,
                date: savedDonation.date
            }
        });
    } catch (err) {
        console.error('Error al crear donación:', err);
        res.status(500).json({ err: 'Error al crear Donación' });
    }
});


export default router;