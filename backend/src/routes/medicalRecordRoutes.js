const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');

router.post('/medical-records', medicalRecordController.createMedicalRecord);

router.put('/medical-records/:id', medicalRecordController.updateMedicalRecord);

router.delete('/medical-records/:id', medicalRecordController.deleteMedicalRecord);

router.get('/medical-records/search', medicalRecordController.searchMedicalRecords);

router.get('/medical-records', medicalRecordController.getAllMedicalRecords);

module.exports = router;
