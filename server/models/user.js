const base = require('../helpers/modelBase').columns;

/* Defines a model with dependency injection which is called when index.js assembles the complete db-object.  */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      id: base.id,
      email: {
        type: DataTypes.STRING(100),
        len: [4, 100],
        validate: {
          isEmail: true
        }
      },
      firstName: { ...base.reqString },
      lastName: { ...base.reqString },
      username: { ...base.reqString }
    },
    base.options
  );
};
