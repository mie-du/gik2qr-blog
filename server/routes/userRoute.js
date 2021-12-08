const router = require('express').Router();
router.get('/', (req, res) => {
  res.send('It works!');
});

module.exports = router;
