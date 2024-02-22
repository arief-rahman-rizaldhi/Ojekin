'use strict';
const {
  Model
} = require('sequelize');
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
  });
  return Driver;
};