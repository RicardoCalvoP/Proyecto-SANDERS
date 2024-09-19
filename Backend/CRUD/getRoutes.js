import express from 'express';
import { User, Donation, Employee } from '../Models/models.js';

const router = express.Router();

// Get every user

router.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find();
        const usersWithId = users.map(users => ({
            id: users._id, // Transformar _id a id para React-Admin
            name: users.name,
            surname: users.surname,
            email: users.email,
            phone: users.phone,
            num_donations: users.num_donations
        }));
        res.set('X-Total-Count', users.length);  // Estima el tamaño de los resultados y lo agrega a X-Total-Count en el envabezado de la respuesta para que React-Admin pueda hacer una asignación correcta
        console.log(usersWithId);
        res.json(usersWithId);
    }
    catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Get name and surname from user id

router.get('/usuarios/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Verify if user was founds
        if (!user) {
            return res.status(404).send('User not found');
        }

        const userWithId = {
            id: user._id, // Transformar _id a id para React-Admin
            name: user.name,
            surname: user.surname,
            email: user.email
        };

        res.set('X-Total-Count', 1);
        console.log(userWithId);
        res.json(userWithId);
    }
    catch (error) {
        res.status(500).send('Error fetching user by id');
    }
});

// GET user by email



// Get all donations (GET /donations)
router.get('/donaciones', async (req, res) => {
    try {
        const donations = await Donation.find();
        const donationWithId = donations.map(donation => ({
            id: donation._id, // Transformar _id a id para React-Admin
            donator_name: donation.donator_name,
            donator_surname: donation.donator_surname,
            donator_email: donation.donator_email,
            donator_phone: donation.donator_phone,
            comment: donation.comment,
            amount: donation.amount,
            date: donation.date,
            kind: donation.kind
        }));

        res.set('X-Total-Count', donations.length);
        res.json(donationWithId);
    }
    catch (error) {
        res.status(500).send('Error fetching donations');
    }
});


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
    catch (error) {
        res.status(500).send('Error fetching employees');
    }
});


export default router;