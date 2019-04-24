interface Params {
    arr:Array<any>,
    // func(a:any,b:any,arr):Array<any>,
    sortUp(x:any):Array<any>,
    sortDown(x:any):Array<any>
}

class ArrayCtrl implements Params{
    arr:Array<any>;
    constructor (arr:Array<any>){
        this.arr = arr
    }

    func(a:any,b:any,arr):Array<any>{

        return
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