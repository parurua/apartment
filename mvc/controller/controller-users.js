var mongoose = require('mongoose');
var Account = mongoose.model('Account');

exports.exitsCheck = async(function* (req, res, next){
    try{
        var user = yield Account.findByUsername(req.query.username);
        var status = user? 404 : 200;
        res.writeHead(status);
        res.end();
    }catch(err){
        next(err);
    }
});

exports.profile = async(function* (req, res, next){
    try{
        var user = yield Account.findByUsername(req.user.username);
        res.render('system/profile', {title: '个人信息', user1: user});
    }catch(err){
        next(err);
    }
});

exports.password = async(function* (req, res, next){
    try{
        var user = new Account(req.user);
        user.authenticate(req.body.prePassword, function(err, result){
            if(err) console.log(err);
            if(result){
                user.setPassword(req.body.password, function(err, newPassUser){
                    if(err) console.log(err);
                    newPassUser.save(function(err){
                        if(err) console.log(err);
                        res.json({flag:1 ,msg:'密码修改成功'});
                    });
                });
            }else{
                res.json({flag:0 ,msg:'原密码错误'});
            }
        });
    }catch(err){
        next(err);
    }
});

exports.list = async(function* (req, res, next){
    try{
        var condition = {};
        if(req.query.q){
            condition.username = new RegExp(req.query.q);
        }
        var users =  yield Account.find({}).sort({'_id':-1}).limit(1000).exec();
        res.render('system/users', { title: '用户', users: users, q: req.query.q});
    }catch(err){
        return next(err);
    }
});

exports.intoAdd = async(function* (req, res, next){
    try{
        res.render('system/users-add', {title: '用户新增'});
    }catch(err){
        return next(err);
    }
});

exports.submitAdd = async(function* (req, res, next){
    try{
        var user = req.body;
        user.createTime = new Date();
        user.createUser = req.user?req.user.username:'sys';
        Account.register(new Account(user), '888888', function(err, account) {
            req.flash(SUCCESS,'新增成功');
            res.json(1);
        });
    }catch(err){
        return next(err);
    }
});

exports.delete = async(function* (req, res, next){
    try{
        var userId = req.params.username;
        yield Account.remove({username: userId});
        req.flash(SUCCESS,'删除成功');
        res.json(1);
    }catch(err){
        next(err);
    }
});

exports.intoEdit = async(function* (req, res, next){
    try{
        var user = yield  Account.findByUsername(req.params.username);
        res.render('system/users-edit', {title: '修改用户', user: user});
    }catch(err){
        next(err);
    }
});

exports.submitEdit = async(function* (req, res, next){
    try{
        var _user = yield Account.findByUsername(req.params.username);
        yield Account.update({_id:_user._id}, req.body);
        req.flash(SUCCESS,'修改成功');
        res.json(1);
    }catch(err){
        return next(err);
    }
});

