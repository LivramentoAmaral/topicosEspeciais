const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments', appointmentController.createAppointment);

router.put('/appointments/:id', appointmentController.updateAppointment);

router.delete('/appointments/:id', appointmentController.deleteAppointment);

router.get('/appointments/search', appointmentController.searchAppointments);

router.get('/appointments', appointmentController.getAllAppointments);

module.exports = router;
