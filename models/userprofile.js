'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    
    static associate(models) {
      UserProfile.belongsTo(models.User,{foreignKey:'UserId'});
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};