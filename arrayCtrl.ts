/*
接口名称：arryCtrl
功能：    控制数组内某一元素升降
用法：    传入要控制的数组作为参数到ArrayCtrl中生成实例，然后用实例调用相应的方法实现某元素升降
方法说明： 
    1、ArrayCtrl.sortUp(item)
    作用:item在数组中上升一位
    参数(params):数组内的元素
    返回(return):顺序调换后的数组
    2、ArrayCtrl.sortDown(item)
    作用:item在数组中下降一位
    参数(params):数组内的元素
    返回(return):顺序调换后的数组
*/ 
interface Params_arryCtrl {
    arr:Array<any>,
    // func(a:any,b:any,arr):Array<any>,
    sortUp(x:any):Array<any>,
    sortDown(x:any):Array<any>
}

 class ArrayCtrl implements Params_arryCtrl{
    arr:Array<any>;
    constructor (arr:Array<any>){
        this.arr = arr
    }
    sortUp(x:any):Array<any>{
        if(this.arr.includes(x)){
            let target = this.arr.findIndex((value,index,arr)=>{
                return value === x
            })
            if(target<=0){
                return this.arr
            }else{
                [this.arr[target-1],this.arr[target]] = [this.arr[target],this.arr[target-1]]
                return this.arr
            }

        }else {
            return this.arr
        }
    }
    sortDown(x:any):Array<any>{
        if(this.arr.includes(x)){
            let target = this.arr.findIndex((value,index,arr)=>{
                return value === x
            })
            let len = this.arr.length
            if(target>=len-1){
                return this.arr
            }else{
                [this.arr[target],this.arr[target+1]] = [this.arr[target+1],this.arr[target]]
                return this.arr
            }
        }else {
            return this.arr
        }
    }
}

interface Params_statusSwitch {
    value_set:Array<any>|any,
    switch_key:Array<any>
    switch_status:any
    switchStatus(item:string,rules:Object):any
}

 class statusSwitch implements Params_statusSwitch {
    value_set:Array<any>|any;
    switch_key:Array<any>=[];
    switch_status:any=null;
    constructor(value_set:Array<any>|Object){
        this.value_set = value_set
    }
    checkIndex(val:any,arr:Array<any>){
        for(let i = 0; i < arr.length; i++){
            if(arr[i] = val){
                return i
            }
        }
    }
    switchStatus(item:any,rules:any){
        let change_item = item;
        this.switch_key = Object.keys(rules).reverse()
            let result:any = this.value_set
            for(let val of result){
                if(val instanceof Array){
                    console.log('数据格式不正确');
                }else{
                    let changeValue = val[change_item]
                    let keyValue = changeValue.toString()
                    let changeIndex = this.switch_key.findIndex((value,index,arr)=>{
                        return value === keyValue
                    })

                    let targetStatus = rules[changeIndex]
                    val[change_item] = targetStatus[changeValue]
                }
            }
            return result
        
        
    }
}