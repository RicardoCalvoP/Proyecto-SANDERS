import express from 'express';
import getDonations from './getDonations.js';
import getEmployees from './getEmployees.js';
import getUsers from './getUsers.js';
const router = express.Router();


router.use(getDonations);
router.use(getEmployees);
router.use(getUsers);



export default router;