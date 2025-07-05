const categoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ status: 'success', data: categories });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categoryService.addCategory(name);
        res.status(201).json({ status: 'success', data: category });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updated = await categoryService.updateCategory(req.params.id, name);
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ status: 'success', message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
