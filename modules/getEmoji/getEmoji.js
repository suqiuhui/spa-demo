/**
 * 功能描述：初始化getEmoji页面
 */
define(function (require) {
    var getEmoji = {},
        miniSPA = require('miniSPA'),
        tools = require('tools');

    getEmoji.init = function () {
        $('#content').css('visibility', 'hidden');
        tools.ajaxRequest('https://api.github.com/emojis', 'GET', '', function (status, partial) {
            getEmoji.emojis = JSON.parse(partial);
            miniSPA.render();       //render related partial page with data returned from the server
            getEmoji.getIconEmoji();
            $('#content').css('visibility', 'visible');
        }, false);
    };

    getEmoji.getIconEmoji = function() {
        $('img.imgClick').off().click(function (e) {
            alert('clicked: ' + $(this).attr('data-key'));
            console.log('clicked: ' + this.dataset.key);
            console.log('clicked: ' + $(this).data('key'));
        });
    };

    return getEmoji;
});
