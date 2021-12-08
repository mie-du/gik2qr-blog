const User = require('../models').user;

function getAll() {
  return User.findAll();
}
function getById(id) {
  return User.findOne({ where: { id } });
}
function create(data) {
  return User.create(data);
}

function update(data, id) {
  //implicit id: id, shortened through es6-function.
  return User.update(data, { where: { id } });
}
function destroy(id) {
  return User.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};
