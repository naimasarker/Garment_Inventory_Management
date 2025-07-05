const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, stockController.recordTransaction);
router.get('/', authenticateToken, stockController.getAllTransactions);

module.exports = router;
