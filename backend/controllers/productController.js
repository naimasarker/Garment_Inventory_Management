const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const data = await productService.getAllProducts();
        res.status(200).json({ status: 'success', data });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        res.status(201).json({ status: 'success', data: product });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: product });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ status: 'success', message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
};
