import express from 'express';
import getRoutes from './getRoutes.js';
import postRoutes from './postRoutes.js';
// import putRoutes from './putRoutes.js'; // Ruta para PUT (actualización)
// import deleteRoutes from './deleteRoutes.js'; // Ruta para DELETE (eliminación)

const router = express.Router();

router.use(getRoutes);
router.use(postRoutes);
// router.use(putRoutes);
// router.use(deleteRoutes);

export default router;
