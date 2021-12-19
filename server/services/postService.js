const Post = require('../models').post;
const User = require('../models').user;
const Tag = require('../models').tag;
const Comment = require('../models').comment;
const PostTag = require('../models').postTag;
const constraints = require('../helpers/modelBase').constraints;
const {
  createError,
  createResult,
  createMessage
} = require('../helpers/jsonMessage');
const validate = require('validate.js');
const postConstraints = {
  title: constraints.reqString,
  userId: { presence: { allowEmpty: false } }
};

const commentConstraints = {
  title: constraints.reqString,
  userId: { presence: { allowEmpty: false } },
  postId: { presence: { allowEmpty: false } }
};

/* refactor to blog? */

async function addComment(data) {
  try {
    const invalidData = validate(data, commentConstraints);

    if (invalidData) {
      return Promise.resolve(createError(400, invalidData));
    }

    const existingPost = await Post.findOne({ where: { id: data.postId } });
    const existingUser = await User.findOne({ wher: { id: data.userId } });

    if (!existingPost || !existingUser) {
      return Promise.resolve(createError(400, 'Invalid post or author'));
    }
    const result = await Comment.create(data);
    return Promise.resolve(createResult(result));
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function getComments(postId) {
  return Comment.findAll({ where: { postId } });
}

async function addTag(name, postId) {
  try {
    const existingPost = await Post.findOne({ where: { id: postId } });
    if (!existingPost) {
      return Promise.resolve(createError(400, 'Invalid post'));
    }

    const existingTag = await _postTagExists(name);
    let tagId;
    if (existingTag) {
      tagId = existingTag.id;
      const tagOnPost = await PostTag.findOne({ where: { postId, tagId } });
      if (tagOnPost) {
        return Promise.resolve(
          createError(400, `Tag '${name}' already exist on post`)
        );
      }
    } else {
      const newTag = await Tag.create({ name });
      tagId = newTag.id;
    }
    await PostTag.create({ postId, tagId });
    return Promise.resolve(
      createMessage(200, `Tag '${name}' added to post with id ${postId}`)
    );
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function removeTag(postId, tagId) {
  try {
    const removedTag = await PostTag.destroy({ where: { postId, tagId } });
    if (!removedTag) {
      return Promise.resolve(createError(400, 'Could not remove tag'));
    }
    const tagsLeft = await PostTag.findAll({ where: { tagId } });
    console.log(tagsLeft);
    if (tagsLeft.length === 0) {
      Tag.destroy({ where: { id: tagId } });
    }
    return Promise.resolve(createMessage(200, 'Tag removed successfully'));
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function getByAuthor(userId) {
  return Post.findAll({ where: { userId } });
}

async function getAuthor(postId) {
  const post = await Post.findOne({ where: { id: postId } });
  return await post.getUser();
}
/* Clean getFull with slim result */
async function getSummary() {
  try {
    const allPosts = await Post.findAll({ include: [User, Tag] });
    let cleanResult = [];
    let cleanPost = {
      content: {},
      author: {},
      tags: []
    };

    allPosts.forEach((post) => {
      const { title, body, imageUrl, createdAt, updatedAt } = post;
      const { firstName, lastName, username, email } = post.user;

      cleanPost.content = { title, body, imageUrl, createdAt, updatedAt };
      cleanPost.author = { firstName, lastName, username, email };
      post.tags.forEach((tag) => {
        cleanPost.tags.push(tag.name);
      });
      cleanResult.push(cleanPost);
    });

    return Promise.resolve(createResult(cleanResult));
  } catch (err) {
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

async function getFull() {
  try {
    const result = await Post.findAll({ include: [User, Comment, Tag] });
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
/* Basic crud */
async function getAll() {
  try {
    const result = await Post.findAll();
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
    const result = await Post.findOne({ where: { id } });
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

  const invalidData = validate(data, postConstraints);
  if (invalidData) {
    return Promise.resolve(createError(400, invalidData));
  } else {
    try {
      const existingUser = await User.findOne({ where: { id: data.userId } });

      if (!existingUser) {
        return Promise.resolve(createError(400, 'Invalid userId'));
      }
      const result = await Post.create(data);
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
    /* Checking if post exists */
    const existingPost = await Post.findOne({ where: { id } });
    if (!existingPost) {
      return Promise.resolve(createError(404, 'No post to update'));
    }
    /* Validating data. Validate function will return object with messages if failing */
    const invalidData = validate(data, postConstraints);
    if (invalidData) {
      return Promise.resolve(createError(400, invalidData));
    }
    /* Finally, trying to update post by given id */
    await Post.update(data, { where: { id } });
    /* All ok */
    return Promise.resolve(createMessage(200, 'Post updated successfully'));
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
    const existingPost = await Post.findOne({ where: { id } });
    if (!existingPost) {
      return Promise.resolve(createError(404, 'No post to delete'));
    }
    await Post.destroy({ where: { id } });
    return Promise.resolve(createMessage(200, 'Post deleted successfully'));
  } catch (err) {
    /* Any other error */
    return Promise.resolve(
      createError(err.status || 500, err.message || 'Unknown error')
    );
  }
}

/* "Fake-private" function to check for existing tag when creating new post */
async function _postTagExists(name) {
  name = name.toLowerCase().trim();
  return await Tag.findOne({ where: { name } });
}

module.exports = {
  getByAuthor,
  getAuthor,
  addComment,
  getComments,
  addTag,
  removeTag,
  getFull,
  getSummary,
  getAll,
  getById,
  create,
  update,
  destroy
};
