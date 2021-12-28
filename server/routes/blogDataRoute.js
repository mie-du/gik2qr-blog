let router = require('express').Router();
const blogDataService = require('../services/blogDataService');

router.get('/getTags', (req, res) => {
  console.log('getTags');
  blogDataService
    .getAllTags()
    /* always returns array, even if empty/one */
    .then((result) => {
      if (result.length != 0) res.status(200).json(result);
      else res.status(204).send();
    })
    .catch((e) => {
      console.log(e.message);
      res.json({ error: e.message, stack: e.stack });
    });
});

module.exports = router;
