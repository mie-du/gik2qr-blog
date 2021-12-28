const { columns, options } = require('../helpers/modelBase');

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      id: columns.id,
      email: {
        ...columns.reqString,
        validate: {
          isEmail: true
        }
      },
      description: {
        type: DataTypes.STRING(500)
      },
      firstName: { ...columns.reqString },
      lastName: { ...columns.reqString },
      username: { ...columns.reqString },
      imageUrl: { ...columns.unreqStringLong }
    },
    options
  );
};
