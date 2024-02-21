const {User,UserProfile} = require('../models')


class Controller{
    static async register(req,res){
        try {
            let data = await User.findAll()
            res.render('registerUser')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveRegister(req,res){
        try {
            let {userName,email,password}=req.body
            await User.create({
                userName,
                email,
                password
            })
            res.redirect('/')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async login(req,res){
        try {
            // let data = await User.findAll()
            // res.send(data)
            res.render('login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveLogin(req,res){
        try {
            console.log(req.body)
            let{userName,password}=req.body
            let data=await User.findAll({where:{userName:userName,
            password:password}})
            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async home(req,res){
        try {
            console.log(req.body)
            let{userName,password}=req.body
            let data=await User.findAll({where:{userName:userName,
            password:password}})
            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

}
module.exports=Controller