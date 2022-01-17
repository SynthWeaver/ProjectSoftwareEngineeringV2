'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Image.belongsTo(models.Product, { through: models.Product });
    }

  };
  
  Image.init({
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
