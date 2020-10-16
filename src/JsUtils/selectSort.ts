/**
 * 选择排序 每次都找到当前范围内的最小值，把它放在当前范围的头部
 */
function selectSort(arr:number[]):number[]{
    const len = arr.length;
    let minIndex = 0;
    for(let i=0;i<len;i++){
        minIndex = i
        for(let j=i;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j
            }
        };
        if(minIndex!==i){
            [arr[minIndex],arr[i]] = [arr[i],arr[minIndex]]
        }
    };
    return arr
}