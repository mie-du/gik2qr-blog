const userService = require('../services/userService');
const RouterCreator = require('../helpers/RouterCreator');
let router = require('express').Router();

const routerCreator = new RouterCreator(userService, router);

routerCreator.createCrud();
router = routerCreator.getRouter();

module.exports = router;
