const { columns, options } = require('../helpers/modelBase');

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      id: columns.id,
      email: {
        type: DataTypes.STRING(100),
        len: [4, 100],
        validate: {
          isEmail: true
        }
      },
      firstName: { ...columns.reqString },
      lastName: { ...columns.reqString },
      username: { ...columns.reqString }
    },
    options
  );
};
