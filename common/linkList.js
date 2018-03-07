/**
 * Create by Suqiuhui on 2017/08/08
 * 导航信息的动态配置项
 */
define(function (require) {

    var list = {
        error: {
            urlHash: "error",
            partial: "modules/error/error.html",
            desc: "页面错误",
            moduleID: 0
        },
        home: {
            urlHash: "home",
            partial: "modules/home/home.html",
            desc: "首页",
            moduleID: 1
        },
        postMD: {
            urlHash: "postMD",
            partial: "modules/postMD/postMD.html",
            desc: "任务收益",
            moduleID: 2
        },
        getEmoji: {
            urlHash: "getEmoji",
            partial: "modules/getEmoji/getEmoji.html",
            desc: "工作台",
            moduleID: 3
        },
        faceMatching: {
            urlHash: "faceMatching",
            partial: "modules/faceMatching/faceMatching.html",
            desc: "任务中心",
            moduleID:4
        },
        help: {
            urlHash: "help",
            partial: "modules/help/help.html",
            desc: "帮助",
            moduleID:5
        },
        emojiDetail:{
            urlHash: "getEmoji/emojiDetail",
            partial:"modules/emojiDetail/emojiDetail.html",
            desc: "emoji详情",
            moduleID:8
        },
        detail:{
            urlHash: "getEmoji/detail",
            partial:"modules/detail/detail.html",
            desc: "详情",
            moduleID:6
        },
        details:{
            urlHash: "getEmoji/detail/details",
            partial:"modules/page/details/details.html",
            desc: "详情sss",
            moduleID:7
        }
    };

    return list;
});