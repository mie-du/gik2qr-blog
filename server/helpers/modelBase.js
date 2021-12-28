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
    },
    unreqStringShort: {
      type: DataTypes.STRING(100),
      len: [2, 50]
    },
    unreqStringLong: {
      type: DataTypes.STRING(100),
      len: [4, 100]
    }
  },
  constraints: {
    reqString: {
      presence: { allowEmpty: false, length: { minimum: 2, maximum: 100 } }
    }
  },

  options: {
    underscored: true
  }
};
