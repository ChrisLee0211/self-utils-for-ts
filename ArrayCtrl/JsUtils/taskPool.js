"use strict";
var BatchTaskQueueCtreator = /** @class */ (function () {
    function BatchTaskQueueCtreator(delay) {
        this.queue = [];
        this.delay = 1500;
        this.delay = delay;
        this.push = this.push.bind(this);
        this.destory = this.destory.bind(this);
    }
    BatchTaskQueueCtreator.prototype.push = function (item, cb) {
        var _this = this;
        this.queue.push(item);
        setTimeout(function () {
            _this.flushQueue(cb);
        }, this.delay);
    };
    BatchTaskQueueCtreator.prototype.flushQueue = function (cb) {
        var prsentQueue = this.queue.slice();
        var cbFn = cb.bind(cb);
        this.queue = [];
        cbFn(prsentQueue);
    };
    BatchTaskQueueCtreator.prototype.destory = function () {
        this.queue = [];
    };
    return BatchTaskQueueCtreator;
}());
//# sourceMappingURL=taskPool.js.map