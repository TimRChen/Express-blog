const mongoose = require('mongoose');


// headerTitle 文章标题，用于header
// title 首页文章标题
let EssaySchema = new mongoose.Schema({
    title: String,
    headerTitle: String,
    content: String,
    small: String,
    poster: String,
    imgUrl: String,
    nextImg: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now(),
        },
        updateAt: {
            type: Date,
            default: Date.now(),
        }
    }
});


EssaySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});



EssaySchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
};


module.exports = EssaySchema;