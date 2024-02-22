
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
            let { username, email, password, role } = req.body
            console.log(req.body)
            if (role === 'User') {
                await User.create({
                    username,
                    email,
                    password,
                    role
                })
            }
            if (role === 'Driver') {
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
            let { username, password, role } = req.body

            if (role === 'User') {
                await User.findOne({ where: { username } })
                    .then(User => {
                        const validPassword = bcrypt.compareSync(password, User.password);
                        if (validPassword) {
                            return res.redirect('/')
                        }
                        else {
                            const error = 'Username/password salah'
                            return res.redirect(`/login?error=${error}`)
                        }
                    })
            }
            if (role === 'Driver') {
                await Driver.findOne({ where: { username } })
                    .then(Driver => {
                        const validPassword = bcrypt.compareSync(password, Driver.password);
                        if (validPassword) {
                            return res.redirect('/')
                        }
                        else {
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
            let data = await User.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showDriverPage(req, res) {
        const { id } = req.params;
        const { name } = req.query;
        try {
            const data = await Driver.findByPk(+id, {
                include: { model: DriverProfile }
            });
            res.render('driverPage', { data, name });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addDriverProfile(req, res) {
        const { id } = req.params;
        const { error } = req.query;
        try {
            const data = await Driver.findByPk(+id);
            res.render('addProfile', { data, error });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async createDriverProfile(req, res) {
        const { id } = req.params;
        const { name, profilePicture, phoneNumber, licensePlate } = req.body;
        try {
            await DriverProfile.create({
                name,
                profilePicture,
                phoneNumber,
                licensePlate,
                DriverId: id,
            }, {
                where: { id: id }
            });
            res.redirect(`/driver/${id}`);
        } catch (error) {
            console.log(error);
            if (error.name == "SequelizeValidationError") {
                const message = error.errors.map((e) => e.message);
                res.redirect(`/driver/${id}/profile/add?error=${message}`);
            } else {
                res.send(error.message);
            }
        }
    }

    static async editDriverProfile(req, res) {
        const { id } = req.params;
        const { error } = req.query;
        try {
            const data = await DriverProfile.findOne({
                where: { DriverId: id },
                include: { model: Driver }
            });
            res.render('editProfile', { data, error });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async updateDriverProfile(req, res) {
        const { id } = req.params;
        const { name, profilePicture, phoneNumber, licensePlate } = req.body;
        try {
            await DriverProfile.update({
                name,
                profilePicture,
                phoneNumber,
                licensePlate,
                DriverId: id,
            }, {
                where: { DriverId: id }
            });
            res.redirect(`/driver/${id}`);
        } catch (error) {
            console.log(error);
            if (error.name == "SequelizeValidationError") {
                const message = error.errors.map((e) => e.message);
                res.redirect(`/driver/${id}/profile/edit?error=${message}`);
            } else {
                res.send(error.message);
            }
        }
    }

    static async deleteDriverAccount(req, res) {
        const { id } = req.params;
        try {
            const driver = await DriverProfile.findOne({ where: { DriverId: id } })
            await DriverProfile.destroy({ where: { DriverId: id } });
            res.redirect(`/driver/${id}/?name=${driver.name}`);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async findCustomer(req, res) {
        const { id } = req.params;
        try {

            // await DriverProfile.destroy({ where: { DriverId: id } });
            res.render('findCustomer');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }



}
module.exports = Controller