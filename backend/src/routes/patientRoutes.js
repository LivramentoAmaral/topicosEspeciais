const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/patients', patientController.createPatient);

router.put('/patients/:id', patientController.updatePatient);

router.delete('/patients/:id', patientController.deletePatient);

router.get('/patients/search', patientController.searchPatients);

router.get('/patients', patientController.getAllPatients);

module.exports = router;
