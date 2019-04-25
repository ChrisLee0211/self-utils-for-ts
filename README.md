# self-utils-for-ts
工作开发中用到的函数，整理成库

## 目录
* [数组元素位置升降](#数组元素位置升降)



### 数组元素位置升降
> 主要用于控制数组内，某个元素上升一位或下降一位，同时进行了边界监测，第一个和最后一个元素都无法升/降。
- 用法：
```javascript
  //导入arrayCtrl.js文件
  import {ArrayCtrl} from "./arrayCtrl.js"
  
  let arr = ['boy','man',2,4,6,{name:'mike'}] //假设有这样一组数组
  let switch_arr = new ArrayCtrl(arr)//将数组作为参数生成新的实例
  
  console.log(switch_arr.sortUp(2)) //把2上升一位，会返回位置变换后的数组
  //['boy',2,'man',4,6,{name:'mike'}]
  
  console.log(switch_arr.sortDown(6)) //把6下降一位，会返回位置变换后的数组
  //['boy',2,'man',4,{name:'mike'},6]
```
- 方法:  
将数组传入`ArrayCtrl`得到实例后，提供一下用法：

|方法名|接收参数|返回结果|
|---|---|---|
|sortUp|数组内的元素|交换位置后的数组|
|sortDown|数组内的元素|交换位置后的数组|
