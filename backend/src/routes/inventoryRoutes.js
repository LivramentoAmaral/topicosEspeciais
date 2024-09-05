// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/inventory', inventoryController.createInventoryItem);

router.put('/inventory/:id', inventoryController.updateInventoryItem);

router.delete('/inventory/:id', inventoryController.deleteInventoryItem);

router.get('/inventory/search', inventoryController.searchInventoryItems);

router.get('/inventory', inventoryController.getAllInventoryItems);

module.exports = router;
