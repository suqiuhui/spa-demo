/**
 * 功能描述：初始化主页
 */
define(function (require) {
    var home = {},
        miniSPA = require('miniSPA');            //default partial page, which will be loaded initially
    // home.partial = "modules/home/home.html";
    home.init = function () {   //bootstrap method
        //nothing but static content only to render
    };
    return home;
});
