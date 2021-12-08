const base = require('../helpers/modelBase').columns;

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'post',
    {
      id: base.id,
      title: { ...base.reqString },
      body: DataTypes.TEXT,
      imageUrl: DataTypes.STRING
    },
    base.options
  );
};
