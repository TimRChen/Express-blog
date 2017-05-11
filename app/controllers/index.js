const EssayModel = require('../models/essay');
// const pageQuery = require('../schemas/page.js');

// index page
exports.index = function(req, res, next) {
	console.log(`***Welcome***`);
	console.log(req.session.user);

	let pageSize = 8;
	EssayModel.getMainPage(pageSize, function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
	});
};


// next page
exports.next = function(req, res, next) {

    let page = 1;
	let pageSize = 8;
	let originPage = req.path;
	if (originPage === '/next') {
		page++;
	}

	console.log(`the page is ${page}`);

	EssayModel.queryNextEssays(page, pageSize, function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
	});
};

// previous page
exports.preious = function(req, res, next) {

    let page = 1;
	let originPage = req.path;
	if (originPage === '/previous') {
		page++;
	}
	console.log(`the request is ${page}`);
	let pageSize = 1;

	EssayModel.queryLastEssays(page, pageSize, function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
	});
};