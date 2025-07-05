const express = require('express');
const router = express.Router();
const controller = require('../controllers/purchaseOrderController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, controller.createOrder);
router.get('/', authenticateToken, controller.getAllOrders);
router.patch('/:id/status', authenticateToken, controller.updateOrderStatus);

module.exports = router;
