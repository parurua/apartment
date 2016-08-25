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



}