var async = require('co').wrap;
var mongoose = require('mongoose');

exports.list = async(function* (req, res, next){
    res.render('index', {title: 'Express'});
});
