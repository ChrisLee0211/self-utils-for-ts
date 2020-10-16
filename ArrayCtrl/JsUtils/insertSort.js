"use strict";
/**
 * 插入排序，核心原理是遍历是找到当前元素在前面序列中的正确位置
 * @param arr
 */
function insertSort(arr) {
    var len = arr.length;
    var cur = null;
    for (var i = 1; i < len; i++) {
        var j = i;
        cur = arr[i];
        while (j > 0 && cur < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        ;
        arr[j] = cur;
    }
    ;
    return arr;
}
//# sourceMappingURL=insertSort.js.map