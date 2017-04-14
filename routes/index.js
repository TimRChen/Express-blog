var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'my first essay',
    content: 'this is a test text',
  });
});

module.exports = router;