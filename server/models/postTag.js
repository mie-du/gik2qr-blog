module.exports = (sequelize, DataTypes) => {
  return sequelize.define('postTag', {}, { underscored: true });
};
