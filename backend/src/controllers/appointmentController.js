const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar agendamento', error });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar agendamento', error });
    }
};

// Deletar um agendamento
exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar agendamento', error });
    }
};

exports.searchAppointments = async (req, res) => {
    const { patient, doctor, status } = req.query;
    const query = {};

    if (patient) query.patient = patient;
    if (doctor) query.doctor = doctor;
    if (status) query.status = status;

    try {
        const appointments = await Appointment.find(query).populate('patient');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar agendamentos', error });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patient');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar agendamentos', error });
    }
};
