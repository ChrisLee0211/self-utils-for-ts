"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus["FULFILLED"] = "FULFILLED";
    PromiseStatus["PENDING"] = "PENDING";
    PromiseStatus["REJECTED"] = "REJECTED";
})(PromiseStatus || (PromiseStatus = {}));
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        var _this = this;
        this.status = PromiseStatus["PENDING"];
        this.resolveCbs = [];
        this.rejectCbs = [];
        if (typeof executor !== "function") {
            throw new Error("Promise constructor needs a function as param");
        }
        var _resolve = function (val) {
            var run = function () {
                if (_this.status !== "PENDING")
                    return;
                _this.status = PromiseStatus["FULFILLED"];
                _this.value = val;
                while (_this.resolveCbs.length > 0) {
                    var fn = _this.resolveCbs.pop();
                    fn(val);
                }
            };
            setTimeout(run);
        };
        var _reject = function (res) {
            var run = function () {
                if (_this.status !== "PENDING")
                    return;
                _this.status = PromiseStatus["REJECTED"];
                _this.reason = res;
                while (_this.rejectCbs.length > 0) {
                    var fn = _this.rejectCbs.shift();
                    fn(res);
                }
            };
            setTimeout(run);
        };
        executor(_resolve, _reject);
    }
    MyPromise.prototype.then = function (onFulfillFn, onRejectFn) {
        // 按照promise规范，如果两个参数不是函数的话，跳过本次then，让链式继续执行
        // 具体方法就是包装成一个永远返回输入值的箭头函数，不执行任何副作用
        onFulfillFn = typeof onFulfillFn === "function" ? onFulfillFn : function (v) { return v; };
        onRejectFn = typeof onRejectFn === "function" ? onRejectFn : function (err) { throw new Error(err); };
        var self = this;
        return new MyPromise(function (resolve, reject) {
            // 在onFulfillFn外面再包装一层逻辑，用于执行then中的resolve回调拿到结果
            // 因为还要考虑resolve本身也返回一个promise，规范中指定，
            // 如果返回一个promise，需要等待它完成并把值传给下一个promise中
            var fulfillCallback = function (val) {
                try {
                    var x = onFulfillFn(val);
                    //判断onFulfillFn本身的返回值是不是promise
                    if (x instanceof MyPromise) {
                        // 这里是关键
                        // 调用x.then把上层then返回的promise函数中的resolve注册到x中
                        // 那么当x的promise完成时，它会把执行resolve把状态带出来
                        x.then(resolve, reject);
                    }
                    else {
                        //如果不是promise，直接把它的返回设置成下一个promise的value即可
                        resolve(x);
                    }
                }
                catch (e) {
                    // 如果触发异常，就执行下一个promise的reject并设置异常原因reason
                    reject(e);
                }
            };
            // 和上面同理
            var rejectCallback = function (err) {
                try {
                    var x = onRejectFn(err);
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);
                    }
                    else {
                        resolve(x);
                    }
                }
                catch (e) {
                    reject(e);
                }
            };
            switch (self.status) {
                case "PENDING":
                    //如果注册回调的时候promise还没跑完，那就先推入到回调队列里保持执行顺序
                    self.resolveCbs.push(fulfillCallback);
                    self.rejectCbs.push(rejectCallback);
                    break;
                case "FULFILLED":
                    // 如果注册回调的时候已经改变状态了，那说明错过了promise中你的异步，此时
                    //then自己执行传入的callback即可
                    fulfillCallback(self.value);
                    break;
                case "REJECTED":
                    rejectCallback(self.reason);
                    break;
                default:
            }
        });
    };
    MyPromise.prototype.catch = function (errFn) {
        return this.then(undefined, errFn);
    };
    MyPromise.prototype.resolve = function (val) {
        if (val instanceof MyPromise)
            return val;
        return new MyPromise(function (resolve, reject) { return resolve(val); });
    };
    MyPromise.prototype.reject = function (val) {
        return new MyPromise(function (resolve, reject) { return reject(val); });
    };
    return MyPromise;
}());
exports.default = MyPromise;
//# sourceMappingURL=index.js.map