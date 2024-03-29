import { getVariableType } from "../utils/typeValidate";

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
    arr: Array<any>,
    sortUp(x: any): Array<any>,
    sortDown(x: any): Array<any>
}

export class ArrayCtrl implements Params_arryCtrl {
    arr: Array<any>;
    constructor(arr: Array<any>) {
        this.arr = [...arr];
        return this
    }
    sortUp(x: any): Array<any> {
        if (objectCheck(x,this.arr)!==-1) {
            let target = objectCheck(x,this.arr);
                [this.arr[target - 1], this.arr[target]] = [this.arr[target], this.arr[target - 1]]
                return this.arr
        } else {
            return this.arr
        }
    }
    sortDown(x: any): Array<any> {
        if (objectCheck(x,this.arr)!==-1) {
            let target = objectCheck(x,this.arr);
            let len = this.arr.length
            if (target >= len - 1) {
                return this.arr
            } else {
                [this.arr[target], this.arr[target + 1]] = [this.arr[target + 1], this.arr[target]]
                return this.arr
            }
        } else {
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
    value_set: Array<any> | any,
    switch_key: Array<any>
    switch_status: any
    data_transform(item: string, rules: Array<any>): any
}

export class statusSwitch implements Params_statusSwitch {
    value_set: Array<any> | any;
    switch_key: Array<any> = [];
    switch_status: any = null;
    constructor(value_set: Array<any> | any) {
        this.value_set = value_set
    }
    checkIndex(val: any, arr: Array<any>) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] = val) {
                return i
            }
        }
    }
    data_transform(item: any, rules: any) {
        let change_item = item;
        let rule_arr: Array<any> = [];
        rules.forEach((record: any, index: number) => {
            let key = Object.keys(record)[0];
            rule_arr.push(key)
        })
        this.switch_key = rule_arr
        let result: any = this.value_set
        for (let val of result) {
            if (val instanceof Array) {
                console.log('数据格式不正确');
            } else {
                let changeValue = val[change_item]
                let keyValue = changeValue.toString()
                let changeIndex = this.switch_key.findIndex((value, index, arr) => {
                    return value === keyValue
                })
                let targetStatus = rules[changeIndex]
                val[change_item] = targetStatus[changeValue]
            }
        }
        return result


    }
}
/*
函数名称: hasArray
功能:判断一个数组里是否嵌套了子数组，是则返回true。同时也可以传入第二个参数来返回由子数组索引组成的数组
用法：
    1、函数接收两个参数：
        param_1(Array):要进行判断的数组；
        param_2(Boolean):是否返回子数组索引组成的数组，如果只传一个参数，那么默认第二个参数为false
    2、当只传入数组时，只返回true or false来分别表示有\无子数组
    3、当传入两个参数并且第二个参数为true时，有子数组则返回子数组索引组成的数组，没有子数组则返回false
*/
export const hasArray = function (arr: Array<any>, getIndex: Boolean = false): Boolean | Array<number> {
    let judge_arr: Array<any> = arr
    let is_return_index: Boolean = getIndex
    let index_arr: Array<number> = []
    let has_arr: Boolean = false;
    Array.from(judge_arr).forEach((record, index: number) => {
        if (record instanceof Array) {
            console.log('ok')
            index_arr.push(index)
            has_arr = true
        }
    })
    if (is_return_index === true) {
        return index_arr
    } else {
        return has_arr
    }

}

/*
接口名称：inventObject
功能：    从一个由对象组成的数组中，将对象不同的属性值(非数学名)拼接成新的key:value对象返回
用法：    传入要处理的数组进行实例化，然后调用getNewObject方法，传入要进行拼接的两个属性名
方法说明： 
    getNewObject(key,value)
    作用:根据传入的key、value，去对象中查找对应的值，然后按照key:value的格式组成新的对象
    参数(params):
        1、key:String类型，要作为key:value中key的属性值的名称;
        2、value:String类型，要作为key:value中value值的属性值的名称;
    备注：若实例化的参数不是数组，而是一个对象，也可以进行属性拼接，但返回的对象只包含一个key:value
    例子：
        let arr = [
            {id:1,type:'apple',isFruit:true},
            {id:2,type:'beef',isFruit:false},
            {id:3,type:'peer',isFruit:true}
        ]
        //假设我们要用id的值和type的值拼接成一个对象
        let demo = new inventObject(arr);
        result = demo.getNewObjec('id','type')
        console.log(result)
        //打印结果是{1:'apple',2:'beef',3:'peer'}
*/
interface Param_inventObject {
    obj_arr: Array<any>,
    obj: any,
    getNewObject(key: any, value: any): Object
}

