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
    Password: DataTypes.STRING,
    Password2: DataTypes.STRING,
    Photo: DataTypes.BLOB,
    profile: DataTypes.STRING,
    specialization: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};