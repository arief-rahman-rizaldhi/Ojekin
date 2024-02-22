
const bcrypt = require('bcryptjs')
const { User, UserProfile, Driver, DriverProfile } = require('../models')
const session = require('express-session')


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
                 await User.create({
                    username,
                    email,
                    password,
                    role
                })
                return res.redirect('/login')
            }
            if(role==='Driver'){
                await Driver.create({
                    username,
                    email,
                    password,
                    role
                })
                return res.redirect('/login')
            }
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async login(req, res) {
        try {
            // let data = await User.findAll()
            // res.send(data)
            let {error}=req.query
            res.render('login',{error})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveLogin(req, res) {
        try {
            const { username, password, role } = req.body;

        // Periksa apakah semua field sudah terisi
        if (!username || !password || !role) {
            const error = 'Username/password salah';
            return res.redirect(`/login?error=${error}`);
        }

        if (role === 'User') {
            // Temukan user berdasarkan username
            const user = await User.findOne({ where: { username } });

            // Periksa apakah user ditemukan
            if (!user) {
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }

            // Periksa kecocokan password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                req.session.userId = user.id;
                return res.redirect(`/home/${user.id}`);
            } else {
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }
        } 
        if (role === 'User') {
            // Temukan user berdasarkan username
            const user = await User.findOne({ where: { username } });

            // Periksa apakah user ditemukan
            if (!user) {
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }

            // Periksa kecocokan password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                req.session.userId = user.id;
                return res.redirect(`/home/${user.id}`);
            } else {
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }
        } if (role === 'Driver') {
            // Temukan user berdasarkan username
            const user = await Driver.findOne({ where: { username } });

            // Periksa apakah user ditemukan
            if (!user) {    
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }

            // Periksa kecocokan password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                req.session.userId = user.id;
                return res.redirect(`/home/${user.id}`);
            } else {
                const error = 'Username/password salah';
                return res.redirect(`/login?error=${error}`);
            }
        }else {
            // Handle jika role selain 'User' tidak terdefinisi
            const error = 'Role tidak valid';
            return res.redirect(`/login?error=${error}`);
        }
        
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async home(req, res) {
        try {
            let {id}=req.params
            let data=await User.findByPk(id,{include:UserProfile})
            // res.send(data)
            res.render('userHome',{data})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async profilUser(req,res){
        try {
            let {id}=req.params
            let data=await User.findByPk(id,{include:UserProfile})
            // res.send(data)
            res.render('profilUser',{data})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async addProfil(req,res){
        try {
            res.render('addUserProfile')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveAddProfile(req,res){
        try {
            let {name,address,profilePicture}=req.body
            let {id}=req.params
            await UserProfile.create({
                name,
                address,
                profilePicture,
                UserId:id
            })
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async userEdit(req,res){
        try {
            let {id}=req.params
            let data = await UserProfile.findOne({where:{UserId:id}})
            res.render('editUserProfile',{data})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveEditProfile(req,res){
        try {
            let {name,address,profilePicture}=req.body
            let {id}=req.params
            await UserProfile.update({
                name,
                address,
                profilePicture,
                
            },{where:{UserId:id}})
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async deleteAccount(req,res){
        try {
            let {id}=req.params
            await UserProfile.destroy({where:{UserId:id}})
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async logoutUser(req,res){
        try {
            req.session.destroy((err)=>{
                if(err)res.send(err)
                else{
                    res.redirect('/login')
                }
            })
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