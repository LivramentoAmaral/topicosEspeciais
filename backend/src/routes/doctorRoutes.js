const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/doctors',protect, doctorController.createDoctor);

router.put('/doctors/:id',protect, doctorController.updateDoctor);

router.delete('/doctors/:id',protect, doctorController.deleteDoctor);

router.get('/doctors/search',protect, doctorController.searchDoctors);

router.get('/doctors',protect, doctorController.getAllDoctors);

module.exports = router;
