/**
 * ������������ʼ������
 */
define(function (require) {
    var $ = require("jquery"),
        tools = require("tools"),
        treeNode = require("treeNode"),
        linkList = require("linkList"),
        tpl = require('text!./app.html');

    var AppView = function () {

        var appEl = tools.StringParseDom(tpl)[0];

        this.init = function () {

            var navEl = appEl.getElementsByClassName("nav_tree_node")[0],
                tree = treeNode.treeList.tree,
                ulEl = AppView.fallNode(tree);

            navEl.appendChild(ulEl);
        };

        this.init();
        this.$el = appEl;
    };

    AppView.fallNode = function (tree) {
        var ulEl = document.createElement("ul");
        for (var i=0,length=tree.length; i<length; i++ ) {
            var node = tree[i],
                liEl = document.createElement("li"),
                aEl = document.createElement("a"),
                navText = document.createTextNode(node.desc);
            aEl.setAttribute("href", "#"+node.urlHash);
            aEl.setAttribute("target", "_self");
            aEl.setAttribute("title", node.desc);
            aEl.appendChild(navText);
            liEl.appendChild(aEl);

            if (node.children) {
                var liSubUl = AppView.fallNode(node.children);
                liEl.appendChild(liSubUl);
                liSubUl.style.display = 'none';
                liEl.onmouseover = function () {
                    liSubUl.style.display = 'block';
                }
                liEl.onmouseout = function () {
                    liSubUl.style.display = 'none';
                }
            }

            ulEl.appendChild(liEl);
        }
        return ulEl;
    }

    return AppView;
});