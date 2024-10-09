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

// Get a number of recent donations (GET /donations/recent/:num)
router.get('/donations/recent/:num', async (req, res) => {
    try {
        // Get the number of donations to return from the URL parameter
        const numDonations = parseInt(req.params.num, 10); // Convert :num to an integer

        // Build sorting and filtering logic (you can add filter logic as needed)
        const sortQuery = { date: -1 }; // Sort by date descending to get the most recent donations

        // Find the donations, sort by date (descending), and limit the results to 'numDonations'
        const donations = await Donation.find().sort(sortQuery).limit(numDonations);

        // Map the donations to include the 'id' field instead of '_id'
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

        // Set the total count header for pagination
        res.set('X-Total-Count', donationWithId.length); // Set the number of donations returned
        res.json(donationWithId); // Return the donation data as JSON
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para obtener las donaciones de los últimos 7 días
router.get('/donations/week', async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date from 7 days ago
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - 7);

        // Create an object to store the days of the week in reverse order
        const daysOfWeek = {};
        for (let i = 6; i >= 0; i--) {  // Start from the oldest day and move towards today
            const date = new Date();
            date.setDate(currentDate.getDate() - i);  // Move towards the present
            const formattedDate = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            daysOfWeek[formattedDate] = 0;  // Initialize each day with 0 donations
        }

        // Search for donations between the date from 7 days ago and the current date
        const donations = await Donation.find({
            date: { $gte: pastDate, $lte: currentDate }
        });

        // Count donations per day
        donations.forEach(donation => {
            const donationDate = new Date(donation.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });

            // Increment the count if donations exist for that day
            if (daysOfWeek[donationDate] !== undefined) {
                daysOfWeek[donationDate]++;
            }
        });

        // Convert the object into an array to send it as a response
        const donationsArray = Object.keys(daysOfWeek).map(day => ({
            day,
            donations: daysOfWeek[day],
        }));

        // Send the response with the data from the last 7 days
        res.json(donationsArray);
    } catch (error) {
        console.error('Error getting donations:', error);
        res.status(500).json({ error: 'Error getting donations.' });
    }
});


// Get amount of donations depending on type
router.get('/donations/types', async (req, res) => {
    try {
        // Group donations by "kind" and count the number of each type
        const donationTypesCount = await Donation.aggregate([
            {
                $group: {
                    _id: "$kind", // Group by the "kind" field
                    count: { $sum: 1 } // Count how many donations for each kind
                }
            }
        ]);

        // Create an object with donation types and their counts
        const donationTypeData = {};
        donationTypesCount.forEach(donation => {
            donationTypeData[donation._id] = donation.count;
        });

        // Return the result in a structured format
        res.json(donationTypeData);
    } catch (error) {
        console.error('Error fetching donation types:', error);
        res.status(500).json({ error: 'Error fetching donation types.' });
    }
});

// Get top 3 donors by total donation amount
router.get('/donations/top-donors-by-amount', async (req, res) => {
    try {
        const topDonorsByAmount = await Donation.aggregate([
            {
                $group: {
                    _id: "$donator_email", // Group by user email (or use user id if available)
                    totalAmount: { $sum: "$amount" },  // Sum the total donation amount
                    name: { $first: "$donator_name" },  // Take the first name for display purposes
                    surname: { $first: "$donator_surname" } // Take the first surname for display
                }
            },
            { $sort: { totalAmount: -1 } },   // Sort by total amount in descending order
            { $limit: 5 }                     // Return only the top 3
        ]);
        res.json(topDonorsByAmount);
    } catch (error) {
        console.error('Error fetching top donors by amount:', error);
        res.status(500).json({ error: 'Error fetching top donors by amount.' });
    }
});

// Get top 3 donors by number of donations
router.get('/donations/top-donors-by-count', async (req, res) => {
    try {
        const topDonorsByCount = await Donation.aggregate([
            {
                $group: {
                    _id: "$donator_email", // Group by user email (or use user id if available)
                    count: { $sum: 1 },    // Count number of donations
                    name: { $first: "$donator_name" },  // Take the first name for display purposes
                    surname: { $first: "$donator_surname" } // Take the first surname for display
                }
            },
            { $sort: { count: -1 } },   // Sort by count in descending order
            { $limit: 5 }               // Return only the top 3
        ]);
        res.json(topDonorsByCount);
    } catch (error) {
        console.error('Error fetching top donors by count:', error);
        res.status(500).json({ error: 'Error fetching top donors by count.' });
    }
});



export default router;