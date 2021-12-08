const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {
  userService
    .getAll()
    /* always returns array, even if empty/one */
    .then((result) => {
      if (result.length != 0) res.status(200).json(result);
      else res.status(204).send();
    })
    .catch((e) => {
      res.json({ error: e.message, stack: e.stack });
    });
});

router.get('/:id', (req, res) => {
  userService
    .getById(req.params.id)
    /* Returns one object */
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(204).send();
    })
    .catch((e) => {
      res.json({ error: e.message, stack: e.stack });
    });
});

router.post('/', (req, res) => {
  const data = req.body;
  userService.create(data).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  const data = req.body;
  const id = req.body.id;

  userService.update(data, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/', (req, res) => {
  const id = req.body.id;

  userService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
