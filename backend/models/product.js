'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.belongsToMany(models.Order, { 
        through: models.OrderProduct 
      });

    
    }
  };
  
  Product.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price:DataTypes.DECIMAL(6,2),
    description: DataTypes.STRING,
    province: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });


  return Product;
};


