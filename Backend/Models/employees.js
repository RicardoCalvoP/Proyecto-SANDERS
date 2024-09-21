import mongoose from 'mongoose';

const employeesSchema = new mongoose.Schema({
    name: { type: String, require: true },
    surname: { type: String, required: true },
    rol: { type: String, required: true },
    phone: {
        type: String, required: false, default: 'NA'
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const Employee = mongoose.model('Employee', employeesSchema);

export default Employee;
