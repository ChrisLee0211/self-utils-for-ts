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
export interface Params_arryCtrl {
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
/*
接口名称：statusSwitch
功能：    根据自定义规则转换指定对象中的指定属性值
用法：    传入要对象数组作为参数到statusSwitch中生成实例，然后用实例调用相应的方法实现对象的转换
方法说明： 
    data_transform(item,rules)
    作用:根据rules设定的规则，转换每个对象中的item对应值
    参数(params):
        1、item:String类型，要转换的对象中的某一个属性名称;
        2、rules:Array类型，可以将多个判断规则放进数组中，如[{'1':true},{'2':false},{'3':'无数据'}],表示item等于不同值时，转换为对应的内容，如为'1'时，转换为true
    返回(return):转换完成后的对象数组
*/ 

interface Params_statusSwitch {
    value_set:Array<any>|any,
    switch_key:Array<any>
    switch_status:any
    data_transform(item:string,rules:Object):any
}

export class statusSwitch implements Params_statusSwitch {
    value_set:Array<any>|any;
    switch_key:Array<any>=[];
    switch_status:any=null;
    constructor(value_set:Array<any>|any){
        this.value_set = value_set
    }
    checkIndex(val:any,arr:Array<any>){
        for(let i = 0; i < arr.length; i++){
            if(arr[i] = val){
                return i
            }
        }
    }
    data_transform(item:any,rules:any){
        let change_item = item;
        let rule_arr:Array<any> = [];
        rules.forEach((record:any,index:number )=> {
            let key = Object.keys(record)[0];
            rule_arr.push(key)
        })
        this.switch_key = rule_arr
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