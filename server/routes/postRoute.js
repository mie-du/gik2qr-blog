const router = require('express').Router();
const postService = require('../services/postService');
const RouterCreator = require('../helpers/RouterCreator');

router.get('/full', (req, res) => {
  postService.getFull().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/summary', (req, res) => {
  postService.getSummary().then((result) => {
    res.status(result.status).json(result.data);
  });
});

/* Author */
router.get('/author/:id', (req, res) => {
  postService.getByAuthor(req.params.id).then((posts) => res.send(posts));
});

router.get('/:id/getAuthor', (req, res) => {
  postService.getAuthor(req.params.id).then((comments) => res.send(comments));
});

/* Tags */
router.post('/addTag', (req, res) => {
  postService.addTag(req.body.name, req.body.postId).then((result) => {
    res.status(result.status).send(result.data);
  });
});

router.post('/removeTag', (req, res) => {
  postService.removeTag(req.body.postId, req.body.tagId).then((result) => {
    res.status(result.status).send(result.data);
  });
});

/* Comments */
router.post('/addComment', (req, res) => {
  postService.addComment(req.body).then((result) => {
    res.status(result.status).send(result.data);
  });
});

router.get('/:id/getComments', (req, res) => {
  postService.getComments(req.params.id).then((comments) => res.send(comments));
});

/* regular crud */
const routerCreator = new RouterCreator(postService);
routerCreator.createCrud();
router = routerCreator.getRouter();

module.exports = router;
