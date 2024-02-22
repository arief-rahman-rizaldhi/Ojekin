'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: 'UserId' });
      User.hasMany(models.Order)
      User.belongsToMany(models.Driver, {
        through: models.Order,
        foreignKey: "UserId",
        otherKey: "DriverId"
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(value) {
        value.role = 'Users'
      }
    }
  });
  return User;
};