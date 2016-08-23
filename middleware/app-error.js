/**
 * 错误处理
 * @param app
 */
module.exports = function(app){

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);

    req.flash('error','操作失败, 失败原因：'+err.message);
    res.json(err);

    // res.status(err.status || 500);
    //
    //     res.render('common/error', {
    //         message: err.message,
    //         error: err
    //     });
    //
    });
}