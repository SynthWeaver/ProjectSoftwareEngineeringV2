'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    passwordHash: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};


// async function createUser(name){
//   await sequelize.sync({ force: true });
//   const jane = await User.create({ firstName: name, lastName:"iets", email:"sasd" });
//   // Jane exists in the database now!
//   console.log(jane instanceof User); // true
//   console.log(jane.name); // "Jane"
//   return;
  
//  }

//  createUser("test")

//  User.build({ firstname: 'foo', lastname: 'bar' }).getFullname() // 'foo bar'