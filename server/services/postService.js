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
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

async function getByTag(tagId) {
  try {
    const tag = await db.tag.findOne({ where: { id: tagId } });
    const allPosts = await tag.getPosts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getByAuthor(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allPosts = await user.getPosts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const post = await db.post.findOne({
      where: { id },
      include: [
        db.user,
        db.tag,
        {
          model: db.comment,
          include: [db.user]
        }
      ]
    });
    /* Om allt blev bra, returnera post */
    return createResponseSuccess(_formatPost(post));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allPosts = await db.post.findAll({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addComment(id, comment) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    comment.postId = id;
    const newComment = await db.comment.create(comment);
    return createResponseSuccess(newComment);
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
    //post tags är en array av namn
    //lägg till eventuella taggar
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
    await _addTagToPost(existingPost, post.tags);
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

function _formatPost(post) {
  const cleanPost = {
    id: post.id,
    title: post.title,
    body: post.body,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: {
      id: post.user.id,
      username: post.user.username,
      email: post.user.email,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      imageUrl: post.user.imageUrl
    },
    tags: []
  };

  if (post.comments) {
    cleanPost.comments = [];

    post.comments.map((comment) => {
      return (cleanPost.comments = [
        {
          title: comment.title,
          body: comment.body,
          author: comment.user.username,
          createdAt: comment.createdAt
        },
        ...cleanPost.comments
      ]);
    });
  }

  if (post.tags) {
    post.tags.map((tag) => {
      return (cleanPost.tags = [tag.name, ...cleanPost.tags]);
    });
    return cleanPost;
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

module.exports = {
  getByTag,
  getByAuthor,
  getById,
  getAll,
  addComment,
  create,
  update,
  destroy
};
