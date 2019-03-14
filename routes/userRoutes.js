var express  = require("express");

var userCtrl = require('../controllers/userController');
var routerUser = express.Router();

routerUser.route('/user')
    .get(userCtrl.getAll)
    .post(userCtrl.create);

routerUser.route('/user/:id')
    .get(userCtrl.getById)
    .patch(userCtrl.update)
    .delete(userCtrl.delete);

routerUser.route('/userByEmail/:email')
    .get(userCtrl.getByEmail)

module.exports = routerUser;