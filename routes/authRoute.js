const controller = require('../controllers/authController');
const router = require('express').Router();

router
    .post('/register', controller.register)
    .post('/login', controller.login)

module.exports = router;