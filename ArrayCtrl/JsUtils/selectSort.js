"use strict";
/**
 * 选择排序 每次都找到当前范围内的最小值，把它放在当前范围的头部
 */
function selectSort(arr) {
    var _a;
    var len = arr.length;
    var minIndex = 0;
    for (var i = 0; i < len; i++) {
        minIndex = i;
        for (var j = i; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        ;
        if (minIndex !== i) {
            _a = [arr[i], arr[minIndex]], arr[minIndex] = _a[0], arr[i] = _a[1];
        }
    }
    ;
    return arr;
}
//# sourceMappingURL=selectSort.js.map