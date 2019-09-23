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
    // func(a:any,b:any,arr):Array<any>,
    sortUp(x: any): Array<any>,
    sortDown(x: any): Array<any>
}

export class ArrayCtrl implements Params_arryCtrl {
    arr: Array<any>;
    constructor(arr: Array<any>) {
        this.arr = arr
    }
    sortUp(x: any): Array<any> {
        if (this.arr.includes(x)) {
            let target = this.arr.findIndex((value, index, arr) => {
                return value === x
            })
            if (target <= 0) {
                return this.arr
            } else {
                [this.arr[target - 1], this.arr[target]] = [this.arr[target], this.arr[target - 1]]
                return this.arr
            }

        } else {
            return this.arr
        }
    }
    sortDown(x: any): Array<any> {
        if (this.arr.includes(x)) {
            let target = this.arr.findIndex((value, index, arr) => {
                return value === x
            })
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
        }else{
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

export const differArray = function(arr1:Array<any>,arr2:Array<any>):Array<any>{
    let result_arr:Array<any> = [];
    let result:Array<any> = [];
    let target_arr_A:Array<any> = arr1.map(val=>(JSON.stringify(val)));
    let target_arr_B:Array<any> = arr2.map(val=>(JSON.stringify(val)));
    Array.from(target_arr_A).forEach(record=>{
        if(target_arr_B.includes(record)){
            return
        }else{
            result_arr.push(record)
        }
    })
    result = result_arr.map(val=>(JSON.parse(val)))
    return result
}

export const countDown = function(val:number,func:Function,delay?:number):any{
    return (val>0)?setTimeout(()=>countDown(val-1,func),delay):func()
}

/**
 * 类名称：节点生成器
 * 功能：创建一个包含key：value的节点并返回
 * 用法：接受一个（key：vakue）的对象作为参数，返回该节点
 * 可用方法：
 *   xxx.key：返回该节点的key
 */
interface node {
    target:any,
    pre:any,
    next:any
}
class Node implements node {
    target:any
    pre:any = null
    next:any = null
    constructor(obj:any){
        this.target = obj;
        this.val()
    }
    val(){
        return this.target
    }
}

/**
 * 接口名称：双向链表生成器
 */
interface doubleLink {
    head:any //头部节点引用
    tail:any //尾部节点饮用
    size:number //节点的个数
    addOnHead(node:any):any
    addOnTail(node:any):any
    deleteOnHead():any
    deleteOnTail():any
}

/**
 * 双向链表
 * 功能：
 * 1、头部增加节点
 * 2、尾部增加节点
 * 3、头部删除节点(弹出头部节点)
 * 4、尾部删除节点(弹出尾部节点)
 * 5、判断节点是否在链表中
 * 6、删除指定的节点
 * 7、在指定节点的前或后增加节点
 * 8、获取链表的节点个数
 * 9、打印所有节点
 */
class DoubleLinkList implements doubleLink {
    head:any
    tail:any
    size:number = 0

    constructor(){
        this.head = null;
        this.tail = null
    }
    //向头部增加节点
    addOnHead(node:any){
        let _node:node = new Node(node);
        if(this.size === 0){
            this.head = _node;
            this.tail = _node;
            this.size += 1
        }else{
            let old_head:node = this.head;
            this.head = _node;
            this.tail = old_head;
            _node.next = this.tail;
            old_head.pre = _node;
            this.size += 1
        }
    }
    //向尾部增加节点
    addOnTail(node:any){
        let _node:node = new Node(node);
        if(this.size === 0 ){
            this.head = _node;
            this.tail = _node;
            this.size += 1
        }else{
            let old_tail:node = this.tail;
            this.tail = _node;
            _node.pre = old_tail;
            old_tail.next = _node;
            this.size += 1
        }
    }
    //头部删除节点
    deleteOnHead(){
        if(this.size === 0){
            console.error('No Node In DoubleLinkList!')
            return
        }
        if(this.size < 2){
            let currentNode:node = this.head;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode
        }
        if(this.size >= 2){
            let old_head:node = this.head;
            let new_head:node = old_head.next;
            if(this.size === 2){
                this.size = 0;
                this.addOnHead(new_head)
            }else{
                this.head = new_head;
                new_head.pre = null;
                this.size = this.size - 1;
            }
            return new_head
        }
    }
    //尾部删除节点
    deleteOnTail(){
        if(this.size === 0){
            console.error('No Node In DoubleLinkList!')
            return
        }
        if(this.size < 2){
            let currentNode:node = this.tail;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode
        }
        if(this.size >= 2){
            let old_tail:node = this.tail;
            let new_tail:node = old_tail.pre;
            if(this.size === 2){
                this.size = 0;
                this.addOnTail(new_tail);
            }else{
                this.tail = new_tail;
                new_tail.next = null;
                this.size = this.size - 1
            }
            return new_tail
        }
    }
    //判断节点是否在链表中
    getNode(val:any){
        let _node:node = new Node(val)
        let currentNode:node = this.head;
        if(this.size === 0 ){
            return false
        }else{
            let length:number = this.size;
            let c:string = JSON.stringify(currentNode.target);
            let n:string = JSON.stringify(_node.target);
            while(c != n){
                if(length > 1){
                    currentNode = currentNode.next;
                    c = JSON.stringify(currentNode.target);
                    length = length - 1
                }else{
                    return false
                }
            }
            return true
        }
    }

    //删除指定的节点
    removeNode(val:any){
        let _node:node = new Node(val)
        let judgeNode:boolean = this.getNode(val);
        if(judgeNode===false){
            console.error('No This Node In DoubleLinkList!');
            return 
        }
        if(this.size===1){
            if(this.head.target === _node.target){
                this.head = null;
            }
            if(this.tail.target === _node.target){
                this.tail = null
            }
            this.size = 0
        }else{
            let currentNode = this.head;
            let c:string = JSON.stringify(currentNode.target)
            let n:string = JSON.stringify(_node.target)
            while(c!=n){
                currentNode = currentNode.next;
                c = JSON.stringify(currentNode.target)
            };
            let preNode:node = currentNode.pre===null?null:currentNode.pre;
            let nextNode:node = currentNode.next===null?null:currentNode.next;
            if(preNode === null){
                this.deleteOnHead()
            }
            if(nextNode === null){
                this.deleteOnTail()
            }
            if(preNode!==null&&nextNode!==null){
                preNode.next = nextNode;
                nextNode.pre = preNode
            }
        }
    }

    /**
     * 
     * @param val 要插入的节点
     * @param ele 被插入的节点
     * @param type 插入的位置：next or pre
     */
    insertNode(val:any,ele:any,type:string){
        if(!this.getNode(ele)){
            console.error(`Can Not Find Node ${ele}`);
            return
        }
        let _node:node = new Node(val);
        let _ele:node = new Node(ele);
        let currentNode:node = this.head;
        let c:string = JSON.stringify(currentNode.target);
        let e:string = JSON.stringify(_ele.target);
        while(c!== e){
            currentNode = currentNode.next;
            c = JSON.stringify(currentNode.target)
        }
        _ele = currentNode;
        if(type==='next'){
            if(_ele.next === null){
                this.addOnTail(_node.target);
                return
            }
            let nextNode:node = _ele.next;
            let nextNextNode:node = nextNode.next;
            _node.pre = nextNode;
            _node.next = nextNextNode;
            nextNode.next = _node;
            nextNextNode.pre = _node;
        }
        if(type==='pre'){
            if(_ele.pre === null){
                this.addOnHead(_node.target);
                return
            }
            let preNode:node = _ele.pre;
            let prePreNode:node = preNode.pre;
            _node.pre = prePreNode;
            _node.next = preNode;
            prePreNode.next = _node;
            preNode.pre = _node
        }
        return _node
    }

    //获取链表的节点个数
    countNodes(){
        return this.size
    }

    //打印所有节点
    getAllNode(){
        let str:string = '';
        let currentNode:node = this.head;
        if(currentNode === null) return
        while(currentNode.next!==null){
            str = str + JSON.stringify(currentNode.target);
            currentNode = currentNode.next
        }
        str = str + JSON.stringify(this.tail.target)
        console.log(str)
    }
}