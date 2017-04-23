const router = require('express').Router();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://localhost/essay';
const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Essay = require('../app/controllers/essay');

mongoose.Promise = global.Promise;  // 赋值一个全局Promise
mongoose.connect('mongodb://localhost/essay');

// create session db
router.use(session({
    secret: 'essay',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

// pre handle user
router.use(function(req, res, next) {
	let _user = req.session.user;
    res.locals.user = _user;

	next();
});


/* Index */
router.get('/', Index.index);


/* User */
router.post('/user/signup', User.signup);
router.get('/admin/userList', User.list);
router.post('/user/signin', User.signin);
router.get('/logout', User.logout);


/* Essay */
router.get('/essay/:id', Essay.detail);
router.get('/admin/new', Essay.new);
router.get('/admin/update/:id', Essay.update);
router.post('/admin/new', Essay.save);
router.get('/admin/list', Essay.list);
router.delete('/admin/list', Essay.delete);


module.exports = router;
