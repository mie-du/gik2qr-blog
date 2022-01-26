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

async function getById(id) {
  try {
    const post = await db.post.findOne({
      where: { id },
      include: [db.user, db.tag]
    });

    return createOkObjectReponse(_formatPost(post));
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
    return createOkObjectReponse(allPosts.map((post) => _formatPost(post)));
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
    post.tags.forEach(async (tag) => {
      const tagId = await _findOrCreateTagId(tag);
      await newPost.addTag(tagId);
    });

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
    /* await db.post.update(post, { where: { id } }); */

    post.tags.forEach(async (tag) => {
      const foundOrCreatedTag = await _findOrCreateTag(tag);
      await existingPost.addTag(foundOrCreatedTag.id);
    });

    await db.post.update(post, {
      where: { id }
    });

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

async function _findOrCreateTagId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

  return foundOrCreatedTag[0].id;
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
  getAll,
  getById,
  create,
  update,
  destroy
};
