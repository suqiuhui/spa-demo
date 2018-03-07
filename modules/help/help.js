/**
 * 功能描述：初始化help页面
 */
define(function (require) {
    var miniSPA = require('miniSPA'),
        help = {};
    help.init = function () {
        miniSPA.render();
    };
    return help;
});