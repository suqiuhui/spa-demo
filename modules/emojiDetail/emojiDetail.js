/**
 * 功能描述：初始化emojiDetail页面
 */
define(function (require) {
    var EmojiDetail = {},
        miniSPA = require('miniSPA');

    EmojiDetail.init = function () {
        miniSPA.render();
        //获取参数
        var dataSearch = window.location.hash.split("?"),
            dataArr = dataSearch.length>=2 ? dataSearch[1].split("&") : "emoji error",
            dataObj = {};
        for (var i=0; i<dataArr.length; i++) {
            var item = dataArr[i].split("=");
            if (item.length>=2) {
                dataObj[item[0]] = item[1]
            }
        }
        var $emojiDiv = $("#emojiID"),
            emojiDivText = "当前emoji的详情是：" + JSON.stringify(dataObj);
        $emojiDiv.append(emojiDivText);
    };
    return EmojiDetail;
});