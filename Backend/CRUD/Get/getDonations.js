import express from 'express';
import { Donation } from '../../Models/models.js'
import router from './getUsers.js';

// Get all donations (GET /donations)
router.get('/donaciones', async (req, res) => { //  authenticateJWT, was removed
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
        res.status(500).json({ error: err.message });
    }
});

export default router;