const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/medical-records',protect, medicalRecordController.createMedicalRecord);

router.put('/medical-records/:id',protect, medicalRecordController.updateMedicalRecord);

router.delete('/medical-records/:id',protect, medicalRecordController.deleteMedicalRecord);

router.get('/medical-records/search',protect, medicalRecordController.searchMedicalRecords);

router.get('/medical-records',protect, medicalRecordController.getAllMedicalRecords);

module.exports = router;
