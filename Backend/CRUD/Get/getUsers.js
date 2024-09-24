import express from 'express';
import { User } from '../../Models/models.js'

const router = express.Router();

// Get every user
router.get('/usuarios', async (req, res) => {
    try {
        // Get parameters sort & order from frontend
        const { _sort = 'date', _order = 'ASC' } = req.query;
        // Convert order to mongoose format
        const sortOrder = _order === 'ASC' ? 1 : -1;

        // Map fields that can be sorted to the real fields in mongo db
        const sortFields = {
            name: 'name',
            surname: 'surname',
            num_donations: 'num_donations',
        };
        // Verify if the sort field exists in map
        const sortField = sortFields[_sort] || 'date'; // Default: sort date if any there's no input

        //Create order object for mongo
        const sortQuery = { [sortField]: sortOrder };
        const users = await User.find().sort(sortQuery);
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
    catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});

export default router;