var typeEnum = {
    "string": "[object String]",
    "number": "[object Number]",
    "boolean": "[object Boolean]",
    "undefined": "[object Undefined]",
    "null": "[object Null]",
    "object": "[object Object]",
    "function": "[object Function]",
    "array": "[object Array]",
    "date": "[object Date]",
    "reg": "[object RegExp]"
};
/**
 * Verify that a value is an object
 * @param {any} obj
 * @returns {boolean}
 * @author  chrislee
 * @Time 2020/7/12
 */
export var isObject = function (obj) {
    var res = true;
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        res = true;
    }
    else {
        res = false;
    }
    return res;
};
/**
 * Verify that a value is undefined
 * @param {any} obj
 * @returns {boolean}
 * @author chrislee
 * @Time 2020/7/12
 */
export var isUndefined = function (obj) {
    var res;
    if (obj === undefined || Object.prototype.toString.call(obj) === typeEnum["undefined"]) {
        res = true;
    }
    else {
        res = false;
    }
    return res;
};
/**
 * Verify that a value is an array
 * @param {any} obj
 * @returns {boolean}
 * @author chrislee
 * @Time 2020/7/12
 */
export var isArray = function (obj) {
    var res;
    if (obj instanceof Array || Object.prototype.toString.call(obj) === typeEnum["array"]) {
        res = true;
    }
    else {
        res = false;
    }
    return res;
};
/**
 * Verify that a value is an boolean
 * @param {any} obj
 * @returns {boolean}
 * @author chrislee
 * @Time 2020/7/12
 */
export var isBoolean = function (obj) {
    var res;
    if (Object.prototype.toString.call(obj) === typeEnum["boolean"]) {
        res = true;
    }
    else {
        res = false;
    }
    return res;
};
export var typeValidate = function (obj, type, constant) {
    if (constant === void 0) { constant = "The value of target"; }
    var res;
    if (Object.prototype.toString.call(obj) === typeEnum[type]) {
        res = true;
    }
    else {
        var currentType = "undefined";
        for (var key in typeEnum) {
            if (typeEnum[key] === Object.prototype.toString.call(obj)) {
                currentType = key;
            }
        }
        throw TypeError(constant + " expect a " + type + ",but got " + currentType);
    }
    return res;
};
/**
 * get variable type
 * @param {any} obj
 * @returns {string}
 * @author chrislee
 * @Time 2020/9/28
 */
export var getVariableType = function (obj) {
    return Object.prototype.toString.call(obj);
};
//# sourceMappingURL=typeValidate.js.map