const mongoose = require('mongoose');
const EssaySchema = require('../schemas/essay');
const EssayModel = mongoose.model('EssayModel', EssaySchema);

module.exports = EssayModel;
