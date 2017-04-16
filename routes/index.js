const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('underscore');
// const mongoose = require('mongoose');
// const Essay = require('../models/essay');

// mongoose.connect('mongodb://localhost/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	// Essay.fetch(function (err, essays) {
	// 	if (err) {
	// 		console.log(err);
	// 	}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(../../images/banner.jpeg)',
			essays: [{
				poster: 'background-image: url(../../images/space.jpeg)',
				title: 'Hello World!',
				id: 1,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/banner.jpeg)',
				title: 'it`s ok!',
				id: 2,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/book.jpg)',
				title: 'this is a test',
				id: 3,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/default.jpg)',
				title: 'hang it on!',
				id: 4,
				date: moment().format("MMM Do YYYY"),
			}],
		});
	// });
});

/* GET detail page. */
router.get('/detail/:id', function(req, res, next) {
	const id = req.params.id;

	// Essay.findById(id, function (err, essay) {
		res.render('detail', {
			title: 'Hello World!',
			small: moment().format("MMM Do YYYY"),
			poster: 'background-image: url(../../images/space.jpeg)',
			nextImg: 'background-image: url(../../images/book.jpg)',
			content: 'please show me something',
		});
	// });
});

/* GET admin page. */
router.get('/admin/essay', function(req, res, next) {
	res.render('admin', {
		poster: 'background-image: url(../../images/banner.jpeg)',
		title: '后台录入页面',
		essays: {
			title: '',
			content: '',
		}
	});
});

/* Update admin essay */
router.get('/admin/update/:id', function(req, res) {
	const id = req.params.id;

	if (id) {
		// Essay.findById(id, function(err, essay) {
			res.render('admin', {
				title: 'blog 后台更新页',
				essay: essay,
			});
		// });
	}
})



/* POST admin essay */
router.post('/admin/essay/new', function(res, req) {
	// const id = res.body.essay._id;
	// const essayObj = req.body.essay;
	// const _essay;

	// if (id !== 'undefined') {
		// Essay.findById(id, function(err, essay) {
			// if (err) {
			// 	console.log(err);
			// }

			// _essay = _.extend(essay, essayObj);
			// _essay.save(function(err, essay) {
			// 	if (err) {
			// 		console.log(err);
			// 	}

			// 	res.redirect('/essay/' + essay._id);
			// });
		// });
	// } else {
		// _essay = new Essay({
		// 	title: essayObj.title,
		// 	headerTitle: essayObj.headerTitle,
		// 	content: essayObj.content,
		// 	small: essayObj.small,
		// 	poster: essayObj.poster,
		// 	imgUrl: essayObj.imgUrl,
		// 	nextImg: essayObj.nextImg,
		// });

		// _essay.save(function(err, essay) {
		// 	if (err) {
		// 		console.log(err);
		// 	}

		// 	res.redirect('/essay/' + essay._id);
		// });
	// }
});

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
	// Essay.fetch(function(err, essay) {
		// if (err) {
		// 	console.log(err);
		// }
		res.render('list', {
			poster: 'background-image: url(../../images/banner.jpeg)',
			_id: 10086,
		});
	// });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
