const router = require('express').Router();
const postService = require('../services/postService');

router.get('/full', (req, res) => {
  postService.getFull().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/author/:id', (req, res) => {
  postService.getByAuthor(req.params.id).then((posts) => res.send(posts));
});

router.post('/addTag', (req, res) => {
  postService.addTag(req.body.name, req.body.postId).then((result) => {
    res.status(result.status).send(result.data);
  });
});

/* Regular crud */
router.get('/', (req, res) => {
  postService.getAll().then((result) => {
    res.status(result.status).send(result.data);
  });
});

router.get('/:id', (req, res) => {
  postService.getById(req.params.id).then((result) => {
    res.status(result.status).send(result.data);
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  postService.create(data).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  const data = req.body;
  const id = req.body.id;

  postService.update(data, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/', (req, res) => {
  const id = req.body.id;

  postService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
