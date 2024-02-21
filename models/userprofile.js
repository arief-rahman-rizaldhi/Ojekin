'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User,{foreignKey:'UserId'})
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    profilPictur: DataTypes.STRING,
    alamat: DataTypes.STRING,
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