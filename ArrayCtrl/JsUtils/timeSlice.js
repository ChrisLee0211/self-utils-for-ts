"use strict";
/**
 * 时间分片包装器
 * @param {Generator} generator函数
 * @returns {Function} 时间分片启动函数，直接调用即可
 * @author chrislee
 * @Time 2020/10/16
 */
function timeSlice(gen) {
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
}
//# sourceMappingURL=timeSlice.js.map