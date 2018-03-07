/**
 * 功能描述：初始化emojiDetail页面
 */
define(function (require) {
    var Detail = {},
        $ = require("jquery"),
        miniSPA = require('miniSPA');

    Detail.init = function () {
        miniSPA.render();
        var $detailsDiv = $("#details"),
            detailsDivText = "当前页是详情sss页：";
        $detailsDiv.append(detailsDivText);
    };
    return Detail;
});