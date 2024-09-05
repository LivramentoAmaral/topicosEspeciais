const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar paciente', error });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar paciente', error });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }
        res.status(200).json({ message: 'Paciente deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar paciente', error });
    }
};

exports.searchPatients = async (req, res) => {
    const { name, age, gender } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, 'i');
    if (age) query.age = age;
    if (gender) query.gender = gender;

    try {
        const patients = await Patient.find(query);
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pacientes', error });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar pacientes', error });
    }
};
