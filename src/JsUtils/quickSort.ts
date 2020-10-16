/**
 * 快排，核心原理是从中间分开成左右两边，然后从中间向两边遍历，比中位数小的放在左数组，
 * 比中位数大的放在右数组，然后左右数组重复以上的步骤，直到不能再分割为止，就开始合并
 * 最后的合并结果就是已经排好序的数组
 */
function quickSort(arr:number[]):number[]{
    const len = arr.length;
    if(len<=1)return arr;
    const left = [];
    const right = [];
    const cursorIndex = Math.floor(arr.length/2);
    const cursor = arr[cursorIndex];
    for(let i=0;i<len;i++){
        if(i !== cursorIndex){
            if(arr[i]>cursor){
                right.push(arr[i])
            }
            if(arr[i]<cursor){
                left.push(arr[i])
            }
        }
    };
    return quickSort(left).concat([cursor],quickSort(right))
}