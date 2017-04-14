var express = require('express');
var router = express.Router();

/* GET detail page. */
router.get('/', function(req, res, next) {
  res.render('detail', {
      titleImg: 'background-image: url(../../images/space.jpeg)',
      nextImg: 'background-image: url(../../images/book.jpg)',
      name: 'Hello World!',
      small: new Date,
      content: 'please show me something',
    });
});

module.exports = router;
