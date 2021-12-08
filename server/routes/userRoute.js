const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {
  userService
    .getAll()
    .then((result) => {
      if (result.length != 0) res.status(200).json(result);
      else res.status(204).send();
    })
    .catch((e) => {
      res.json({ error: e.message, stack: e.stack });
    });
});

module.exports = router;
