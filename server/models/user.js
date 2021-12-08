const base = require('../helpers/modelBase');

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      id: base.columns.id,
      email: {
        type: DataTypes.STRING(100),
        len: [4, 100],
        validate: {
          isEmail: true
        }
      },
      firstName: { ...base.columns.reqString },
      lastName: { ...base.columns.reqString },
      userName: { ...base.columns.reqString }
    },
    base.options
  );
};
