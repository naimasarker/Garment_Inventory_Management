const purchaseOrderService = require('../services/purchaseOrderService');

exports.createOrder = async (req, res) => {
    try {
        const result = await purchaseOrderService.createOrder(req.body, req.user.id);
        res.status(201).json({ status: 'success', data: result });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const result = await purchaseOrderService.getAllOrders();
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await purchaseOrderService.updateOrderStatus(id, status);
        res.status(200).json({ status: 'success', message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
