const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
