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
      User.hasOne(models.Project_User,{foreignKey:'idUser'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lastName2: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password2: DataTypes.STRING,
    photo: DataTypes.BLOB,
    profile: DataTypes.STRING,
    specialization: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};