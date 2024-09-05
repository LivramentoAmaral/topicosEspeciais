const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Rota para registro
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);

module.exports = router;
