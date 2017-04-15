const express = require('express');
const router = express.Router();
const moment = require('moment');


/* GET home page. */
router.get('/', function(req, res, next) {
//   Essay.fetch(function (err, essays) {
// 	if (err) {
// 		console.log(err);
// 	}
	res.render('index', {
		date: moment().format("MMM Do YYYY"),
		headerTitle: 'timrchen',
		small: 'Just a start.',
		poster: 'background-image: url(../../images/banner.jpeg)',
		imgUrl: 'background-image: url(../../images/space.jpeg)',
		title: 'Hello World!',
	});
//   });
});

/* GET detail page. */
router.get('/detail', function(req, res, next) {
  res.render('detail', {
      headerTitle: 'Hello World!',
      small: moment().format("MMM Do YYYY"),
      poster: 'background-image: url(../../images/space.jpeg)',
      nextImg: 'background-image: url(../../images/book.jpg)',
      content: 'please show me something',
    });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', {
    poster: 'background-image: url(../../images/banner.jpeg)',
    title: '后台管理界面',
  });
});

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
  res.render('list', {
    poster: 'background-image: url(../../images/banner.jpeg)',
    _id: 10086,
  });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
