var passport = require('passport');
var index = require('./controller/controller-index');
var user = require('./controller/controller-users');
/**
 * 路由配置入口
 * @param app
 */
module.exports = function(app){

    //首页
    app.get('/', index.list);
    app.get('/login', user.loginPage);
    app.get('/logout', user.logout);
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login',failureFlash: true}), user.login);

    //个人信息
    app.get('/profile', user.profile);
    app.post('/profile/edit', user.editProfile);
    app.post('/profile/password', user.password);

    //用户管理
    app.get('/users', user.list);
    app.get('/users/exits', user.exitsCheck);
    app.get('/users/add', user.addPage);
    app.post('/users/add', user.add);
    app.get('/users/delete/:username', user.delete);
    app.get('/users/edit/:username', user.editPage);
    app.post('/users/edit/:username', user.edit);
};