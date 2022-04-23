var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { getVariableType } from "../utils/typeValidate";
var ArrayCtrl = /** @class */ (function () {
    function ArrayCtrl(arr) {
        this.arr = __spreadArrays(arr);
        return this;
    }
    ArrayCtrl.prototype.sortUp = function (x) {
        var _a;
        if (objectCheck(x, this.arr) !== -1) {
            var target = objectCheck(x, this.arr);
            _a = [this.arr[target], this.arr[target - 1]], this.arr[target - 1] = _a[0], this.arr[target] = _a[1];
            return this.arr;
        }
        else {
            return this.arr;
        }
    };
    ArrayCtrl.prototype.sortDown = function (x) {
        var _a;
        if (objectCheck(x, this.arr) !== -1) {
            var target = objectCheck(x, this.arr);
            var len = this.arr.length;
            if (target >= len - 1) {
                return this.arr;
            }
            else {
                _a = [this.arr[target + 1], this.arr[target]], this.arr[target] = _a[0], this.arr[target + 1] = _a[1];
                return this.arr;
            }
        }
        else {
            return this.arr;
        }
    };
    return ArrayCtrl;
}());
export { ArrayCtrl };
var statusSwitch = /** @class */ (function () {
    function statusSwitch(value_set) {
        this.switch_key = [];
        this.switch_status = null;
        this.value_set = value_set;
    }
    statusSwitch.prototype.checkIndex = function (val, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] = val) {
                return i;
            }
        }
    };
    statusSwitch.prototype.data_transform = function (item, rules) {
        var change_item = item;
        var rule_arr = [];
        rules.forEach(function (record, index) {
            var key = Object.keys(record)[0];
            rule_arr.push(key);
        });
        this.switch_key = rule_arr;
        var result = this.value_set;
        var _loop_1 = function (val) {
            if (val instanceof Array) {
                console.log('数据格式不正确');
            }
            else {
                var changeValue = val[change_item];
                var keyValue_1 = changeValue.toString();
                var changeIndex = this_1.switch_key.findIndex(function (value, index, arr) {
                    return value === keyValue_1;
                });
                var targetStatus = rules[changeIndex];
                val[change_item] = targetStatus[changeValue];
            }
        };
        var this_1 = this;
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var val = result_1[_i];
            _loop_1(val);
        }
        return result;
    };
    return statusSwitch;
}());
export { statusSwitch };
/*
函数名称: hasArray
功能:判断一个数组里是否嵌套了子数组，是则返回true。同时也可以传入第二个参数来返回由子数组索引组成的数组
用法：
    1、函数接收两个参数：
        param_1(Array):要进行判断的数组；
        param_2(Boolean):是否返回子数组索引组成的数组，如果只传一个参数，那么默认第二个参数为false
    2、当只传入数组时，只返回true or false来分别表示有\无子数组
    3、当传入两个参数并且第二个参数为true时，有子数组则返回子数组索引组成的数组，没有子数组则返回false
*/
export var hasArray = function (arr, getIndex) {
    if (getIndex === void 0) { getIndex = false; }
    var judge_arr = arr;
    var is_return_index = getIndex;
    var index_arr = [];
    var has_arr = false;
    Array.from(judge_arr).forEach(function (record, index) {
        if (record instanceof Array) {
            console.log('ok');
            index_arr.push(index);
            has_arr = true;
        }
    });
    if (is_return_index === true) {
        return index_arr;
    }
    else {
        return has_arr;
    }
};
var inventObject = /** @class */ (function () {
    function inventObject(param) {
        if (param instanceof Array) {
            this.obj_arr = param;
            this.isArray = true;
        }
        else {
            this.obj_arr = [];
            this.obj = param;
            this.isArray = false;
        }
    }
    ;
    inventObject.prototype.getNewObject = function (key, value) {
        var new_obj = {};
        if (this.isArray === true) {
            Array.from(this.obj_arr).forEach(function (record) {
                var target_key = record[key].toString();
                var target_value = record[value];
                new_obj[target_key] = target_value;
            });
        }
        else {
            var target_key = this.obj[key].toString();
            var target_value = this.obj[value];
            new_obj[target_key] = target_value;
        }
        return new_obj;
    };
    return inventObject;
}());
export { inventObject };
/*
函数名称: differArray
功能:对比两个数组A和B，将所有只存在A而不存在B的元素抽离出来，组成一个数组返回。
用法：
    1、函数接收两个参数：
        param_1(Array):要进行对比的数组；
        param_2(Array):要进行对比的数组；
    2、返回值:
        result(Array):只存在param_1而不存在param_2的元素所组成的数组
    
*/
export var differArray = function (arr1, arr2) {
    var result = [];
    arr1.forEach(function (record) {
        if (objectCheck(record, arr2) === -1) {
            result.push(record);
        }
        else {
            return;
        }
    });
    return result;
};
export var countDown = function (val, func, delay) {
    return (val > 0) ? setTimeout(function () { return countDown(val - 1, func); }, delay) : func();
};
/**
 * 功能：判断某个对象是否在数组中，并返回该对象在数组中的索引
 * 参数：
 * @param {object} obj:要判断的对象
 * @param {Array} arr:作为判断的数组
 * @returns {number} 该对象在数组中的索引  -1 =》 该对象不在数组中
 */
