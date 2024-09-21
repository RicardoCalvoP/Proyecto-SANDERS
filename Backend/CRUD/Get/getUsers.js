import express from 'express';
import { User } from '../../Models/models.js'

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