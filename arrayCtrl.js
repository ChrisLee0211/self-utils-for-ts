"use strict";
var ArrayCtrl = /** @class */ (function () {
    function ArrayCtrl(arr) {
        this.arr = arr;
    }
    ArrayCtrl.prototype.func = function (a, b, arr) {
        return;
    };
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
