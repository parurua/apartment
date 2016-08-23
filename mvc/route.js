var index = require('./controller/controller-index');
var user = require('./controller/controller-users');
/**
 * 路由配置入口
 * @param app
 */
module.exports = function(app){

    //首页
    app.get('/', index.list);

    //个人信息
    app.get('/profile', user.profile);
    app.post('/profile/password', user.password);

    //用户管理
    app.get('/users', user.list);
    app.get('/users/exits', user.exitsCheck);
    app.get('/users/add', user.intoAdd);
    app.post('/users/add', user.submitAdd);
    app.get('/users/delete/:username', user.delete);
    app.get('/users/edit/:username', user.intoEdit);
    app.post('/users/edit/:username', user.submitEdit);
};