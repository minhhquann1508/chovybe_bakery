const controller = require('../controllers/categoryController');
const router = require('express').Router();

router
    .get('/', controller.getAllCategories)
    .post('/', controller.createCategory)
    .get('/:id', controller.getCategoryById)
    .put('/:id', controller.updateCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = router;