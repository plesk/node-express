var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
app.post('/register',UserController.register);
app.get('/allUsers',UserController.getAllUser);
app.post('/login',UserController.login);

module.exports = router;