export class inventObject implements Param_inventObject {
    obj_arr: Array<any>;
    obj: any;
    isArray: Boolean
    constructor(param: any | Array<any>) {
        if (param instanceof Array) {
            this.obj_arr = param
            this.isArray = true
        } else {
            this.obj_arr = []
            this.obj = param;
            this.isArray = false
        }
    };
    getNewObject(key: string, value: string): Object {
        let new_obj: any = {};
        if (this.isArray === true) {
            Array.from(this.obj_arr).forEach(record => {
                let target_key: string = record[key].toString();
                let target_value: any = record[value];
                new_obj[target_key] = target_value
            })
        } else {
            let target_key: string = this.obj[key].toString();
            let target_value: any = this.obj[value];
            new_obj[target_key] = target_value
        }

        return new_obj
    }
}

/*
函数名称: differArray
功能:对比两个数组A和B，将所有只存在A而不存在B的元素抽离出来，组成一个数组返回。
用法：
    1、函数接收两个参数：
        param_1(Array):要进行对比的数组；
        param_2(Array):要进行对比的数组；
    2、返回值:
        result(Array):只存在param_1而不存在param_2的元素所组成的数组
    
*/

export const differArray = function (arr1: Array<any>, arr2: Array<any>): Array<any> {
    let result: Array<any> = [];
    arr1.forEach(record => {
        if(objectCheck(record,arr2)=== -1){
            result.push(record)
        }else{
            return
        }
    })
    return result
}

export const countDown = function (val: number, func: Function, delay?: number): any {
    return (val > 0) ? setTimeout(() => countDown(val - 1, func), delay) : func()
}

/**
 * 功能：判断某个对象是否在数组中，并返回该对象在数组中的索引
 * 参数：
 * @param {object} obj:要判断的对象
 * @param {Array} arr:作为判断的数组
 * @returns {number} 该对象在数组中的索引  -1 =》 该对象不在数组中
 */
export const objectCheck = (obj: any, arr: Array<any>): number => {
    let index: number = -1;
    let indexArr:Array<number> = [];
    if (arr instanceof Array) {
        if (arr.length < 0) { return -1 }
        arr.forEach((record,idx )=> {
            if(objectEqual(record,obj) === true){
                indexArr.push(idx)
            }
        })
        if(indexArr.length<1){
            return -1
        }
        return indexArr[0]
    } else {
        return -1
    }
    return index
}



/**
 * 功能：判断对象相等
 * 参数：
 * @param {object} x:对象1
 * @param {object} y:对象2
 * @returns {boolean}
 * @update 2020/09/29 更新为对不同类型分别递归判断
 */
export const objectEqual = (x: any, y: any): boolean => {
    let f1: boolean = x instanceof Object;
    let f2: boolean = y instanceof Object;
    if (!f1 || !f2) {
        return x === y
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false
    }
    const keys: Array<string> = Object.keys(x);
    const keysNums = keys.length;
    for(let i=0;i<keysNums;i++){
        const commonKey:string = keys[i];
        // 先判断y对象是否同样包含一样的key
        if(Object.keys(y).includes(commonKey)===false){
            return false
        }
        // 判断当前遍历的属性在两个对象中是否类型一致
        const typeEqual:boolean = getVariableType(x[commonKey])===getVariableType(y[commonKey]);
        if(!typeEqual){
            return typeEqual
        }
        // 如果该属性为对象，则开始递归
        if(getVariableType(x[commonKey])==="[object Object]"){
            const equal = objectEqual(x[commonKey],y[commonKey]);
            if(!equal){
                return equal
            }
        }
        // 如果该属性是数组，则先比较长度，再遍历数组元素继续比较
        if(getVariableType(x[commonKey])==="[object Array]"){
            const lenEqual:boolean = x[commonKey].length === y[commonKey].length;
            if(!lenEqual){
                return lenEqual
            };
            const l:number = x[commonKey].length;
            for(let k=0;k<l;k++){
                const equal:boolean = objectEqual(x[commonKey][k],y[commonKey][k]);
                if(!equal){
                    return equal
                }
            }
        }
    }
    return true;
    
}

