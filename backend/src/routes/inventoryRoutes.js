// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/inventory',protect, inventoryController.createInventoryItem);

router.put('/inventory/:id',protect, inventoryController.updateInventoryItem);

router.delete('/inventory/:id',protect, inventoryController.deleteInventoryItem);

router.get('/inventory/search',protect, inventoryController.searchInventoryItems);

router.get('/inventory',protect, inventoryController.getAllInventoryItems);

module.exports = router;
