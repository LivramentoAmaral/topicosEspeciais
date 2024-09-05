// models/Doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    workingHours: {
        type: String, // Exemplo: "Seg-Sex: 09h-17h"
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
