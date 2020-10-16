"use strict";
/**
 * 冒泡排序，核心原理是进行长度len次两两交换完成排序
 */
function bubble(arr) {
    var _a;
    if (arr.length < 1)
        return arr;
    var len = arr.length;
    var flag = false;
    while (len > 0) {
        for (var i = 0; i < len; i++) {
            var j = i + 1;
            if (j < len && arr[i] > arr[j]) {
                _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
                flag = true;
            }
        }
        len--;
        if (flag === false) {
            break;
        }
    }
    ;
    return arr;
}
//# sourceMappingURL=bubleSort.js.map