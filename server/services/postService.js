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
    const post = await db.post.findOne({
      where: { id },
      include: [db.user, db.tag]
    });

    return createResponseSuccess(_formatPost(post));
    //return createOkObjectReponse(post);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allPosts = await db.post.findAll({
      include: [db.tag, db.user, db.comment]
    });

    return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
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
    await _addTagToPost(newPost, post.tags);

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
    const existingPost = await db.post.findOne({ where: { id } });
    if (!existingPost) {
      return createResponseError(404, 'Hittade inget inlägg att uppdatera.');
    }

    if (post.tags) {
      post.tags.forEach(async (tag) => {
        const foundOrCreatedTag = await _findOrCreateTagId(tag);
        await existingPost.addTag(foundOrCreatedTag);
      });
    }

    await db.post.update(post, {
      where: { id }
    });

    return createResponseMessage(200, `Inlägget med id ${id} uppdaterades.`);
  } catch (error) {
    return createResponseError(error.status, {
      message: error.message,
      stack: error.stack
    });
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

async function destroyAll() {
  try {
    await db.post.destroy({
      where: {},
      force: true
    });
    return createResponseMessage(200, 'Samtliga inlägg raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function _findOrCreateTagId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

  return foundOrCreatedTag[0].id;
}

async function _addTagToPost(post, tags) {
  if (tags) {
    tags.forEach(async (tag) => {
      const tagId = await _findOrCreateTagId(tag);
      await post.addTag(tagId);
    });
  }
}

function _formatPost(post) {
  const cleanPost = {
    id: post.id,
    title: post.title,
    body: post.body,
    imageUrl: post.body.imageUrl,
    author: {
      id: post.user.id,
      username: post.user.username,
      email: post.user.email,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      imageUrl: post.user.imageUrl,
      description: post.user.description
    },
    tags: []
  };
  post.tags.map((tag) => (cleanPost.tags = [tag.name, ...cleanPost.tags]));
  return cleanPost;
}

module.exports = {
  getConstraints,
  getById,
  getAll,
  getById,
  create,
  update,
  destroy,
  destroyAll
};
