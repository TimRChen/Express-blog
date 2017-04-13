var express = require('express');
var router = express.Router();

let item = {
	_id: 10086,
};

/* GET list page. */
router.get('/', function(req, res, next) {
  res.render('list', {item});
});

module.exports = router;
