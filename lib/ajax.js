/**
 * Create by Suqiuhui on 2017/07/28
 * 自己封装改写的原生ajax
 */
define(function () {

    var AJAX = function () {

    };

    /**
     * 创建并完成 ajax 请求
     * @param options
     */
    AJAX.ajax = function (options) {
// url, method, data, success, fail, contentType, async
        var me = this,
            xhr = me.gatXHR();

        //先对对象options中的属性值作相应判断,以增强健壮性
        options = options || {};
        if (!options.async) {
            options.async = true;
        }
        options.url = options.url || "";
        options.method = options.method.toUpperCase() || "POST";
        // options.data = me.encodeFormData(options.data) || "";
        options.data = options.data || null;
        options.beforeSend = options.beforeSend || function () {};
        options.success = options.success || function () {};
        options.fail = options.fail || function () {};
        options.complete = options.complete || function () {};

        if (options.method === "GET") {
            // options.data = JSON.parse(options.data);
            options.url = options.url+(!options.data ? "":"?" + me.encodeFormData(options.data));
            options.data = '';
        }

        xhr.open(options.method, options.url, options.async);

        xhr.onreadystatechange = function () {
            //打开连接后发送请求前调用的方法
            if (xhr.readyState === 2) {
                options.beforeSend && options.beforeSend();
            }
            if (xhr.readyState === 4) {
                var status = xhr.status;
                if (status>=200 && status<300 || status === 304) {
                    //请求成功返回数据后调用的方法
                    options.success && options.success(status, xhr.responseText);
                } else {
                    //请求失败后调用的方法
                    options.fail && options.fail(status);
                }
                //整个ajax请求完成后调用的方法
                options.complete && options.complete();
            }
        }
        //如果请求方式是POST则添加Content-type请求头
        if (options.method==="POST" && options.contentType && !options.contentType.match("/^text/")) {
            xhr.setRequestHeader("Content-type", options.contentType);
            options.data = JSON.stringify(options.data);
        }
        xhr.send(options.data);

    }

    /**
     * 获取 XMLHttpRequest
     * @returns XMLHttpRequest
     */
    AJAX.gatXHR = function() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        var version = [
            "MSXML2.XMLHttp.6.0",
            "MSXML2.XMLHttp.5.0",
            "MSXML2.XMLHttp.4.0",
            "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp.2.0",
            "Microsoft.XMLHttp"
        ];
        for (var i=0,length = version.length; i<length; i++) {
            try {
                return new ActiveXObject(version[i]);
            } catch (e) {
                throw new Error("XMLHttpRequest is not supported in your browser!");
            }
        }
    }

    /**
     * 对调用ajax时传入的请求参数进行制定格式转换 key1=value1&key2=value2
     * @param data
     * @returns {*}
     */
    AJAX.encodeFormData = function (data) {
        if (!data) return "";
        var formData = [];
        if (data) {
            for (var name in data) {
                if (!data.hasOwnProperty(name)) continue;
                if (typeof data[name] === "function") continue;
                var value = data[name].toString();
                name = encodeURIComponent(name);
                value = encodeURIComponent(value);
                formData.push(name + "=" + value);
            }
            return formData.join("&");
        }
    }

    return AJAX;
})
