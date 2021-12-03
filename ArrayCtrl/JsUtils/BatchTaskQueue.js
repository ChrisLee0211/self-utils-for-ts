"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function throttle(fn, delay) {
    if (delay === void 0) { delay = 300; }
    var isTrigger = false;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isTrigger)
            return;
        isTrigger = true;
        setTimeout(function () {
            fn.call.apply(fn, __spreadArrays([_this], args));
            isTrigger = false;
        }, delay);
    };
}
var BatchTaskQueueCtreator = /** @class */ (function () {
    function BatchTaskQueueCtreator(delay) {
        this.queue = [];
        this.delay = 1500;
        this.flushQueueFn = null;
        this.delay = delay;
        this.flushQueueFn = this.flushTaskCreator();
        this.push = this.push.bind(this);
        this.destory = this.destory.bind(this);
    }
    BatchTaskQueueCtreator.prototype.push = function (item, cb) {
        this.queue.push(item);
        if (this.flushQueueFn) {
            this.flushQueueFn(cb);
        }
    };
    BatchTaskQueueCtreator.prototype.flushTaskCreator = function () {
        var _this = this;
        return throttle(function (cb) {
            var prsentQueue = _this.queue.slice();
            var cbFn = cb.bind(cb);
            _this.queue = [];
            cbFn(prsentQueue);
        }, this.delay);
    };
    BatchTaskQueueCtreator.prototype.destory = function () {
        this.queue = [];
    };
    return BatchTaskQueueCtreator;
}());
//# sourceMappingURL=BatchTaskQueue.js.map