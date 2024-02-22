'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverProfile extends Model {

    static associate(models) {
      DriverProfile.belongsTo(models.Driver, {
        foreignKey: 'DriverId'
      });
    }
  }
  DriverProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
        notNull: {
          msg: "Name is required",
        },
        len: {
          msg: "Invalid name minimum length character is 3 and max 50",
          args: [3, 50]
        },
      },
    },
    profilePicture: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true,
      validate: {
        notEmpty: {
          msg: "Phone Number is required",
        },
        notNull: {
          msg: "Phone Number is required",
        },
        isMobilePhone: {
          msg: "Invalid Phone Number its must be from indonesia",
          args: { strictMode: true, locale: 'id-ID' },
        },
      },
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "License Plate is required",
        },
        notNull: {
          msg: "License Plate is required",
        },
      },
    },
    DriverId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Drivers",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'DriverProfile',
  });
  return DriverProfile;
};