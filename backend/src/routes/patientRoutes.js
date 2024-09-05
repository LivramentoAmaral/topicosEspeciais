const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');


router.post('/patients',protect, patientController.createPatient);

router.put('/patients/:id',protect, patientController.updatePatient);

router.delete('/patients/:id',protect, patientController.deletePatient);

router.get('/patients/search',protect, patientController.searchPatients);

router.get('/patients',protect, patientController.getAllPatients);

module.exports = router;
