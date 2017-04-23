const express = require('express');
const router = express.Router();
const _ = require('underscore');
const mongoose = require('mongoose');
const EssayModel = require('../models/essay');
const UserModel = require('../models/user');
const fs = require('fs');
const multer = require('multer');

// 赋值一个全局Promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/essay');

// pre handle user
router.use(function(req, res, next) {
	let _user = req.session.user;
	if (_user) {
		res.locals.user = _user;
	}
	next();
});


/* GET home page. */
router.get('/', function(req, res) {
	console.log('user in session: ');
	console.log(req.session.user);

	EssayModel.fetch(function (err, essays) {
		if (err) {
			console.log(err);
		}
		// console.log(essays);
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
	});
});


/* signUp */
router.post('/user/signup', function(req, res) {
	let _user = req.body;
	
	UserModel.findOne({name: _user.name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		// 处理用户名重复
		if (user) {
			return res.redirect('/');
		} else {
			user = new UserModel(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/admin/userList');
			});
		}
	});
});


/* userList page */
router.get('/admin/userList', function(req, res) {
	UserModel.fetch(function(err, users) {
		if (err) {
			console.log(err);
		}
		res.render('userList', {
			poster: 'background-image: url(/images/book.jpg)',
			title: '用户列表页',
			users: users,
		});
	});
});


/* Login */
router.post('/user/signin', function(req, res) {
	let _user = req.body;
	let name = _user.name;
	let password = _user.password;

	UserModel.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		// user不存在，返回首页
		if (!user) {
			return res.redirect('/');
		}
		// 密码校对
		user.comparePassword(password, function(err, result) {
			if (err) {
				console.log(err);
			}

			if (result) {
				req.session.user = user;
				console.log('Password is matched');
				return res.redirect('/');
			} else {
				console.log('Password is not matched');
			}
		});
	});
});


/* logout */
router.get('/logout', function(req, res) {
	delete req.session.user;
	res.redirect('/');
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
router.get('/admin/new', function(req, res, next) {
	res.render('admin', {
		poster: 'background-image: url(/images/banner.jpeg)',
		title: '新建文章',
		essay: {
			title: '',
			content: '',
			poster: '',
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


// for parsing multipart/form-data
let upload = multer({dest: 'public/images/'});
/* POST admin essay */
router.post('/admin/new', upload.single('poster'), function(req, res) {
	const essayObj = req.body;
	const id = essayObj._id;
	let _essay;
	
	const poster = req.file;	// 由multer解析过来的poster对象
	console.log(req.file);
	// 获取上传图片信息
	let originalName = poster.originalname;
	let path = `/images/${originalName}`;
	let changePath = `public\\images\\${originalName}`;
	fs.renameSync(poster.path, changePath);
	console.log(path);

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
			poster: `background-image: url(${path})`,
			_id: parseInt(Math.random()*100000000000),
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
			poster: 'background-image: url(/images/banner.jpeg)',
			title: '文章管理列表',
			essays: essays,
		});
	});
});

// list delete essay
router.delete('/admin/list', function(req, res, next) {
	const id = req.query.id;

	if (id) {
		EssayModel.remove({_id: id}, function(err, essay) {
			if (err) {
				console.log(err);
			} else {
				res.json({success: 1});
			}
		});
	}
});



module.exports = router;
