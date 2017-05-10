const EssayModel = require('../models/essay');
// const pageQuery = require('../schemas/page.js');

// index page
exports.index = function(req, res, next) {
	console.log(req.session.user);

	EssayModel.fetch(function(err, essays) {
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

    let page;
	let originPage = req.path;
	console.log(`originPage is :   ${originPage}`)
	if (originPage === '/next') {
		page = 2;
	}

	console.log(`the request is ${page}`);

	

	EssayModel.queryNextEssays(page, 1, function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
		console.log('12312312312: ' + essays);
	});
};

// previous page
exports.preious = function(req, res, next) {

    let page = 0;
	let originPage = req.path;
	console.log(`originPage is :   ${originPage}`)
	if (originPage === '/previous') {
		page = 2;
	}
	console.log(`the request is ${page}`);


	EssayModel.queryLastEssays(page, 1, function(err, essays) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'timrchen',
			small: 'Just a start.',
			poster: 'background-image: url(/images/banner.jpeg)',
			essays: essays,
		});
		console.log('12312312312: ' + essays);
	});
};