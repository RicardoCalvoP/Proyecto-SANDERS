import express from 'express';
import { User } from '../../Models/models.js';

const router = express.Router();

// Create new user (POST /users)
router.post('/usuarios', async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

export default router;