"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function debounce(fn, delay) {
    if (delay === void 0) { delay = 300; }
    var timer = null;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.call.apply(fn, __spreadArrays([_this], args));
        }, delay);
    };
}
//# sourceMappingURL=debounce.js.map