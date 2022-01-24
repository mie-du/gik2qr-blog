const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const postService = require('../services/postService');

router.get('/', (req, res) => {
  postService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {
  postService.create(req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  postService.update(req.body, req.body.id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/', (req, res) => {
  postService.destroy(req.body.id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
