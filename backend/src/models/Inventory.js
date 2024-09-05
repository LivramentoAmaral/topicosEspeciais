// models/Inventory.js
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
''