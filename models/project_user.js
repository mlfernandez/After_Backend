'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project_User.belongsTo(models.User, { foreignKey: "idUser" });
      Project_User.belongsTo(models.Project, { foreignKey: "idProject" });
      Project_User.hasMany(models.Role, { foreignKey: "idRole" });
    }
  };
  Project_User.init({
    idUser: DataTypes.INTEGER,
    idProject: DataTypes.INTEGER,
    idRole: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project_User',
  });
  return Project_User;
};