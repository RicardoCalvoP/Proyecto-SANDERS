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
        // Obtener la fecha actual
        const currentDate = new Date();

        // Calcular la fecha de hace 7 días
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - 7);

        // Crear un objeto para almacenar los días de la semana en orden inverso
        const daysOfWeek = {};
        for (let i = 6; i >= 0; i--) {  // Empezamos desde el día más antiguo y avanzamos
            const date = new Date();
            date.setDate(currentDate.getDate() - i);  // Avanzamos hacia el presente
            const formattedDate = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            daysOfWeek[formattedDate] = 0;  // Inicializamos cada día con 0 donaciones
        }

        // Buscar donaciones entre la fecha de hace 7 días y la fecha actual
        const donations = await Donation.find({
            date: { $gte: pastDate, $lte: currentDate }
        });

        // Contar donaciones por día
        donations.forEach(donation => {
            const donationDate = new Date(donation.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });

            // Incrementamos el contador si hay donaciones ese día
            if (daysOfWeek[donationDate] !== undefined) {
                daysOfWeek[donationDate]++;
            }
        });

        // Convertimos el objeto en un array para poder enviarlo como respuesta
        const donationsArray = Object.keys(daysOfWeek).map(day => ({
            day,
            donations: daysOfWeek[day],
        }));

        // Enviamos la respuesta con los datos de los últimos 7 días
        res.json(donationsArray);
    } catch (error) {
        console.error('Error al obtener las donaciones:', error);
        res.status(500).json({ error: 'Error al obtener las donaciones.' });
    }
});

export default router;