var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    titleImg: 'background-image: url(../../images/banner.jpeg)',
    imgUrl: 'background-image: url(../../images/space.jpeg)',
    title: 'Hello World!',
    date: new Date,
    name: 'timrchen',
    small: 'Just a start.',
  });
});

module.exports = router;
