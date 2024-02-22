const express = require('express')
const Controller = require('../Controllers/Controller')
const router = express.Router()


router.use('/driver', require('./driver'));
router.use('/user', require('./user'));

router.get('/register', Controller.register);
router.post('/register', Controller.saveRegister);




router.get('/login', Controller.login);
router.post('/login', Controller.saveLogin);
router.use(function(req,res,next){
    if (!req.session.userId){
        const error = 'harap login'
        res.redirect(`/login?error=${error}`)
    }
    next()
})

router.get('/home/:id', Controller.home);
router.get('/profilUser/:id',Controller.profilUser)
router.get('/profilUser/delete/:id',Controller.deleteAccount)
router.get('/addUserProfile/:id',Controller.addProfil)
router.post('/addUserProfile/:id',Controller.saveAddProfile)
router.get('/editUser/profile/:id',Controller.userEdit)
router.post('/editUser/profile/:id',Controller.saveEditProfile)
router.get('/logout',Controller.logoutUser)
router.get('/orders/:id',Controller.orderForm)


module.exports = router