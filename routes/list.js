var express = require('express');
var router = express.Router();

let item = {
    titleImg: 'background-image: url(../../images/banner.jpeg)',
    _id: 10086,
};

/* GET list page. */
router.get('/', function(req, res, next) {
  res.render('list', item);
});

module.exports = router;
