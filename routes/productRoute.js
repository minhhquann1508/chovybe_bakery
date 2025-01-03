const router = require('express').Router();
const controller = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

router
    .get('/', controller.getAllProducts)
    .post('/', controller.createNewProduct)
    .get('/:id', controller.getProductById)
    .put('/:id', controller.updateProduct)
    .delete('/:id', controller.deleteProduct)

module.exports = router;