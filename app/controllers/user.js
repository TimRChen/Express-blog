const UserModel = require('../models/user');

// showSignup
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面',
		poster: 'background-image: url(/images/book.jpg)',
	});
};

// showSignin
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登陆页面',
		poster: 'background-image: url(/images/book.jpg)',
	});
};

/* signUp */
exports.signup = function(req, res) {
	let _user = req.body;

	UserModel.findOne({name: _user.name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		// 处理用户名重复
		if (user) {
			return res.redirect('/signin');
		} else {
			user = new UserModel(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/');
			});
		}
	});
};


/* Login */
exports.signin = function(req, res) {
	let _user = req.body;
	let name = _user.name;
	let password = _user.password;

	UserModel.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		// user不存在，返回注册页
		if (!user) {
			// return res.redirect('/signup');
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
				return res.redirect('/signin');	// 密码不正确，则重定向至登录页
			}
		});
	});
};


/* logout */
exports.logout = function(req, res) {
	delete req.session.user;
	res.redirect('/');
};


/* userList page */
exports.list = function(req, res) {
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
};

// list delete user
exports.delete = function(req, res, next) {
	const id = req.query.id;
	if (id) {
		UserModel.findById({_id: id}, function(err, user) {
			if (err) {
				console.log(err);
			}
			// 删除文章内容
			user.remove(function(err) {
				if (err) {
					console.log(err);
					res.json({success: 0});
				} else {
					res.json({success: 1});
				}
			});
		});
	}
};


/* middleware for user */
exports.signinRequired = function(req, res, next) {
	let user = req.session.user;
	console.log(user);

	if (!user) {
		return res.redirect('/signin');
	}

	next();
};

/* middleware for admin */
exports.adminRequired = function(req, res, next) {
	let user = req.session.user;
	if (user.role <= 10) {
		return res.redirect('/');
	}

	next();
};