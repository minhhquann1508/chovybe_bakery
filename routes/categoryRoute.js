const router = require('express').Router();
const controller = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

router
    .get('/', controller.getAllCategories)
    .post('/', verifyToken, controller.createCategory)
    .get('/:id', controller.getCategoryById)
    .put('/:id', controller.updateCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = router;