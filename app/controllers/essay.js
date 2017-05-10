const EssayModel = require('../models/essay');
const multer = require('multer');
const _ = require('underscore');
const fs = require('fs');


/* GET detail page. */
exports.detail = function(req, res, next) {
	const id = req.params.id;

	EssayModel.update({_id: id}, {$inc: {pv: 1}}, function(err) {
		if (err) {
			console.log(err);
		}
	});
	EssayModel.findById(id, function (err, essay) {
		res.render('detail', {
			essay: essay,
		});
	});
};


/* GET admin page. */
exports.new = function(req, res) {
	res.render('admin', {
		poster: 'background-image: url(/images/banner.jpeg)',
		title: '新建文章',
		essay: {
			title: '',
			content: '',
			poster: '',
		}
	});
};


/* Edit/Update admin essay */
exports.update = function(req, res) {
	const id = req.params.id;

	if (id) {
		EssayModel.findById(id, function(err, essay) {
			res.render('admin', {
				title: '文章编辑',
				essay: essay,
			});
		});
	}
};


// for parsing multipart/form-data
let upload = multer({dest: 'public/images/'}).single('poster');

/* POST admin essay */
exports.save = function(req, res) {
    upload(req, res, function(err) {
		const essayObj = req.body;
		const id = essayObj._id;
		let _essay;

        if (err) {
            console.log(err);
        }
        const poster = req.file; // 由multer解析过来的poster对象
        console.log(req.file);
        // 获取上传图片信息
        let originalName = poster.originalname;
        let changePath = `public/images/${originalName}`;
        let path = `/images/${originalName}`;
		// 更改上传文件路径
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
				poster: `background-image: url(${path})`
			});

			_essay.save(function(err, essay) {
				if (err) {
					console.log(err);
				}
				res.redirect(`/essay/${essay._id}`);
			});
		}
    });

};


/* GET list page. */
exports.list = function(req, res, next) {
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
};


// list delete essay
exports.delete = function(req, res, next) {
	const id = req.query.id;
	if (id) {
		EssayModel.findById({_id: id}, function(err, essay) {
			if (err) {
				console.log(err);
			}
			let poster = essay.poster;
			let path = poster.slice(23).replace(')', '');
			// 删除相应的图片
			fs.unlinkSync(`public/${path}`);
			// 删除文章内容
			essay.remove(function(err) {
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
