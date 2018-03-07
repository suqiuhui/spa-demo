/**
 * 功能描述：初始化出错页面
 */
define(function (require) {
    var error = {},
        miniSPA = require('miniSPA');               //404 page
    // error.partial = "modules/error/error.html";
    error.init = function () {
        alert('URL does not exist. please check your code. You may also try manually inputing some other invalid url to get here.');
    };
    return error;
});