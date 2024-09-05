const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',  // Referencia ao modelo Patient
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
        type: mongoose.Schema.Types.ObjectId,  // Referencia ao modelo Doctor
        ref: 'Doctor',  // Define a referência ao modelo Doctor
        required: true
    }
});

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
module.exports = MedicalRecord;
