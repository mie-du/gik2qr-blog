const Tag = require('../models').tag;

const { createError, createResult } = require('../helpers/jsonMessage');

async function getAllTags() {
  try {
    const result = await Tag.findAll();
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
module.exports = {
  getAllTags
};
