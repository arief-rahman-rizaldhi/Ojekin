'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Driver);
    }

    get tanggalOrder() {
      return this.createdAt.toLocaleString("id-ID", { timeStyle: "short", dateStyle: "long" });
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};