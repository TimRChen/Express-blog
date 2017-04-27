const CommentModel = require('../models/comment');

// comment 
exports.save = function(req, res) {
    const _comment = req.body;
    console.log(_comment);
    const essayId = _comment.essay;
    const comment = new CommentModel(_comment); // 构建新模型

    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        res.redirect(`/essay/${essayId}`);
    });
};
