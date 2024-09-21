import express from 'express';
import { Donation } from '../../Models/models.js';

const router = express.Router();

// Create new donation (POST /donaciones)
router.post('/donaciones', async (req, res) => {
    try {
        // Search for user by email
        let user = await User.findOne({ email: req.body.donator_email });

        if (!user) {
            // If user doesn't exist, create a new user
            user = new User({
                name: req.body.donator_name,
                surname: req.body.donator_surname,
                email: req.body.donator_email,
                phone: req.body.donator_phone,
                num_donations: 1
            });
        }
        // If user exists change num_donations by 1
        else {
            user.num_donations += 1;
            // Check if any new phone is given
            if (req.body.donator_phone) { // If there is no phone provided, it keeps last phone value
                // Change phone param
                user.phone = req.body.donator_phone;
            }
        }


        // Save or update user
        const savedUser = await user.save();

        // Create Donation
        const newDonation = new Donation({
            donator_name: req.body.donator_name,
            donator_surname: req.body.donator_surname,
            donator_email: req.body.donator_email,
            donator_phone: req.body.donator_phone,
            comment: req.body.comment,
            amount: req.body.amount,
            kind: req.body.kind
        });
        const savedDonation = await newDonation.save(); // Save Donation in DB
        console.log(savedDonation);
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
                date: savedDonation.date,
                kind: savedDonation.kind,
            }
        });
    } catch (err) {
        console.error('Error al crear donación:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;