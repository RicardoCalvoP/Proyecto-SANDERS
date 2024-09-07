import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import User from './Models/users.js';




dotenv.config();

const app = express();
//app.use(cors());
app.use(express.json());


const port = 5001;

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/users", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Server connected to DataBase');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});


app.listen(port, () => {
    connectDB()
    console.log(`Server running on http://localhost:${port}`);
});
