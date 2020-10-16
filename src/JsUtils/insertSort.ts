/**
 * 插入排序，核心原理是遍历是找到当前元素在前面序列中的正确位置
 * @param arr 
 */
function insertSort(arr:number[]):number[]{
    const len:number = arr.length;
    let cur:number|null = null;
    for(let i=1;i<len;i++){
        let j:number = i;
        cur = arr[i];
        while(j>0&&cur<arr[j-1]){
            arr[j] = arr[j-1];
            j--
        };
        arr[j] = cur
    };
    return arr
}