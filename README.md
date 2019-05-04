# self-utils-for-ts
工作开发中用到的函数，整理成库

## 目录
* [数组元素位置升降](#数组元素位置升降)
* [接口数据便捷转换](#接口数据便捷转换)



### 数组元素位置升降
> 主要用于控制数组内，某个元素上升一位或下降一位，同时进行了边界监测，第一个和最后一个元素都无法升/降。
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {ArrayCtrl} from "./arrayCtrl.js"
  
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


### 接口数据便捷转换
> 主要用于平时转换后端请求回来的数据内容，比如将状态值为 **'0'**、 **'1'** 等属性值根据规则自动转换为`true`和`false`，当然，只要有规则，就能实现更多的转换，免去了自己遍历数据做判断。
- 用法：
```javascript
//导入arrayCtrl.js文件
import {statusSwitch} from './arrayCtrl.js'

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
