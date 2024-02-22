'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    
    static associate(models) {
      Driver.hasOne(models.DriverProfile);
      Driver.hasMany(models.Order);
      Driver.belongsToMany(models.User, {
        through: models.Order,
        foreignKey: "DriverId",
        otherKey: "UserId"
      });
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