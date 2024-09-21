import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/SANDERS", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000

        });
        console.log('Server connected to DataBase');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}
