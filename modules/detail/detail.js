/**
 * 功能描述：初始化emojiDetail页面
 */
define(function (require) {
    var Detail = {},
        $ = require("jquery"),
        miniSPA = require('miniSPA');

    Detail.init = function () {
        miniSPA.render();
        var $detailDiv = $("#detail"),
            detailDivText = "当前页是详情页：";
        $detailDiv.append(detailDivText);
    };
    return Detail;
});