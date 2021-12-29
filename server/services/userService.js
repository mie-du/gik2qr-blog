const User = require('../models').user;
const base = require('../helpers/modelBase').constraints;
const {
  createError,
  createResult,
  createMessage
} = require('../helpers/jsonMessage');
const validate = require('validate.js');
const constraints = {
  email: {
    /* The property is required (existing in json) and it can't be blank */
    ...base.reqString,
    email: true
  },
  username: base.reqString,
  firstName: base.reqString,
  lastName: base.reqString
};

async function getAll() {
  try {
    const result = await User.findAll();
    if (result.length === 0) {
      return Promise.resolve(createError(204));
    }
    return Promise.resolve(createResult(result));
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function getById(id) {
  try {
    const result = await User.findOne({ where: { id } });
    if (!result) {
      return Promise.resolve(createError(204));
    }
    return Promise.resolve(createResult(result));
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function create(data) {
  /* Validating data. Validate function will return object with messages if failing */

  const invalidData = validate(data, constraints);
  if (invalidData) {
    return Promise.resolve(createError(400, invalidData));
  } else {
    try {
      const result = await User.create(data);

      return Promise.resolve(createResult(result));
    } catch (err) {
      return Promise.resolve(
        createError(err.status || 500, err.message || 'Unknown error')
      );
    }
  }
}

async function update(data, id) {
  /* Before anything else, checking id */
  if (!id) {
    return Promise.resolve(createError(400, "Id can't be blank"));
  }

  try {
    /* Checking if user exists */
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      return Promise.resolve(createError(404, 'No user to update'));
    }
    /* Validating data. Validate function will return object with messages if failing */
    const invalidData = validate(data, constraints);
    if (invalidData) {
      return Promise.resolve(createError(400, invalidData));
    }
    /* Finally, trying to update user by given id */
    await User.update(data, { where: { id } });
    /* All ok */
    return Promise.resolve(createMessage(200, 'User updated successfully'));
  } catch (err) {
    /* Any other error */
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}
async function destroy(id) {
  /* Before anything else, checking id */
  if (!id) {
    return Promise.resolve(createError(400, "Id can't be blank"));
  }
  try {
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      return Promise.resolve(createError(404, 'No user to delete'));
    }

    await User.destroy({ where: { id } });
    return Promise.resolve(createMessage(200, 'User deleted successfully'));
  } catch (err) {
    console.log(err);
    /* Any other error */
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};
