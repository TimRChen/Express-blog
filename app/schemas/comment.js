const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let CommentSchema = new Schema({
    essay: {type: ObjectId, ref: 'EssayModel'},
    from: {type: ObjectId, ref: 'UserModel'},
    to: {type: ObjectId, ref: 'UserModel'},
    content: String,
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


CommentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


// 定义静态方法
CommentSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})   // 取出所有数据
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})     // 查找单条数据
            .exec(cb);
    },
};


module.exports = CommentSchema;