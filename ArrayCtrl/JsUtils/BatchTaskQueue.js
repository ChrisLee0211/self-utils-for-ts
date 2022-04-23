var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var INIT_DELAY = 1500;
var BatchTaskQueueCtreator = /** @class */ (function () {
    function BatchTaskQueueCtreator(delay, limit) {
        if (limit === void 0) { limit = 0; }
        this.queue = [];
        this.delay = INIT_DELAY;
        this.batchLimit = 0;
        this.timer = null;
        this.delay = delay;
        this.batchLimit = limit;
        this.push = this.push.bind(this);
        this.destory = this.destory.bind(this);
    }
    BatchTaskQueueCtreator.prototype.push = function (item, cb) {
        this.queue.push(item);
        this.flushTask(cb);
    };
    BatchTaskQueueCtreator.prototype.timeSlice = function (gen) {
        if (typeof gen !== "function")
            throw new Error("TypeError: the param expect a generator function");
        var g = gen();
        if (!g || typeof g.next !== "function")
            return;
        return function next() {
            var start = performance.now();
            var res = null;
            do {
                res = g.next();
            } while (res.done !== true && performance.now() - start > 25);
            if (res.done)
                return;
            setTimeout(next);
        };
    };
    BatchTaskQueueCtreator.prototype.gen = function (items, limit, cbFn) {
        return function () {
            var taskItems, slice, len, i, cur;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskItems = items;
                        _a.label = 1;
                    case 1:
                        if (!taskItems.length) return [3 /*break*/, 3];
                        slice = [];
                        len = Math.min(limit, taskItems.length);
                        for (i = 0; i < len; i++) {
                            cur = taskItems.shift();
                            if (cur) {
                                slice.push(cur);
                            }
                        }
                        ;
                        return [4 /*yield*/, cbFn(slice)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
    };
    BatchTaskQueueCtreator.prototype.flushTask = function (cb) {
        var _this = this;
        if (this.timer !== null)
            return;
        this.timer = setTimeout(function () {
            var prsentQueue = _this.queue.slice();
            _this.queue = [];
            var cbFn = cb.bind(cb);
            if (_this.batchLimit === 0) {
                cbFn(prsentQueue);
            }
            else {
                var timeSlicer = _this.timeSlice(_this.gen(prsentQueue, _this.batchLimit, cbFn));
                if (timeSlicer) {
                    timeSlicer();
                }
                else {
                    cbFn(prsentQueue);
                }
            }
            _this.timer && clearTimeout(_this.timer);
            _this.timer = null;
        }, this.delay);
    };
    BatchTaskQueueCtreator.prototype.destory = function () {
        this.queue = [];
        this.timer && clearTimeout(this.timer);
    };
    return BatchTaskQueueCtreator;
}());
export { BatchTaskQueueCtreator };
//# sourceMappingURL=BatchTaskQueue.js.map