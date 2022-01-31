const router = require('express').Router();
const postService = require('../services/postService');

router.post('/:id/addComment', (req, res) => {
  const comment = req.body;
  const id = req.params.id;

  postService.addComment(id, comment).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  postService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  postService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {
  const post = req.body;
  postService.create(post).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  const post = req.body;
  const id = post.id;

  postService.update(post, id).then((result) => {
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
