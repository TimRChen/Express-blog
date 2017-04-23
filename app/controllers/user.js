const UserModel = require('../models/user');

/* signUp */
exports.signup = function(req, res) {
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