const EssayModel = require('../models/essay');


// index page
exports.index = function(req, res) {
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
};
