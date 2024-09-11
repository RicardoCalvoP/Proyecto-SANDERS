import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
        type: String, required: false, default: "NA"
    },
    num_donations: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

export default User;
