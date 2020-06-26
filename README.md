# self-utils-for-ts
工作开发中用到的函数，整理成库

## 目录
### 一、数组\对象相关工具方法：
* [1.数组元素位置升降](#数组元素位置升降)
* [2.接口数据便捷转换](#接口数据便捷转换)
* [3.判断数组内是否嵌套数组](#判断数组内是否嵌套数组)
* [4.拼接新对象](#拼接新对象)
* [5.数组的差集](#数组的差集)
* [6.查找对象在数组中的位置](#查找对象在数组中的位置)
* [7.对象比较](#对象比较)
* [8.对象数组深拷贝](#对象数组深拷贝)
* [9.嵌套对象降维](#嵌套对象降维)

### 二、数据结构相关工具方法：
* [1.双向链表](#双向链表)
* [2.栈](#栈)
* [3.队列](#队列)



### 数组元素位置升降
> 主要用于控制数组内，某个元素上升一位或下降一位，同时进行了边界监测，第一个和最后一个元素都无法升/降。
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {ArrayCtrl} from "./ArrayCtrl"
  
  let arr = ['boy','man',2,4,6,{name:'mike'}] ;//假设有这样一组数组
  let switch_arr = new ArrayCtrl(arr);//将数组作为参数生成新的实例
  
  console.log(switch_arr.sortUp(2)); //把2上升一位，会返回位置变换后的数组
  //['boy',2,'man',4,6,{name:'mike'}]
  
  console.log(switch_arr.sortDown(6)) ;//把6下降一位，会返回位置变换后的数组
  //['boy',2,'man',4,{name:'mike'},6]
```
- 说明:  
将数组传入`ArrayCtrl`得到实例后，提供如下用法：

|方法名|接收参数|返回结果|
|---|---|---|
|sortUp|数组内的元素|交换位置后的数组|
|sortDown|数组内的元素|交换位置后的数组|

----

### 接口数据便捷转换
> 主要用于平时转换后端请求回来的数据内容，比如将状态值为 **'0'**、 **'1'** 等属性值根据规则自动转换为`true`和`false`，当然，只要有规则，就能实现更多的转换，免去了自己遍历数据做判断。
- 用法：
```javascript
//导入arrayCtrl.js文件
import {statusSwitch} from "./ArrayCtrl"

//假设后端传来的数据如下，对于一些状态是用0,1,2之类表示，前端需要根据规则渲染成对应数据
let msg = [
    {
        isenable:'1',
        type:'2',
        durantions:'0',
        taskId:'123123asda23',
        audiosrc:'2'
    },
    {
        isenable:'0',
        type:'1',
        durantions:'0',
        taskId:'123123asda23',
        audiosrc:'3'
    },
    {
        isenable:'1',
        type:'0',
        durantions:'0',
        taskId:'123123asda23',
        audiosrc:'1'
    },
    {
        isenable:'0',
        type:'2',
        durantions:'0',
        taskId:'123123asda23',
        audiosrc:'4'
    },
]
let change = new statusSwitch(message) //首先将该数组传入工具类里实例化
let rules = [{'0':'file'},{'1':'terminal'},{'2':'volunm'}] //编写一个规则，格式如rules所示，用数组函括多个键值对

change.data_transform('type',rules) //调用实例中的data_transform()方法，传入要转换的属性名和规则，如'type'和rules

change.data_transform('audiosrc',[{'1':'文件'},{'2':'终端'},{'3':'声卡'},{'4':'语音合成'}])//表示将'audiosrc'属性按规则转换成'文件'、'终端'等类型

let switch_one = change.data_transform('isenable',[{'1':true},{"0":false}]);

console.log(switch_one)
//打印结果:
[ { isenable: true,
    type: 'volunm',
    durantions: '0',
    taskId: '123123asda23',
    audiosrc: '终端' },
  { isenable: false,
    type: 'terminal',
    durantions: '0',
    taskId: '123123asda23',
    audiosrc: '声卡' },
  { isenable: true,
    type: 'file',
    durantions: '0',
    taskId: '123123asda23',
    audiosrc: '文件' },
  { isenable: false,
    type: 'volunm',
    durantions: '0',
    taskId: '123123asda23',
    audiosrc: '语音合成' } ]

```

- 说明:  
将数组传入`statusSwitch`得到实例后，提供如下用法：

|方法名|接收参数|返回结果|
|---|---|---|
|data_transform|属性(String),规则(Object)|完成转换后的数组|
#### 注意：规则的格式为：[{key:value},{key2:value2}...]，其中键值对里key的表示的是对应的状态码或其他数据,value表示要转换成的最终值，可以根据需要在数组里添加多个键值对。
----


### 判断数组内是否嵌套数组
> 用于判断数组内，是否含有另外的数组，返回一个布尔值或包含该嵌套数组在数组内的索引组成的数组
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {hasArray} from from "./ArrayCtrl"
  
  let arr = [['boy','man'],2,[4],6,{name:'mike'}] ;//假设有这样一组数组
  let judgeArr = hasArray(arr);//将数组作为参数传入
  
  let getIndex = hasArray(arr,true);
  //将数组作为参数传入,并且第二个参数设为true，表示返回如果含有子数组，就返回所有子数组的索引组成的数组
  
  console.log(judgeArr); 
  //true
  
  console.log(getIndex) ;//返回一个数组，里面是所有子数组在数组中的索引
  //[0,2]
```
- 说明:  
hasArray函数接受两个参数，第一个为要判断的数组，第二个为是否返回索引值，其中第二个参数若不传，则默认为false:

|方法名|接收参数|返回结果|
|---|---|---|
|hasArray|arr(数组),isGetIndex(布尔值，默认为false)|若只传数组，则返回布尔值，若传入数组与true，则返回一个数组|

----
### 拼接新对象
> 主要用在从后端传来的数据中，把指定的两个对象属性值抽离出来组成新的对象，常用于需要对后端数据建立映射的场景
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {inventObject } from "./ArrayCtrl"
  
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
```

- 说明:  
将数组传入`inventObject`得到实例后，提供如下用法：

|方法名|接收参数|返回结果|
|---|---|---|
|getNewObject|1.key:类型为string，要作为key:value中key的属性值的名称;<br>2.value:类型为string，要作为key:value中value值的属性值的名称;|已拼接好的新对象|


----

### 数组的差集
> 对比两个数组A和B，将所有只存在A而不存在B的元素抽离出来，组成一个数组返回。
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {differArray } from "./ArrayCtrl"
  
  let arr_A = [
      {id:1,type:'apple',isFruit:true},
      {id:4,type:'banana',isFruit:false},
      {id:3,type:'peer',isFruit:true}
   ]
   let arr_B = [
      {id:1,type:'apple',isFruit:true},
      {id:5,type:'orange',isFruit:false},
      {id:3,type:'peer',isFruit:true}
   ]
     //假设我们要用取两个数组中的不同项
   result = differArray(arr_A,arr_B)
   console.log(result)
        //打印结果是:
        //[{id:4,type:'banana',isFruit:false},{id:5,type:'orange',isFruit:false},]
```

- 说明:  
将要做对比的两个数组作为参数传入`differArray()`中：

|方法名|接收参数|返回结果|
|---|---|---|
|differArray|param_1(Array):作为对比基准的数组<br>param_2(Array):用于作为对照的数组|只存在param_1而不存在param_2的元素所组成的数组|


----

### 查找对象在数组中的位置
> 查找一个对象是否在数组中，并返回对应的索引
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {objectCheck } from "./ArrayCtrl"
  
  let arr = [
      {id:1,type:'apple',isFruit:true},
      {id:4,type:'banana',isFruit:false},
      {id:3,type:'peer',isFruit:true}
   ]
   let obj = {id:4,type:'banana',isFruit:false};
   let obj2 = {id:5,type:'durian',isFruit:false};

     //假设我们要查找obj在arr中的索引
   result = objectCheck(obj,arr)
   console.log(result)
        //打印结果是:
        //1(即obj确实在arr中，并且对应的索引为1)

    //假设我们要查找一个不存在arr中的对象obj2
    result2 = objecrCheck(obj2,arr)
    console.log(result2)
    //打印结果是：
    //-1 （即obj2不在arr中）
```

- 说明:  
将要判断的对象作为首参数，用作判断参照的数组作为第二参数传入`objectCheck()`中：

|方法名|接收参数|返回结果|
|---|---|---|
|objectCheck|param_1(Object):要查找的对象<br>param_2(Array):用作查找的数组|若对象存在，则返回索引，否则返回-1|



----
### 对象比较
> 对比两个对象的key和value是否相等（非内存地址比较）
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import { objectEqual } from "./ArrayCtrl"
  
  let obj1 = {name:'a',len:5,test:test(){return false}};
  let obj2 = {name:'b',check:false}
  let obj3 = {name:'a',len:5,test:test(){return false}};

  let result1 = objectEqual(obj1,obj2);
  console.log(result1)
  //打印结果:
  //false
  let result2 = objectEqual(obj1,obj3;
  console.log(result2)
  //打印结果:
  //true
  
```

- 说明:  
将要判断的两个对象作为参数传入`objectEqual()`中：

|方法名|接收参数|返回结果|
|---|---|---|
|objectEqual|param_1(Object):比较的对象<br>param_2(Object):比较的对象|若相等则返回true，否则返回false|



----

### 对象数组深拷贝
> 对一个对象数组中指定的key和其相应的value进行深拷贝，形成新的对象数组
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import { deepKeyCopy } from "./ArrayCtrl"
  
  let obj1 = [
        {name:'a',len:5,date:'2020.xx.xx',speed:23},
        {name:'b',len:6,date:'2021.xx.xx',speed:24},
    ];
  let obj2 = deepKeyCopy(obj1,['name','date']);
  console.log(obj2)

  //打印结果:
  //[{name:'a',date:'2020.xx.xx'},{name:'b',date:'2021.xx.xx'}]
  
```

- 说明:  
将要进行深拷贝的对象和目标属性组成的数组传入`deepKeyCopy()`中：

|方法名|接收参数|返回结果|
|---|---|---|
|deepKeyCopy|param_1(Object):要进行深拷贝的的对象<br>param_2(string[]):指定的key组成的数组|若key值存在，则返回相应对象数组，否则返回空数组|



----

### 嵌套对象降维
> 将一个深层嵌套的对象降维，并返回以一个对象数组，里面包含了对象的所有值和对应的层级组成的健
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import { ObjectReduce } from "./ArrayCtrl"
  
  let obj = {
            route:{
                'lightings':'路灯',
                'device':'设备'
            },
            audio:{
                mission:{
                    time:'时间',
                    trigger:'触发器',
                    tip:{
                        warning:'警告'
                    }
                }
            },
            device:{
                batchControl:{
                    nb:{
                        title:'传感器',
                        error:{
                            1:'日期错误',
                            2:'格式错误'
                        }
                    }
                }
            }
        }
        let arr = ObjectReduce('',obj);
        console.log(arr)

  //打印结果:
  //[
  //  {route.lightings: "智慧路灯"},
  //  {route.device: "设备管理"},
  //  {audio.mission.time: "时间"},
  //  {audio.mission.trigger: "触发器"},
  //  {audio.mission.tip.warning: "警告"},
  //  {device.batchControl.nb.title: "传感器"},
  //  {device.batchControl.nb.error.1: "日期错误"},
  //  {device.batchControl.nb.error.2: "格式错误"}
  // ]  
```

- 说明:  
将要进行降维的对象传入`deepKeyCopy()`中，：

|方法名|接收参数|返回结果|
|---|---|---|
|ObjectReduce|param_1(string):父级对象的键名称<br>param_2(Object):要进行降维的目标对象|返回一个对象数组，如示例所示|



----

### 双向链表
> 用于建立双向链表，提供了头、尾部增加节点，头、尾部删除节点，在指定位置插入节点等方法
- 用法：
```javascript
import DoubleLinkList from "./ArrayCtrl"

let doubleLink = new DoubleLinkList()
doubleLink.addOnHead({a:1}) //向链表头部添加{a:1}节点
doubleLink.getAllNode() //打印所有节点
doubleLink.addOnHead({b:2}) //向头部继续添加{b:2}节点
doubleLink.addOnTail({c:3}) //向尾部添加{c:3}节点
doubleLink.getAllNode() //打印所有节点
doubleLink.deleteOnHead() //删除头部节点
doubleLink.getAllNode() //打印所有节点
doubleLink.addOnHead({b:2})//向头部继续添加{b:2}节点
doubleLink.getAllNode() //打印所有节点
doubleLink.deleteOnTail() //删除尾部节点
doubleLink.getAllNode() //打印所有节点
doubleLink.getNode({b:2}) //判断是否存在该节点
doubleLink.removeNode({b:2}) //删除指定节点
doubleLink.getAllNode() //打印所有节点
doubleLink.insertNode({d:4},{a:1},'next') //把{d:4}节点添加到{a:1}节点末尾
doubleLink.addOnTail({c:3}) //向尾部添加{c:3}节点
doubleLink.getAllNode() //打印所有节点
doubleLink.reverseAll() //反转整个链表
doubleLink.getAllNode()

//打印结果
//{"a":1}
//{"b":2}{"a":1}{"c":3}
//{"a":1}{"c":3}
//{"b":2}{"a":1}{"c":3}
//{"b":2}{"a":1}
//true
//{"a":1}
//{"a":1}{"d":4}
//{"a":1}{"d":4}{c:3}
//{"c":3}{"d":4}{"a":1}
```
- 说明:  
创建DoubleLinkList实例后，提供如下方法：

|方法名|接收参数|作用/返回|
|---|---|---|
|addOnHead|任意对象节点|向头部添加节点，无返回|
|addOnTail|任意对象节点|向尾部添加节点，无返回|
|deleteOnHead|无|返回被删除的头部节点|
|deleteOnTail|无|返回被删除的尾部节点|
|getNode|任意对象节点|布尔值|
|removeNode|指定的对象节点|删除指定的节点，无返回|
|insertNode|1:插入的节点，2：被插入的节点，3：指针位置('next'/'pre')|无|
|getAllNode|无|无，打印所有节点的内容|
|countNode|无|返回当前链表节点数量|
|reverseAll|无|反转整个链表，无返回|

### 备注：每个返回的链表节点都具有`next`和`pre`指针，同时doubleLinkList实例具有`head`和`tail`属性，可供调用查看当前链表中的头部和尾部。

----

### 栈
> 用于创建一个栈结构(非原生js数组结构实现)，支持进栈、出栈方法，具有栈结构的的LIFO（后进先出）特性
- 用法：
```javascript
import Stack from "./ArrayCtrl"

let stackArr = new Stack();
stackArr.push({name:'aaa'}) //推入一个对象进栈
console.log(stackArr.getAll()) //以数组形式按顺序打印栈内元素
stackArr.push(4)  //推入一个整数进栈
stackArr.push('bbb'); //推入一个字符串进栈
console.log(stackArr.getAll()) 
stackArr.pop();  //弹出栈顶的元素
console.log(stackArr.getAll())

//打印结果
//[{name:'aaa'}]
//['bbb',4,{name:'aaa'}]
//[4,{name:'aaa'}]

```
- 说明:  
创建Stack实例后，提供如下方法：

|方法名|接收参数|作用/返回|
|---|---|---|
|push|任意内容|向栈内推入一个元素，返回该元素在栈中的元素数量|
|pop|无|弹出栈顶的元素，若栈内为空，返回null，否则返回该元素|
|clear|无|清空栈内所有元素|
|getAll|无|以数组形式按顺序返回栈内所有元素|
----

### 队列
> 用于创建一个队列结构(非原生js数组结构实现)，支持进列、出列方法，具有栈结构的的FIFO（先进先出）特性
- 用法：
```javascript
import {Queue} from "./ArrayCtrl"

const a = ()=>{
  let str = `hello world`;
  return str
}
let queueTest = new Queue();
queueTest.push({a:1});
queueTest.getAll(); //第一次打印
queueTest.push(a);
queueTest.getAll(); //第二次打印
const b = queueTest.pop();
const c = queueTest.pop();
queueTest.clear();
queueTest.getAll()
console.log('b',b) //第三次打印
console.log('c',c()) //第四次打印

//打印结果
//{"a":1}  第一次打印
//()=>{
//            let str = `hello world`;
//            return str
//        }{"a":1}   第二次打印
//b {a: 1}  第三次打印
//c hello world  第四次打印

```
- 说明:  
创建Queue实例后，提供如下方法：

|方法名|接收参数|作用/返回|
|---|---|---|
|push|任意内容|向队列内推入一个元素，无返回|
|pop|无|推出队列最近入列的元素，若队列内为空，返回null，否则返回该元素|
|clear|无|清空队列内所有元素|
|getAll|无|按顺序打印队列内所有元素|

