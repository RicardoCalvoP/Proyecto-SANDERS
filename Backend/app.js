import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './Models/users.js'; // Asegúrate de que esta ruta sea correcta

dotenv.config();

const app = express();
const router = express.Router();
const port = 5000;

app.use(express.json());

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.error('Connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const content = await User.find();
        res.json(content);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
