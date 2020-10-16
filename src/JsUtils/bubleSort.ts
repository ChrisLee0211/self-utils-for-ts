/**
 * 冒泡排序，核心原理是进行长度len次两两交换完成排序
 */
function bubble(arr:Array<number>):Array<number>{
    if(arr.length<1)return arr;
    let len:number = arr.length;
    let flag:boolean = false;
    while(len>0){
        for(let i=0;i<len;i++){
            let j = i+1;
            if(j<len&&arr[i]>arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]];
                flag = true;
            }
            
        }
        len--;
        if(flag === false){
            break
        }
    };
    return arr
}