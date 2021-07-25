'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Project_User, { foreignKey:'idProject' });
      this.belongsTo(models.Category, { foreignKey: "idCategory" });


    }
  };
  Project.init({
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    endDate: DataTypes.DATEONLY,
    idCategory: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};