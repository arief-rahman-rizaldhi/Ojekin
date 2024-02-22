
const bcrypt = require('bcryptjs')
const { User, UserProfile, Driver, DriverProfile,Order } = require('../models')
const session = require('express-session')
const { DataTypes, Op, where } = require('sequelize')
// const easyinvoice = require('easyinvoice');
const PDFNode = require('pdf-node');
const fs = require('fs');


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
                return res.redirect('/login')
            }
            if (role === 'Driver') {
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
            let { error } = req.query
            res.render('login', { error })
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
                    return res.redirect(`/driver/${user.id}`);
                } else {
                    const error = 'Username/password salah';
                    return res.redirect(`/login?error=${error}`);
                }
            } else {
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
            let { id } = req.params
            let data = await User.findByPk(id, { include: UserProfile })
            let drivers= await Driver.findAll({include:DriverProfile})
            // res.send(drivers)
            res.render('userHome', { data,drivers })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveFormOrders(req,res){
        try {
            let {origin,destination,DriverId}=req.body
            let {id}=req.params
            // console.log(req.body)
            await Order.create({
                UserId:id,
                origin,
                destination,
                DriverId
            })
            res.redirect(`/orders/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async profilUser(req, res) {
        try {
            let { id } = req.params
            let data = await User.findByPk(id, { include: UserProfile })
            // res.send(data)
            res.render('profilUser', { data })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async addProfil(req, res) {
        try {
            res.render('addUserProfile')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveAddProfile(req, res) {
        try {
            let { name, address, profilePicture } = req.body
            let { id } = req.params
            await UserProfile.create({
                name,
                address,
                profilePicture,
                UserId: id
            })
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async userEdit(req, res) {
        try {
            let { id } = req.params
            let data = await UserProfile.findOne({ where: { UserId: id } })
            res.render('editUserProfile', { data })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async saveEditProfile(req, res) {
        try {
            let { name, address, profilePicture } = req.body
            let { id } = req.params
            await UserProfile.update({
                name,
                address,
                profilePicture,

            }, { where: { UserId: id } })
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async deleteAccount(req, res) {
        try {
            let { id } = req.params
            await UserProfile.destroy({ where: { UserId: id } })
            res.redirect(`/profilUser/${id}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static async logoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) res.send(err)
                else {
                    res.redirect('/login')
                }
            })
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
        const { id, UserId } = req.params;
        try {
            console.log(req.params)
        let data1=await Order.findOne({where:{UserId:id},include:{model:User,include:{model:UserProfile}}})
        let data2=await Order.findOne({where:{DriverId:id},include:{model:Driver,include:{model:DriverProfile}}})
        //    res.send(data3)
        res.render('findCustomer',{data1,data2})
            // await DriverProfile.destroy({ where: { DriverId: id } });
            // res.render('findCustomer');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async postFindCustomer(req,res){
        try {
            let {price}=req.body
            let {id}=req.params
            
            await Order.update({
                price
            },{where:{price:null}})
            res.redirect(`/driver/:id`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async orderForm(req, res) {
        const { id, UserId } = req.params;
        try {
            
           let data1=await Order.findOne({where:{UserId:id},include:{model:User,include:{model:UserProfile}}})
           let data2=await Order.findOne({where:{DriverId:id},include:{model:Driver,include:{model:DriverProfile}}})
        //    res.send(data2)
        res.render('orderForm',{data1,data2})
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
    
    static async showInvoice(req, res) {
        try {
            let order = await Order.findAll();
            const invoiceData = {
                "currency": "IDR",
                "taxNotation": "vat",
                "marginTop": 25,
                "marginRight": 25,
                "marginLeft": 25,
                "marginBottom": 25,
                "client": {
                    "company": "Client Corp",
                    "address": "Clientstreet 456",
                    "zip": "4567 CD",
                    "city": "Clientcity",
                    "country": "Clientcountry"
                },
                "invoiceNumber": "20220001",
                "invoiceDate": new Date(order[0].createdAt).toDateString(),
                "products": [],
                "bottomNotice": "Kindly pay your invoice within 15 days."
            };
    
            for (let orders of order) {
                invoiceData.products.push({
                    "description": `Transportation Service from ${orders.origin} to ${orders.destination}`,
                    "price": orders.price
                });
            }
    
            const pdf = await PDFNode.renderPDF(invoiceData);
    
            // Simpan PDF ke file
            const fileName = 'invoice.pdf';
            fs.writeFileSync(fileName, pdf);
    
            // Kirimkan PDF sebagai respons
            res.download(fileName, fileName);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send(error.message);
        }
    }

}
module.exports = Controller