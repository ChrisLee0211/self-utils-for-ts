"use strict";
var baseType = [
    "[object String]",
    "[object Number]",
    "[object Boolean]",
    "[object Null]",
    "[object Undefined]",
];
function deepClone(obj, cache) {
    if (cache === void 0) { cache = new WeakMap(); }
    var type = Object.toString.call(obj);
    if (baseType.includes(type))
        return obj;
    if (type === "[object Date]")
        return new Date(obj);
    if (type === "[object RegExp]")
        return new RegExp(obj);
    if (type === "[object Object]") {
        var cloneObject_1 = Object.create(Object);
        if (cache.has(obj)) {
            return cache.get(obj);
        }
        cache.set(obj, cloneObject_1);
        var keys = Object.keys(obj);
        var SymbolKeys = Object.getOwnPropertySymbols(obj);
        SymbolKeys.length > 0 && SymbolKeys.forEach(function (symbol) {
            cloneObject_1[symbol] = deepClone(obj[symbol], cache);
        });
        var keysNum = keys.length;
        for (var i = 0; i < keysNum; i++) {
            if (obj.hasOwnProperty(keys[i])) {
                cloneObject_1[keys[i]] = deepClone(obj[keys[i]], cache);
            }
        }
        return cloneObject_1;
    }
    ;
    if (type === "[object Array]") {
        var cloneArray = [];
        if (cache.has(obj)) {
            return cache.get(obj);
        }
        cache.set(obj, cloneArray);
        var len = obj.length;
        if (len <= 0)
            return cloneArray;
        while (len > 0) {
            cloneArray.unshift(deepClone(obj[len - 1], cache));
            len--;
        }
        ;
        return cloneArray;
    }
    return obj;
}
//# sourceMappingURL=deepClone.js.map