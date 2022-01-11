const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.post.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  db.post.create(req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  db.post
    .update(req.body, {
      where: { id: req.body.id }
    })
    .then((result) => {
      res.json({ message: 'Inlägget uppdaterades' });
    });
});

router.delete('/', (req, res) => {
  db.post
    .destroy({
      where: { id: req.body.id }
    })
    .then((result) => {
      console.log(result);
      res.json({ message: 'Inlägget togs bort' });
    });
});

module.exports = router;
