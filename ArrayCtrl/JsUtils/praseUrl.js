"use strict";
function urlPraser(url) {
    var _a;
    if (Object.prototype.toString.call(url) !== "object String") {
        throw new Error("The param type must be String!");
    }
    var result = Object.create({});
    var paramsContent = (_a = url.split("?").splice(0, 1)[0]) !== null && _a !== void 0 ? _a : "";
    var params = paramsContent.length > 0 ? paramsContent.split("&") : [];
    if (params.length) {
        params.forEach(function (param) {
            var _a;
            var keyValue = (_a = param.split("=")) !== null && _a !== void 0 ? _a : [];
            if (keyValue.length) {
                result[keyValue[0]] = keyValue[1];
            }
        });
    }
    return result;
}
// 正则版本
function getParam(str) {
    var o = Object.create({});
    str.replace(/([^?=&]+)=([^?=&]+)/g, function (a, b, c) { return o[b] = c; });
    return o;
}
//# sourceMappingURL=praseUrl.js.map