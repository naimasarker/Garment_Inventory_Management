const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin, isManager } = require('../middlewares/authMiddleware');

router.get('/categories', authenticateToken, categoryController.getAllCategories);
router.post('/categories', authenticateToken, isManager, categoryController.addCategory);
router.put('/categories/:id', authenticateToken, isManager, categoryController.updateCategory);
router.delete('/categories/:id', authenticateToken, isManager, categoryController.deleteCategory);

router.get('/', authenticateToken, productController.getAllProducts);
router.post('/', authenticateToken, isManager, productController.addProduct);
router.put('/:id', authenticateToken, isManager, productController.updateProduct);
router.delete('/:id', authenticateToken, isManager, productController.deleteProduct);


module.exports = router;
