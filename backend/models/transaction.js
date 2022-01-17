'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Order, {
        foreignKey: {
          name: 'orderId',
          allowNull: false
        },
        as: 'test'
      });    }
  };
  
  Transaction.init({
    number: DataTypes.INTEGER,
    hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  



  return Transaction;
};


