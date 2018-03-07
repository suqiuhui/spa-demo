/**
 * 功能描述：搭建spa
 *
 * 创建人：suqiuhui,mayuliang
 */
define(function (require) {
    var ajax = require("ajax"),
        linkList = require("linkList"),
        pObj = {},//初始化时将页面对象做缓存
        settings = {};               //global parameters
    settings.partialCache = {};      //cache for partial pages

    var miniSPA = {};

    //渲染页面时执行函数
    miniSPA.render = function () {
        settings.rootScope = pObj;
        miniSPA.refresh(settings.divDemo, settings.rootScope);
    };

    //hash改变执行函数
    miniSPA.changeUrl = function () {          //handle url change

        settings.divDemo = document.getElementById("demo");      //div for loading partials

        var urlHash = location.hash.replace('#', '').split("?")[0],
            hash = urlHash ? (urlHash.indexOf("/")>0 ? urlHash.split("/")[urlHash.split("/").length-1] : urlHash) : "";

        if (!hash) {
            hash = 'home';           //default page
        }
        else if (!linkList[hash]) {
            hash = "error";          //error page
        }
        //判断是否有缓存（有缓存直接获取页面，没有则ajax请求页面）
        if (settings.partialCache[hash]) {
            settings.divDemo.innerHTML = settings.partialCache[hash];
            miniSPA.initFunc(hash);
        } else {
            miniSPA.ajaxRequest(hash, 'GET', '', function (hash, res, status) {
                var page = res;
                if ('error' === hash) {
                    miniSPA.ajaxRequest(linkList[hash].partial, 'GET', '', function (hash, resError, status) {
                        page = resError;
                    });
                }
                settings.divDemo.innerHTML = page;
                miniSPA.initFunc(hash);
            });
        }
    };

    //获取页面的ajax请求
    miniSPA.ajaxRequest = function (hash, method, data, callback) {    //load partial page
        if (!hash) {
            hash = 'home';           //default page
        }
        else if (!linkList[hash]) {
            hash = "error";          //error page
        }

        var xmlhttp = ajax.gatXHR(),
            url = linkList[hash].partial;

        xmlhttp.open(method, url, true);
        xmlhttp.send(data);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                var status = xmlhttp.status,
                    statusFlag = status>=200 && status<300 || status === 304,
                    parts = url.split('.'),
                    partsFlag = parts.length > 1 && parts[parts.length - 1] == 'html',
                    res = xmlhttp.responseText;
                if (statusFlag && partsFlag) {
                    settings.partialCache[hash] = res;        //cache partials to improve performance
                } else {
                    hash = 'error';
                }
                callback(hash, res, status);
            }
        }
    };

    /**
     * 刷新时遍历节点
     * @param node 页面对象
     * @param scope 模块对象
     * @returns {boolean}
     */
    miniSPA.refresh = function(node, scope) {
        if(!node){return false}
        var children = node.childNodes;
        if(node.nodeType != 3 && node.attributes){                            //traverse child nodes, Node.TEXT_NODE == 3
            for(var k=0; k < node.attributes.length; k++){
                node.setAttribute(node.attributes[k].name, miniSPA.feedData(node.attributes[k].value, scope));       //replace variables defined in attributes
            }
            if(node.hasAttribute('data-src')){
                node.setAttribute('src',node.getAttribute('data-src'));             //replace src attribute
            }
            var childrenCount = children.length;
            for(var j=0; j<childrenCount; j++){
                if(children[j] && children[j].nodeType != 3 && Object.prototype.toString.call(children[j].hasAttribute) === "[object Function]"
                    && children[j].hasAttribute('data-repeat')) {     //handle repeat items
                    var item = children[j].dataset.item;
                    var repeat = children[j].dataset.repeat;
                    children[j].removeAttribute('data-repeat');
                    var repeatNode = children[j];
                    for(var prop in scope[repeat]){
                        repeatNode = children[j].cloneNode(true);                  //clone sibling nodes for the repeated node
                        node.appendChild(repeatNode);
                        var repeatScope = scope;
                        var obj = {};
                        obj.key = prop;
                        obj.value = scope[repeat][prop];                           //add the key/value pair to current scope
                        repeatScope[item] = obj;
                        miniSPA.refresh(repeatNode,repeatScope);                           //iterate over all the cloned nodes
                    }
                    node.removeChild(children[j]);                                 //remove the empty template node
                }
                else{
                    miniSPA.refresh(children[j],scope);                                    //not for repeating, just iterate the child node
                }
            }
        }
        else{
            node.textContent = miniSPA.feedData(node.textContent, scope);           //replace variables defined in the template
        }
    };

    /**
     * 解析数据
     * @param template 节点值
     * @param scope 模块对象
     * @returns {XML|string|void}
     */
    miniSPA.feedData = function(template, scope){                                     //replace variables with data in current scope
        return template.replace(/\{\{([^}]+)\}\}/gmi, function(model){
            var properties = model.substring(2,model.length-2).split('.');          //split all levels of properties
            var result = scope;
            for(var n in properties){
                if(result){
                    switch(properties[n]){                  //move down to the deserved value
                        case 'key':
                            result = result.key;
                            break;
                        case 'value':
                            result = result.value;
                            break;
                        case 'length':                     //get length from the object
                            var length = 0;
                            for(var x in result) length ++;
                            result = length;
                            break;
                        default:
                            result = result[properties[n]];
                    }
                }
            }
            return result;
        });
    };

    /**
     * 模块初始化执行函数
     * @param hash
     */
    miniSPA.initFunc = function (hash) {                            //execute the controller function responsible for current template
        var url = linkList[hash].partial,
            module = url.split(".")[0]
        require(["./../"+module], function (pageObj) {
            pObj = pageObj;
            fn = pageObj.init;
            if (typeof fn === 'function') {
                fn();
            }
        });
    };

    //window监听hash改变事件
    window.addEventListener("hashchange", miniSPA.changeUrl);

    return miniSPA;
});