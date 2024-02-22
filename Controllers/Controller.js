
const bcrypt = require('bcryptjs')
const { User, UserProfile, Driver, DriverProfile } = require('../models')


class Controller {
    static async register(req, res) {
        try {
            let data = await User.findAll()
            res.render('registerUser')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveRegister(req, res) {
        try {
            let {username,email,password,role}=req.body
            console.log(req.body)
            if(role==='User'){
                return await User.create({
                    username,
                    email,
                    password,
                    role
                })
            }
            if(role==='Driver'){
                await Driver.create({
                    username,
                    email,
                    password,
                    role
                })
            }
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async login(req, res) {
        try {
            // let data = await User.findAll()
            // res.send(data)
            res.render('login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveLogin(req, res) {
        try {
            let {username,password,role}=req.body
            
            if(role==='User'){
                await User.findOne({where:{username}})
                .then(User=>{
                    const validPassword = bcrypt.compareSync(password, User.password); 
                    if(validPassword){
                        return res.redirect('/')
                    }
                    else{
                        const error = 'Username/password salah'
                        return res.redirect(`/login?error=${error}`)
                    }})
            }
            if(role==='Driver'){
                await Driver.findOne({where:{username}})
                .then(Driver=>{
                const validPassword = bcrypt.compareSync(password, Driver.password); 
                if(validPassword){
                    return res.redirect('/')
                }
                else{
                    const error = 'Username/password salah'
                    return res.redirect(`/login?error=${error}`)
                }
                })
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async home(req, res) {
        try {
            let data=await User.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showDriverPage(req, res) {
        try {
            const data = await Driver.findAll();
            res.render('driverPage', { data });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

}
module.exports = Controller