var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({"version":"1.0.","application":"medexbe backend"});
});

//router.get('/v1',fucntion)

module.exports = router;
