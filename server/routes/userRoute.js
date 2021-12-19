const userService = require('../services/userService');
const RouterCreator = require('../helpers/RouterCreator');

const routerCreator = new RouterCreator(userService);

routerCreator.createCrud();
const router = routerCreator.getRouter();

module.exports = router;
