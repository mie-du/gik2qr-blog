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

  userService.create(data).then((data) => {
    res.json(data);
  });
});

router.put('/', (req, res) => {
  const data = req.body;
  const id = req.body.id;

  userService.update(data, id).then(() => {
    //only returns number of updated rows, not interesting, sending more useful response than data.
    res.status(200).json({ message: 'User updated successfully' });
  });
});
router.delete('/', (req, res) => {
  const id = req.body.id;

  userService.destroy(id).then(() => {
    //only returns number of updated rows, not interesting, sending more useful response than data.
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
