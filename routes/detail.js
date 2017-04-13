var express = require('express');
var router = express.Router();

/* GET detail page. */
router.get('/', function(req, res, next) {
  res.render('detail', {
      title: 'my first essay',
      content: 'please show me something',
    });
});

module.exports = router;
