const express = require('express')
const Controller = require('../Controllers/Controller')

const router = express.Router()


router.get('/register', Controller.register)
router.post('/register', Controller.saveRegister)
router.get('/login', Controller.login)
router.post('/login', Controller.saveLogin)
router.get('/', Controller.home)


module.exports = router