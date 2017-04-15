const mongoose = require('mongoose');
const EssaySchema = require('../schemas/essay');
const Essay = mongoose.model('Essay', EssaySchema);

module.exports = Essay;
