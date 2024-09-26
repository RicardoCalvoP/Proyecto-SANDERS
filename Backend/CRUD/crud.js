import express from 'express';
import postRoutes from './Post/postRoutes.js';
import getRoutes from './Get/getRoutes.js';
import updateRoutes from './Update/updateRoutes.js'
import deleteRoutes from './Delete/deleteRoutes.js';
const router = express.Router();

router.use(getRoutes);
router.use(postRoutes);
router.use(deleteRoutes);
router.use(updateRoutes);

export default router;
