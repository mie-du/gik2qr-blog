const { columns, options } = require('../helpers/modelBase');

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'tag',
    {
      id: columns.id,
      name: { ...columns.reqString }
    },
    options
  );
};
