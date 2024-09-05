const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/doctors', doctorController.createDoctor);

router.put('/doctors/:id', doctorController.updateDoctor);

router.delete('/doctors/:id', doctorController.deleteDoctor);

router.get('/doctors/search', doctorController.searchDoctors);

router.get('/doctors', doctorController.getAllDoctors);

module.exports = router;
