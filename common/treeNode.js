/**
 * Create by Suqiuhui on 2017/8/17
 */
define(function (require) {
    var linkList = require("linkList");

    var treeList = {
        treeTitle: "top-tree",
        tree: [
            {
                urlHash: "home",
                desc: "首页",
                moduleID: 1,
            },
            {
                urlHash: "postMD",
                desc: "任务收益",
                moduleID: 2,
            },
            {
                urlHash: "getEmoji",
                desc: "工作台",
                moduleID: 3,
                children: [
                    {
                        urlHash: "getEmoji/detail",
                        desc: "详情",
                        moduleID: 6,
                        children: [
                            {
                                urlHash: "getEmoji/detail/details",
                                desc: "详情s",
                                moduleID: 7,
                            }
                        ]
                    }
                ]
            },
            {
                urlHash: "faceMatching",
                desc: "任务中心",
                moduleID: 4,
            },
            {
                urlHash: "help",
                desc: "帮助",
                moduleID: 5,
            }
        ]
    }

    var TreeNode = function () {};
    TreeNode.treeList = treeList;

    return TreeNode;
})