import express from 'express';
import postDonations from './postDonation.js';
import postEmployees from './postEmployees.js';
import postUsers from './postUsers.js'
import postLogin from '../../LoginBackend/login.js';

const router = express.Router();

router.use(postDonations);
router.use(postEmployees);
router.use(postUsers);
router.use(postLogin);

export default router;
