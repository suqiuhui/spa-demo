define(function (require) {
    var postMD = {},
        $ = require("jquery"),
        tools = require("tools"),
        miniSPA = require('miniSPA');
    postMD.init = function () {
        miniSPA.render();             //render related partial page
        postMD.submitPostMD();
    };

    postMD.submitPostMD = function () {
        $('button.postMDSubmit').off().click(function (e) {
            var $mdText = $('#mdText');
            var $md = $('#md');
            var data = {
                "text": $mdText.val().replace(/\n/g, '<br>'),
                "mode": "gfm",
                "context": "github/gollum"
            };
            tools.ajaxRequest('http://172.16.232.18:8089/mockjs/2/rq01', 'POST', data, function (status, res) {
                $md.html(res);     //render markdown partial returned from the server
            });
            $mdText.val('');
        })
    };

    return postMD;
});