import express from 'express';
import getRoutes from './getRoutes.js';
import postRoutes from './postRoutes.js';
// import putRoutes from './putRoutes.js'; // Ruta para PUT (actualización)
import deleteRoutes from './deleteRoutes.js'; // Ruta para DELETE (eliminación)
import employeeController from '../Controls/employeeController.js'
const router = express.Router();

router.use(getRoutes);
router.use(postRoutes);
//Log in
router.post('/login', employeeController.login); // Ruta para login de usuario
// router.use(putRoutes);
router.use(deleteRoutes);

export default router;
