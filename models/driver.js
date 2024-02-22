'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.hasOne(models.DriverProfile);
    }
  }
  Driver.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
    hooks:{
      beforeCreate(value){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value.password, salt);
        value.password=hash
      }
    }
  });
  return Driver;
};