/**
 * 功能：根据一组数组对象中的某一可排序字段进行排序
 * @param arr:要进行操作的数组
 * @param target:作为排序条件的属性
 * @param sort:排序的顺序 up => 升序 | down => 降序
 * @returns {array}
 */
 type sortConfig = 'up' |'down'
 export const sortObject = <T extends any[]>(arr:T,target:string,sort:sortConfig):T => {
     let result:T;
     const targetArr:Array<any> = [...arr];
     //判断是否数组
     if(targetArr instanceof Array){
         //判断数组是否为空
         if(targetArr.length < 1){
             console.error('数组为空！');
             result = arr;
         }else{
             //判断数组中每一项是否对象
             const isObj:boolean = targetArr.every(v => v instanceof Object);
             //判断传入的属性是否在数组的每个对象中，且为可排序类型
             const isRealKey:boolean = targetArr.every( v => {
                 const keysArr:Array<string> = Object.keys(v);
                 return keysArr.includes(target);
             });
             if(isObj&&isRealKey){
                 const len:number = targetArr.length;
                 for(let i=0;i<len-1;i++){
                     if (sort === 'up') {
                         let min:number = i;
                         for(let j:number = i+1;j<len;j++){
                             if(targetArr[j][target] < targetArr[min][target] ){
                                 min = j;
                             }
                             [targetArr[i],targetArr[min]] = [targetArr[min],targetArr[i]];
                         }
                     } else {
                         let max:number = i;
                         for(let j:number = i+1; j < len; j++) {
                            if(targetArr[j][target] > targetArr[max][target] ){
                                max = j;
                            }
                            [targetArr[i],targetArr[max]] = [targetArr[max],targetArr[i]];
                         }
                     }
                 }
                 result = [...targetArr] as T;
             }else{
                 console.error('传入的目标属性无法在每个对象中找到');
                 result = arr;
             }
         }
     }else{
         result = arr;
     }
     return result;
  };
 

 /**
  * 只对对象数组中指定的key值进行深拷贝
  * @param {Object} obj:目标对象
  * @param {Array} target :要指定的key值组成的数组
  * @returns {Object} 
  */
 export const deepKeyCopy = <T>(obj:any,target:string[]):T => {
     if(typeof(obj) === 'string'){
         throw `can not deal with string`
     }
     let result:any = [];
     Array.from(obj).forEach((record:any,index)=>{
         let emptyObj:any = {}
         for(let key in record){
             if(target.includes(key)){
                 emptyObj[key] = record[key]
             }
         };
         result.push(emptyObj)
     })
     return result
}

/**
 * 嵌套对象降维成对象数组
 * 如将a:{b:{d:'11'},c{e:{f:'22'}}}转化为[{'a.b.d':'11'},{'a.c.e.f':'22'}]
 * @param pre 父级对象的前缀
 * @param obj 当前要降维的对象
 * @returns {Array}
 */
export const ObjectReduce = (pre:string,obj:any):Array<string> => {
    let result:string[] = [];
    for(let key in obj){
        if(obj[key] instanceof Object){
           let current:string = pre + `.${key}`;
           for(let i of ObjectReduce(current,obj[key])){
               result.push(i)
           }
        }else{
            let current:string = (pre+ `.${key}`).substr(1);
            let data = {} as any;
            data[current] = obj[key];
            result.push(data)
        }
    }
    
    return result
}