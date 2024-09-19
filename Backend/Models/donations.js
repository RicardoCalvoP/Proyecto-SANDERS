import mongoose, { mongo } from "mongoose";

const donationSchema = new mongoose.Schema({

    donator_name: { type: String, required: true },
    donator_surname: { type: String, required: true },
    donator_email: { type: String, required: true },
    donator_phone: { type: String },
    comment: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    kind: { type: String, default: 'En linea' }

});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;