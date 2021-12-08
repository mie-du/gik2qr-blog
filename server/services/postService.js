const Post = require('../models').post;
const User = require('../models').user;
const base = require('../helpers/modelBase').constraints;
const { createError, createResult, createMessage } = require('../helpers/jsonMessage');
const validate = require('validate.js');
const constraints = {
  title: base.reqString,
  userId: { presence: { allowEmpty: false } }
};

function getAll() {
  return Post.findAll();
}

function getById(id) {
  return Post.findOne({ where: { id } });
}

function getByAuthor(id) {
  return Post.findAll({ where: { authorId: id } });
}

function getFull() {
  return Post.findAll({ include: { model: User } });
}

async function create(data) {
  /* Validating data. Validate function will return object with messages if failing */
  const invalidData = validate(data, constraints);
  if (invalidData) {
    return Promise.resolve(createError(400, invalidData));
  } else {
    try {
      const result = await Post.create(data);
      return Promise.resolve(createResult(result));
    } catch (err) {
      return Promise.resolve(createError(err.status || 500, err.message || 'Unknown error'));
    }
  }
}

async function update(data, id) {
  /* Before anything else, checking id */
  if (!id) {
    return Promise.resolve(createError(400, "Id can't be blank"));
  }

  try {
    /* Checking if post exists */
    const existingPost = await Post.findOne({ where: { id } });
    if (!existingPost) {
      return Promise.resolve(createError(404, 'No post to update'));
    }
    /* Validating data. Validate function will return object with messages if failing */
    const invalidData = validate(data, constraints);
    if (invalidData) {
      return Promise.resolve(createError(400, invalidData));
    }
    /* Finally, trying to update post by given id */
    await Post.update(data, { where: { id } });
    /* All ok */
    return Promise.resolve(createMessage(200, 'Post updated successfully'));
  } catch (err) {
    /* Any other error */
    return Promise.resolve(createError(err.status || 500, err.message || 'Unknown error'));
  }
}
async function destroy(id) {
  /* Before anything else, checking id */
  if (!id) {
    return Promise.resolve(createError(400, "Id can't be blank"));
  }
  try {
    const existingPost = await Post.findOne({ where: { id } });
    if (!existingPost) {
      return Promise.resolve(createError(404, 'No post to delete'));
    }
    await Post.destroy({ where: { id } });
    return Promise.resolve(createMessage(200, 'Post deleted successfully'));
  } catch (err) {
    /* Any other error */
    return Promise.resolve(createError(err.status || 500, err.message || 'Unknown error'));
  }
}

module.exports = {
  getAll,
  getById,
  getByAuthor,
  getFull,
  create,
  update,
  destroy
};
