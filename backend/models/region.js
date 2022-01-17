'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Region.belongsTo(models.Province, { through: models.Province });
        
       
    }

  };
  
  Region.init({
    name: DataTypes.STRING
 
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};
