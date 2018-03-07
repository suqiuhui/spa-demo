/**
 * 功能描述：初始化faceMatching页面
 */
define(function (require) {
    var faceMatching = {},
        miniSPA = require('miniSPA'),
        tools = require('tools');

    faceMatching.init = function () {
        tools.ajaxRequest('https://api.github.com/emojis','GET','',function(status, partial){
            var partial = JSON.parse(partial);
            faceMatching.photos = partial;
            faceMatching.pic = partial['100'];
            miniSPA.render();       //render related partial page with data returned from the server
        });
    };

    return faceMatching;
});