const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let EssaySchema = new Schema({
    title: String,
    content: String,
    small: String,
    poster: String,
    pv: {
        type: Number,
        default: 0
    },
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


// 定义静态方法
EssaySchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})     // 查找单条数据
            .exec(cb);
    },
    getMainPage: function (pageSize, cb) {
        return this
            .find({})   // 取出所有数据
            .sort({"meta.createAt": -1})
            .limit(pageSize)
            .exec(cb);
    },
    queryNextEssays: function(page, pageSize, cb) {
        return this
            .find({})
            .sort({"meta.createAt": -1})
            .skip(pageSize*(page - 1))
            .limit(pageSize)
            .exec(cb);
    },
    queryLastEssays: function(page, pageSize, cb) {
        return this
            .find({})
            .sort({"meta.createAt": -1})
            .skip(pageSize*(1 - page))
            .limit(pageSize)
            .exec(cb);
    }
};


module.exports = EssaySchema;