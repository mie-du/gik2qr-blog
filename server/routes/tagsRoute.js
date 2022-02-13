const router = require('express').Router();
const db = require('../models');
const postService = require('../services/postService');

router.get('/:name/posts', (req, res) => {
  const name = req.params.name;

  postService.getByTagName(name).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  db.tag.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const tag = req.body;
  db.tag.create(tag).then((result) => {
    res.send(result);
  });
});

router.delete('/', (req, res) => {
  db.tag
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;
