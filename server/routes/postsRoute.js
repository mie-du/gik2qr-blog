const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.post.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  db.post.create(req.body).then((result) => {
    res.send(result);
  });
});
router.put('/', (req, res) => {
  db.post
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then((result) => {
      res.send(result);
    });
});
router.delete('/', (req, res) => {
  db.post
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;
