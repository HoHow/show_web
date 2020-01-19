var express = require('express');
var router = express.Router();
var Users = require('../controllers/users.js')
var user = new Users()
/* GET users listing. */
router.post('/register',user.register);

module.exports = router;