export var objectCheck = function (obj, arr) {
    var index = -1;
    var indexArr = [];
    if (arr instanceof Array) {
        if (arr.length < 0) {
            return -1;
        }
        arr.forEach(function (record, idx) {
            if (objectEqual(record, obj) === true) {
                indexArr.push(idx);
            }
        });
        if (indexArr.length < 1) {
            return -1;
        }
        return indexArr[0];
    }
    else {
        return -1;
    }
    return index;
};
/**
 * 功能：判断对象相等
 * 参数：
 * @param {object} x:对象1
 * @param {object} y:对象2
 * @returns {boolean}
 * @update 2020/09/29 更新为对不同类型分别递归判断
 */
export var objectEqual = function (x, y) {
    var f1 = x instanceof Object;
    var f2 = y instanceof Object;
    if (!f1 || !f2) {
        return x === y;
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
    }
    var keys = Object.keys(x);
    var keysNums = keys.length;
    for (var i = 0; i < keysNums; i++) {
        var commonKey = keys[i];
        // 先判断y对象是否同样包含一样的key
        if (Object.keys(y).includes(commonKey) === false) {
            return false;
        }
        // 判断当前遍历的属性在两个对象中是否类型一致
        var typeEqual = getVariableType(x[commonKey]) === getVariableType(y[commonKey]);
        if (!typeEqual) {
            return typeEqual;
        }
        // 如果该属性为对象，则开始递归
        if (getVariableType(x[commonKey]) === "[object Object]") {
            var equal = objectEqual(x[commonKey], y[commonKey]);
            if (!equal) {
                return equal;
            }
        }
        // 如果该属性是数组，则先比较长度，再遍历数组元素继续比较
        if (getVariableType(x[commonKey]) === "[object Array]") {
            var lenEqual = x[commonKey].length === y[commonKey].length;
            if (!lenEqual) {
                return lenEqual;
            }
            ;
            var l = x[commonKey].length;
            for (var k = 0; k < l; k++) {
                var equal = objectEqual(x[commonKey][k], y[commonKey][k]);
                if (!equal) {
                    return equal;
                }
            }
        }
    }
    return true;
};
export var sortObject = function (arr, target, sort) {
    var _a, _b;
    var result;
    var targetArr = __spreadArrays(arr);
    //判断是否数组
    if (targetArr instanceof Array) {
        //判断数组是否为空
        if (targetArr.length < 1) {
            console.error('数组为空！');
            result = arr;
        }
        else {
            //判断数组中每一项是否对象
            var isObj = targetArr.every(function (v) { return v instanceof Object; });
            //判断传入的属性是否在数组的每个对象中，且为可排序类型
            var isRealKey = targetArr.every(function (v) {
                var keysArr = Object.keys(v);
                return keysArr.includes(target);
            });
            if (isObj && isRealKey) {
                var len = targetArr.length;
                for (var i = 0; i < len - 1; i++) {
                    if (sort === 'up') {
                        var min = i;
                        for (var j = i + 1; j < len; j++) {
                            if (targetArr[j][target] < targetArr[min][target]) {
                                min = j;
                            }
                            _a = [targetArr[min], targetArr[i]], targetArr[i] = _a[0], targetArr[min] = _a[1];
                        }
                    }
                    else {
                        var max = i;
                        for (var j = i + 1; j < len; j++) {
                            if (targetArr[j][target] > targetArr[max][target]) {
                                max = j;
                            }
                            _b = [targetArr[max], targetArr[i]], targetArr[i] = _b[0], targetArr[max] = _b[1];
                        }
                    }
                }
                result = __spreadArrays(targetArr);
            }
            else {
                console.error('传入的目标属性无法在每个对象中找到');
                result = arr;
            }
        }
    }
    else {
        result = arr;
    }
    return result;
};
/**
 * 只对对象数组中指定的key值进行深拷贝
 * @param {Object} obj:目标对象
 * @param {Array} target :要指定的key值组成的数组
 * @returns {Object}
 */
export var deepKeyCopy = function (obj, target) {
    if (typeof (obj) === 'string') {
        throw "can not deal with string";
    }
    var result = [];
    Array.from(obj).forEach(function (record, index) {
        var emptyObj = {};
        for (var key in record) {
            if (target.includes(key)) {
                emptyObj[key] = record[key];
            }
        }
        ;
        result.push(emptyObj);
    });
    return result;
};
/**
 * 嵌套对象降维成对象数组
 * 如将a:{b:{d:'11'},c{e:{f:'22'}}}转化为[{'a.b.d':'11'},{'a.c.e.f':'22'}]
 * @param pre 父级对象的前缀
 * @param obj 当前要降维的对象
 * @returns {Array}
 */
export var ObjectReduce = function (pre, obj) {
    var result = [];
    for (var key in obj) {
        if (obj[key] instanceof Object) {
            var current = pre + ("." + key);
            for (var _i = 0, _a = ObjectReduce(current, obj[key]); _i < _a.length; _i++) {
                var i = _a[_i];
                result.push(i);
            }
        }
        else {
            var current = (pre + ("." + key)).substr(1);
            var data = {};
            data[current] = obj[key];
            result.push(data);
        }
    }
    return result;
};
//# sourceMappingURL=index.js.map