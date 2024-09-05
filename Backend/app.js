"use strict"

import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';



const app = express()
const router = express.Router();
require("dotenv").config();

const port = 5000

app.use(express.json())
// Conection with mongodb
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; // check for any conectivity errors
db.on('error', (err) => console.error('Connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const content = await users.find();
        res.json(content);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
