enum PromiseStatus {
    FULFILLED="FULFILLED",
    PENDING="PENDING",
    REJECTED="REJECTED"
}

type Executor = (resolve:(val:any)=>void,reject:(res:any)=>void)=>void

export default class MyPromise {
    private status:keyof typeof PromiseStatus = PromiseStatus["PENDING"];
    private value:any;
    private reason:any;
    private resolveCbs:Function[] = [];
    private rejectCbs:Function[] = [];
    constructor(executor:Executor){
        if(typeof executor !== "function"){
            throw new Error(`Promise constructor needs a function as param`)
        }
        executor(this._resolve,this._reject)
    }

    private _resolve(val:any){
        this.status = PromiseStatus["FULFILLED"];
        this.value = val;
        while(this.resolveCbs.length>0){
            const fn = this.resolveCbs.pop() as Function;
            fn()
        }
    }

    private _reject(res:any){
        this.status = PromiseStatus["REJECTED"];
        this.reason = res;
        while(this.rejectCbs.length>0){
            const fn = this.rejectCbs.shift() as Function;
            fn()
        }
    }

    public then(onFulfillFn:any){
        let self = this
        return new MyPromise((resolve,reject)=>{
            //如果then中的没有传参，那就跳过本次then，把value传给下一个promise保存起来用
            if(!onFulfillFn){
                resolve(self.value);
                return 
            }
            // 如果then在注册的时候promise中的异步逻辑其实还没走完，整个promise还是pending状态
            // 那么就可以把then的回调注册到promise的resolve队列中供执行
            if(self.status === "PENDING"){
                self.resolveCbs.push(onFulfillFn);
                return
            }
            // 否则就说明then注册前已经走完了promise中的逻辑，then错过了执行回调的时机
            // 此时应该在then内部自动执行掉,并把返回值传给下一个promise
            const result = onFulfillFn(self.value);
            resolve(result)
        })
    }
}