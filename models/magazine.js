'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Magazine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Magazine.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    issue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Magazine',
  });
  return Magazine;
};