if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//时间设置
function currentTime() {
    var d = new Date(), str = '';
    str += d.getFullYear() + '年';
    str += d.getMonth() + 1 + '月';
    str += d.getDate() + '日';
    str += d.getHours() + '时';
    str += d.getMinutes() + '分';
    str += d.getSeconds() + '秒';
    return str;
}

//根据地址从服务器获取页面
function getPage(url, cb) {
    layer.load();
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (data) {
            layer.closeAll('loading');
            cb(data);
        }
    });
}

function openLayer(conf){
    var obj = {
        type: 1,
        maxmin: true,
        shadeClose: false,
        area: ['800px', ''],
        cancel: function () {
            $('#parsley-messages').html('');
        }
    };
    var obj = $.extend(obj, conf);
    layer.open(obj);
}

function _alert(msg, icon) {
    if(msg){
        layer.alert(msg, {
            title: '提示',
            icon: icon || 0,
            time: 5000
    });
    }
}

function validateAndSubmit(formId, action, method) {
    $('#' + formId).attr('data-parsley-errors-container', '#parsley-messages');
    var ok = $('#' + formId).parsley().validate();
    if (ok){
        if(action) $('#' + formId).action = action;
        if(method) $('#' + formId).method = method;
        $('#' + formId).submit();
    }else{
        _alert($('#parsley-messages').html());
    }
}

function _commonWin(title, url, formId) {
    getPage(url, function (page) {
        openLayer({
            title: title,
            content: page,
            btn: ['提交', '取消'],
            yes: function () {
                validateAndSubmit(formId, url, 'post');
            }
        });
    });
}

function _confirmWin(title, url) {
    layer.confirm(title,  {icon: 3, title:'确认'}, function (index) {
        location.href = url;
    });
}
