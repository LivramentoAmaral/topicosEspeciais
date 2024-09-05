const Resource = require('../models/Resource');

exports.createResource = async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar recurso', error });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Recurso não encontrado' });
        }
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar recurso', error });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Recurso não encontrado' });
        }
        res.status(200).json({ message: 'Recurso deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar recurso', error });
    }
};

exports.searchResources = async (req, res) => {
    const { name, type, availability } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, 'i');
    if (type) query.type = type;
    if (availability !== undefined) query.availability = availability === 'true';

    try {
        const resources = await Resource.find(query).populate('allocatedTo');
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar recursos', error });
    }
};

exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find().populate('allocatedTo');
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar recursos', error });
    }
};
