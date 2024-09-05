// models/MedicalRecord.js
const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    recordDate: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String
    },
    notes: {
        type: String
    },
    doctor: {
        type: String,
        required: true
    }
});

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
module.exports = MedicalRecord;
