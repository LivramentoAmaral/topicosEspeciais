// models/Patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Masculino', 'Feminino', 'Outro'],
        default: 'Outro',
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
    