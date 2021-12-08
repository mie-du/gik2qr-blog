const { DataTypes } = require('sequelize');
module.exports = {
  columns: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  options: {
    underscored: true
  }
};
