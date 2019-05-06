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
