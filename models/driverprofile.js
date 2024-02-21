'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DriverProfile.belongsTo(models.Driver, {
        foreignKey: 'DriverId'
      });
    }
  }
  DriverProfile.init({
    name: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    PhoneNumber: DataTypes.INTEGER,
    licensePlate: DataTypes.INTEGER,
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