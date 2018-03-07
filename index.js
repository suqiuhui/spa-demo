/**
 * Create by Suqiuhui on 2017/08/07
 * 项目入口文件，require模块管理的配置文件
 */
//The following is customizable, and consistent to the templates used
require.config({
    // urlArgs: 'v='+ (new Date().getTime()), //版本号
    baseUrl: '',
    paths: {
        "jquery": "./lib/jquery-3.2.1.min",
        "text": "./lib/text",
        "ajax":'./lib/ajax',
        "tools": "./common/tools",
        "linkList": "./common/linkList",
        "treeNode": "./common/treeNode",
        "app": "./modules/app/app",
        "home": "./modules/home/home",
        "postMD": "./modules/postMD/postMD",
        "getEmoji": "./modules/getEmoji/getEmoji",
        "error": "./modules/error/error",
        "faceMatching":'./modules/faceMatching/faceMatching',
        "emojiDetail":'./modules/emojiDetail/emojiDetail',
        "miniSPA": "./lib/miniSPA",
        "help": "./modules/help/help"
    },
    shim: {
    }
});
require(['jquery', 'app', 'miniSPA'], function($, AppView, miniSPA) {
    var appView = new AppView();

    $('#wrapper').append(appView.$el);

    // 初始调用路由hash
    miniSPA.changeUrl();    //initializes
});




