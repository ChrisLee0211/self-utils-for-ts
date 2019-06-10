var ArrayCtrl = /** @class */ (function () {
    function ArrayCtrl(arr) {
        this.arr = arr;
    }
    ArrayCtrl.prototype.sortUp = function (x) {
        var _a;
        if (this.arr.includes(x)) {
            var target = this.arr.findIndex(function (value, index, arr) {
                return value === x;
            });
            if (target <= 0) {
                return this.arr;
            }
            else {
                _a = [this.arr[target], this.arr[target - 1]], this.arr[target - 1] = _a[0], this.arr[target] = _a[1];
                return this.arr;
            }
        }
        else {
            return this.arr;
        }
    };
    ArrayCtrl.prototype.sortDown = function (x) {
        var _a;
        if (this.arr.includes(x)) {
            var target = this.arr.findIndex(function (value, index, arr) {
                return value === x;
            });
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
功能:对比两个数组，将两者之间不是共有的元素以数组形式返回，可以看做是两数组相减
用法：
    1、函数接收两个参数：
        param_1(Array):要进行对比的数组；
        param_2(Array):要进行对比的数组；
    2、返回值:
        result(Array):两数组之间不是共有的元素组成的数组
    
*/
export var differArray = function (arr1, arr2) {
    var result_arr = [];
    var result = [];
    var target_arr_A = [];
    var target_arr_B = [];
    Array.from(arr1).forEach(function (record) {
        target_arr_A.push(JSON.stringify(record));
    });
    Array.from(arr2).forEach(function (record) {
        target_arr_B.push(JSON.stringify(record));
    });
    Array.from(target_arr_A).forEach(function (record) {
        if (target_arr_B.includes(record)) {
            return;
        }
        else {
            result_arr.push(record);
        }
    });
    Array.from(target_arr_B).forEach(function (record) {
        if (target_arr_A.includes(record)) {
            return;
        }
        else {
            result_arr.push(record);
        }
    });
    Array.from(result_arr).forEach(function (record) {
        result.push(JSON.parse(record));
    });
    return result;
};
export var countDown = function (val, func, delay) {
    return (val > 0) ? setTimeout(function () { return countDown(val - 1, func); }, delay) : func();
};
