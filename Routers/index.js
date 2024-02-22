const express = require('express')
const Controller = require('../Controllers/Controller')
const router = express.Router()

router.get('/', Controller.home);
router.use('/driver', require('./driver'));
router.use('/user', require('./user'));
router.get('/login', Controller.login);
router.post('/login', Controller.saveLogin);
router.get('/register', Controller.register);
router.post('/register', Controller.saveRegister);

module.exports = router