const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('underscore');
const mongoose = require('mongoose');
const EssayModel = require('../models/essay');

mongoose.connect('mongodb://localhost:27017/essay');

/* GET home page. */
router.get('/', function(req, res, next) {
	// EssayModel.fetch(function (err, essays) {
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
				_id: 1,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/banner.jpeg)',
				title: 'it`s ok!',
				_id: 2,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/book.jpg)',
				title: 'this is a test',
				_id: 3,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/default.jpg)',
				title: 'hang it on!',
				_id: 4,
				date: moment().format("MMM Do YYYY"),
			}],
		});
	// });
});

/* GET detail page. */
router.get('/essay/:id', function(req, res, next) {
	const id = req.params.id;

	// EssayModel.findById(id, function (err, essay) {
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
		small: '',
		essay: {
			title: '',
			content: '',
			_id: 110,
		}
	});
});

/* Update admin essay */
router.get('/admin/update/:id', function(req, res) {
	const id = req.params.id;

	if (id) {
		// EssayModel.findById(id, function(err, essay) {
			res.render('admin', {
				title: 'blog 后台更新页',
				essay: essay,
			});
		// });
	}
})



/* POST admin essay */
router.post('/admin/essay/new', function(req, res) {
	const id = res.body.essay._id;
	const essayObj = req.body.essay;
	// const _essay;

	// if (id !== 'undefined') {
		// EssayModel.findById(id, function(err, essay) {
			// if (err) {
			// 	console.log(err);
			// }

			// _essay = _.extend(essay, essayObj);
			// _essay.save(function(err, essay) {
			// 	if (err) {
			// 		console.log(err);
			// 	}

			// 	res.redirect('/admin/essay/' + essay._id);
			// });
		// });
	// } else {
		// _essay = new EssayModel({
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

		// 	res.redirect('/admin/essay/' + essay._id);
		// });
	// }
});

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
	// EssayModel.fetch(function(err, essay) {
		// if (err) {
		// 	console.log(err);
		// }
		res.render('list', {
			poster: 'background-image: url(../../images/banner.jpeg)',
			title: '文章管理列表',
			essays: [{
				poster: 'background-image: url(../../images/space.jpeg)',
				title: 'Hello World!',
				content: 'this is a test',
				_id: 1,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/banner.jpeg)',
				title: 'it`s ok!',
				content: 'this is a test',
				_id: 2,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/book.jpg)',
				title: 'this is a test',
				content: 'this is a test',
				_id: 3,
				date: moment().format("MMM Do YYYY"),
			}, {
				poster: 'background-image: url(../../images/default.jpg)',
				title: 'hang it on!',
				content: 'this is a test',
				_id: 4,
				date: moment().format("MMM Do YYYY"),
			}],
		});
	// });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
