const Inventory = require('../models/Inventory');

exports.createInventoryItem = async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao adicionar item ao inventário', error });
    }
};
exports.updateInventoryItem = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar item do inventário', error });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar item do inventário', error });
    }
};
exports.searchInventoryItems = async (req, res) => {
    const { medicationName, quantity, expiryDate } = req.query;
    const query = {};

    if (medicationName) query.medicationName = new RegExp(medicationName, 'i'); 
    if (quantity) query.quantity = { $gte: Number(quantity) }; 
    if (expiryDate) query.expiryDate = { $lte: new Date(expiryDate) }; 
    try {
        const items = await Inventory.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar itens no inventário', error });
    }
};

exports.getAllInventoryItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar itens do inventário', error });
    }
};
