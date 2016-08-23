var mongoose = require('mongoose');
var passport = require('passport');
var Account = mongoose.model('Account');

/**
 * 登录认证配置
 * @param app
 */
module.exports = function(app){
    
    //passport配置
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(Account.createStrategy());
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    //验证是否已经登录
    app.use(function(req, res, next) {
        if (req.path != "/login") {
            if (!req.isAuthenticated || !req.isAuthenticated()) {
                if (req.session) {
                    req.session.returnTo = req.originalUrl || req.url;
                }
                return res.redirect('/login');
            }
        }
        next();
    });

    app.get('/login', function (req, res, next) {
        res.render('login', {title:'登录', username : req.flash('username')});
    });

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login',failureFlash: true}),
        function(req, res) {
            req.session.userId = req.user.username;
            var returnTo = req.session.returnTo==undefined?'/':req.session.returnTo;
            res.redirect(returnTo);
        }
    );

    app.get('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });

}