var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',UserController.register);
router.get('/allUsers',UserController.getAllUser);
router.post('/login',UserController.login);

module.exports = router;
