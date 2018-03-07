/**
 * Create by Suqiuhui on 2017/08/10
 * 工具类
 */
define(function (require) {
    var $ = require('jquery'),
        miniSPA = require('miniSPA'),
        AJAX = require('ajax'),
        Tools = {};

    /**
     * 调用自己封装的 ajax，项目所有ajax请求的公用工具方法
     * @param url       //请求地址
     * @param method    //请求方式
     * @param data      //请求参数
     * @param callback  //回调方法
     * @param async     //是否异步
     */
    Tools.ajaxRequest = function (url, method, data, callback, async) {
        AJAX.ajax({
            url: url || "",
            method: method || "POST",
            data: data,
            contentType: "application/x-www-form-urlencoded",
            // contentType: "application/json",
            beforeSend: function () {
                document.getElementById('spinner').style.visibility = 'visible';
            },
            success: function (status, response) {
                callback && callback(status, response);
            },
            fail: function (status) {
                miniSPA.initFunc('error');
            },
            complete: function () {
                document.getElementById('spinner').style.visibility = 'hidden';
            },
            async: async
        })
    }

    /**
     * string 装 DOM
     * @param nodeString
     * @returns {NodeList}
     * @constructor
     */
    Tools.StringParseDom = function (nodeString) {
        var objE = document.createElement("div");
        objE.innerHTML = nodeString;
        return objE.childNodes;
    }

    /**
     * 刷新时遍历节点
     * @param node 页面对象
     * @param scope 模块对象
     * @returns {boolean}
     */
    /*
    * <li ng-repeat="item in items">
            <span>{{$index + 1}}</span>
            <span>{{item.name}}</span>
            <span>
                <button ng-click="remove($index)">Remove</button>
            </span>
            <ul>
                <li {{it in item}}></li>
            </ul>
        </tr>
    * */
    Tools.handlebar = function (node, dataList) {
        /*if (!parentNode) { return false }
        var children = parentNode.childNodes,
            childrenCount = children.length;

        for (var j=0; j<childrenCount; j++) {

        }*/

        if (!node) { return false }
        if (node.nodeType == 1 && node.attributes && node.hasAttribute("data-repeat")) {
            var dataSource = node.dataset.repeat.split(" ");
            try {
                var item = dataSource[0],
                    items = dataSource[2];
                if (items != dataList) {
                    return "找不到items";
                }

                node.removeAttribute("data-repeat");

                var nodeHTMLString = node.outerHTML,
                    parentNode = node.parentNode;

                for (var i=0,lenght = dataList.length; i<length; i++) {
                    item = dataList[i];
                    nodeHTMLString.replace(/\{\{([^}]+)\}\}/gmi, function (model) {
                        var properties = model.substring(2,model.length-2).split('.');
                        if (properties.length==2) {
                            return item[properties[1]];
                        }
                    });
                    nodeHTMLString.replace(/index/gmi, i);
                    parentNode.appendChild(Tools.StringParseDom(nodeHTMLString));
                }
            } catch (E) {
                throw new Error("循环格式不符： item in items");
            }
        }
    }

    return Tools;
})