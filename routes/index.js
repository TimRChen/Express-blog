const express = require('express');
const router = express.Router();
const _ = require('underscore');
const mongoose = require('mongoose');
const EssayModel = require('../models/essay');

mongoose.connect('mongodb://localhost/essay');


/* GET home page. */
router.get('/', function(req, res, next) {
	EssayModel.fetch(function (err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(../../images/banner.jpeg)',
			essays: essays,
		});
	});
});

/* GET detail page. */
router.get('/essay/:id', function(req, res, next) {
	const id = req.params.id;

	EssayModel.findById(id, function (err, essay) {
		res.render('detail', {
			essay: essay,
		});
	});
});

/* GET admin page. */
router.get('/admin/essay', function(req, res, next) {
	res.render('admin', {
		poster: 'background-image: url(../../images/banner.jpeg)',
		title: '新建文章',
		essay: {
			title: '',
			content: '',
		}
	});
});

/* Edit/Update admin essay */
router.get('/admin/update/:id', function(req, res) {
	const id = req.params.id;

	if (id) {
		EssayModel.findById(id, function(err, essay) {
			res.render('admin', {
				title: 'blog 后台更新页',
				essay: essay,
			});
		});
	}
});


// 伪造id数据，后期需要实现动态加id
let count = 0;
/* POST admin essay */
router.post('/admin/essay/new', function(req, res) {
	const essayObj = req.body;
	const id = essayObj._id;
	let _essay;
	console.log(essayObj);

	if (id !== 'undefined') {
		EssayModel.findById(id, function(err, essay) {
			if (err) {
				console.log(err);
			}

			// 用更新的字段替换老字段
			_essay = _.extend(essay, essayObj);
			_essay.save(function(err, essay) {
				if (err) {
					console.log(err);
				}

				// 更新后进行重定向，返回到文章详情页
				res.redirect(`/essay/${essay._id}`);
			});
		});
	} else {
		// 构建新模型
		_essay = new EssayModel({
			title: essayObj.title,
			content: essayObj.content,
			small: essayObj.small,
			poster: essayObj.poster,
			_id: Math.random(),
		});

		_essay.save(function(err, essay) {
			if (err) {
				console.log(err);
			}
			res.redirect(`/essay/${essay._id}`);
		});
	}
});

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
	EssayModel.fetch(function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			poster: 'background-image: url(../../images/banner.jpeg)',
			title: '文章管理列表',
			essays: essays,
		});
	});
});


module.exports = router;
