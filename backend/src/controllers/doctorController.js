const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar médico', error });
    }
};
exports.updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar médico', error });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }
        res.status(200).json({ message: 'Médico deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar médico', error });
    }
};
exports.searchDoctors = async (req, res) => {
    const { name, specialty, workingHours } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, 'i');
    if (specialty) query.specialty = new RegExp(specialty, 'i');
    if (workingHours) query.workingHours = new RegExp(workingHours, 'i');

    try {
        const doctors = await Doctor.find(query);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar médicos', error });
    }
};
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar médicos', error });
    }
};
