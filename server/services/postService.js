const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara  %{count} tecken eller längre.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

function getConstraints() {
  return createResponseSuccess(constraints);
}
async function getById(id) {
  try {
    const allPosts = await db.post.findOne({ where: { id } });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allPosts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allPosts = await db.post.findAll();
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allPosts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(post) {
  const invalidData = validate(post, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newPost = await db.post.create(post);
    return createResponseSuccess(newPost);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(post, id) {
  const invalidData = validate(post, constraints);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.post.update(post, {
      where: { id }
    });
    return createResponseMessage(200, 'Inlägget uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.post.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Inlägget raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  getConstraints,
  getById,
  getAll,
  create,
  update,
  destroy
};
