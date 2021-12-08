const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.json(result);
  });
});

module.exports = router;
