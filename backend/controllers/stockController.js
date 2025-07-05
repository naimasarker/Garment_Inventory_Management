const stockService = require('../services/stockService');

exports.recordTransaction = async (req, res) => {
    try {
        const transaction = await stockService.recordTransaction(req.body, req.user.id);
        res.status(201).json({ status: 'success', data: transaction });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const data = await stockService.getAllTransactions();
        res.status(200).json({ status: 'success', data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
