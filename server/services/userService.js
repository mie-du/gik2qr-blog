const User = require('../models').user;

function getAll() {
  return User.findAll();
}

module.exports = {
  getAll
};
