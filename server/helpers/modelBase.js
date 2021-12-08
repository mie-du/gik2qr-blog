const { DataTypes } = require('sequelize');
module.exports = {
  columns: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    reqString: {
      type: DataTypes.STRING(50),
      allowNull: false,
      len: [2, 50]
    }
  },
  options: {
    underscored: true
  }
};
