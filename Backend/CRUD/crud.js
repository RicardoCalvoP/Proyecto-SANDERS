import express from 'express';
import getRoutes from './Get/getRoutes.js  ';
import postRoutes from './Post/postRoutes.js';
import deleteRoutes from './Delete/deleteRoutes.js'; // Ruta para DELETE (eliminación)
const router = express.Router();

router.use(getRoutes);
router.use(postRoutes);
router.use(deleteRoutes);

export default router;
