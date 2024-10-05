import express from 'express';
import { Donation } from '../../Models/models.js'
import router from './getUsers.js';

// Get all donations (GET /donations)
router.get('/donations', async (req, res) => { //  authenticateJWT, was removed
    try {

        // Get parameters sort & order from frontend
        const { _sort = 'date', _order = 'ASC', donator_name, donator_surname, donator_email, kind } = req.query;
        // Convert order to mongoose format
        const sortOrder = _order === 'ASC' ? 1 : -1;

        // Map fields that can be sorted to the real fields in mongo db
        const sortFields = {
            donator_name: 'donator_name',
            donator_surname: 'donator_surname',
            amount: 'amount',
            date: 'date',
        };

        // Verify if the sort field exists in map
        const sortField = sortFields[_sort] || 'rol'; // Default: sort date if any there's no input

        //Create order object for mongo
        const sortQuery = { [sortField]: sortOrder };

        const filterQuery = {};

        if (donator_name) {
            filterQuery.donator_name = donator_name;
        }
        if (donator_surname) {
            filterQuery.donator_surname = donator_surname;
        }
        if (donator_email) {
            filterQuery.donator_email = donator_email;
        }
        if (kind) {
            filterQuery.kind = kind;
        }

        const donations = await Donation.find(filterQuery).sort(sortQuery);
        const donationWithId = donations.map(donation => ({
            id: donation._id, // Transform _id to id for React-Admin
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
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;