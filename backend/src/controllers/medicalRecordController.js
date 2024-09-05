const MedicalRecord = require('../models/MedicalRecord');

exports.createMedicalRecord = async (req, res) => {
    try {
        const newRecord = new MedicalRecord(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar prontuário médico', error });
    }
};

exports.updateMedicalRecord = async (req, res) => {
    try {
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Prontuário não encontrado' });
        }
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar prontuário médico', error });
    }
};

exports.deleteMedicalRecord = async (req, res) => {
    try {
        const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Prontuário não encontrado' });
        }
        res.status(200).json({ message: 'Prontuário deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar prontuário médico', error });
    }
};

exports.searchMedicalRecords = async (req, res) => {
    const { patient, diagnosis, doctor, recordDate } = req.query;
    const query = {};

    if (patient) query.patient = patient;
    if (diagnosis) query.diagnosis = new RegExp(diagnosis, 'i');
    if (doctor) query.doctor = doctor;
    if (recordDate) query.recordDate = { $gte: new Date(recordDate) };

    try {
        const records = await MedicalRecord.find(query)
            .populate('patient')
            .populate('doctor');
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar prontuários médicos', error });
    }
};

exports.getAllMedicalRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find()
            .populate('patient')
            .populate('doctor');
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar prontuários médicos', error });
    }
};
