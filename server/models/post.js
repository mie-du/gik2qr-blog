module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validator: {
          len: [2, 100]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING(255)
      }
    },
    { underscored: true }
  );
};
