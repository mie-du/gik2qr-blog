const db = require('../models');
const {
  createOkObjectReponse,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');
const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

async function getAll() {
  try {
    const allPosts = await db.post.findAll();
    /* Om allt blev bra, returnera allPosts */
    return createOkObjectReponse(allPosts);
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
    return createOkObjectReponse(newPost);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(post, id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt.');
  }
  const invalidData = validate(post, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const existingPost = await db.post.findOne({ where: { id } });
    if (!existingPost) {
      return createResponseError(404, 'Hittade inget inlägg att uppdatera.');
    }
    await db.post.update(post, { where: { id } });
    return createResponseMessage(200, `Inlägget med id ${id} uppdaterades.`);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    const existingPost = await db.post.findOne({ where: { id } });
    if (!existingPost) {
      return createResponseError(404, 'Hittade inget inlägg att uppdatera.');
    }
    await db.post.destroy({ where: { id } });
    return createResponseMessage(200, `Inlägget med id ${id} raderades.`);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  getAll,
  create,
  update,
  destroy
};
