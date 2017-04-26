const mongoose = require('mongoose');
const CommentSchema = require('../schemas/comment');
const CommentModel = mongoose.model('CommentModel', CommentSchema);

module.exports = CommentModel;
