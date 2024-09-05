const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/appointments',protect, appointmentController.createAppointment);

router.put('/appointments/:id',protect, appointmentController.updateAppointment);

router.delete('/appointments/:id',protect, appointmentController.deleteAppointment);

router.get('/appointments/search',protect, appointmentController.searchAppointments);

router.get('/appointments',protect, appointmentController.getAllAppointments);

module.exports = router;
