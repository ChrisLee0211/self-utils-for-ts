enum PromiseStatus {
    FULFILLED="FULFILLED",
    PENDING="PENDING",
    REJECTED="REJECTED"
}

/**
 * promise规范
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

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
        const _resolve = (val:any) =>{
            const run = () => {
                if(this.status!=="PENDING") return
                this.status = PromiseStatus["FULFILLED"];
                this.value = val;
                while(this.resolveCbs.length>0){
                    const fn = this.resolveCbs.pop() as Function;
                    fn(val)
                }
            }
            setTimeout(run)
        }

        const _reject = (res:any)=>{
            const run = () => {
                if(this.status!=="PENDING") return;
                this.status = PromiseStatus["REJECTED"];
                this.reason = res;
                while(this.rejectCbs.length>0){
                    const fn = this.rejectCbs.shift() as Function;
                    fn(res)
                }
            }
            setTimeout(run)
        }

        executor(_resolve,_reject)
    }
    

    public then(onFulfillFn?:any,onRejectFn?:any){
        // 按照promise规范，如果两个参数不是函数的话，跳过本次then，让链式继续执行
        // 具体方法就是包装成一个永远返回输入值的箭头函数，不执行任何副作用
        onFulfillFn = typeof onFulfillFn === "function"?onFulfillFn:(v:any)=>v
        onRejectFn = typeof onRejectFn === "function"?onRejectFn:(err:any)=>{throw new Error(err)}
        let self = this
        return new MyPromise((resolve,reject)=>{

            // 在onFulfillFn外面再包装一层逻辑，用于执行then中的resolve回调拿到结果
            // 因为还要考虑resolve本身也返回一个promise，规范中指定，
            // 如果返回一个promise，需要等待它完成并把值传给下一个promise中
            const fulfillCallback = (val:any) => {
                try{
                    const x = onFulfillFn(val);
                    //判断onFulfillFn本身的返回值是不是promise
                    if(x instanceof MyPromise){
                        // 这里是关键
                        // 调用x.then把上层then返回的promise函数中的resolve注册到x中
                        // 那么当x的promise完成时，它会把执行resolve把状态带出来
                        x.then(resolve,reject)
                    }else{
                        //如果不是promise，直接把它的返回设置成下一个promise的value即可
                        resolve(x)
                    }
                }catch(e){
                    // 如果触发异常，就执行下一个promise的reject并设置异常原因reason
                    reject(e)
                }
            }
            // 和上面同理
            const rejectCallback = (err:any) => {
                try{
                    const x = onRejectFn(err);
                    if(x instanceof MyPromise){
                        x.then(resolve,reject)
                    }else{
                        resolve(x)
                    }
                }catch(e){
                    reject(e)
                }
            };

            switch(self.status){
                case "PENDING":
                    //如果注册回调的时候promise还没跑完，那就先推入到回调队列里保持执行顺序
                    self.resolveCbs.push(fulfillCallback);
                    self.rejectCbs.push(rejectCallback);
                    break;
                case "FULFILLED":
                    // 如果注册回调的时候已经改变状态了，那说明错过了promise中你的异步，此时
                    //then自己执行传入的callback即可
                    fulfillCallback(self.value);
                    break;
                case "REJECTED":
                    rejectCallback(self.reason);
                    break;
                default:
            }
        })
    }

    public catch(errFn:any){
        return this.then(undefined,errFn)
    }

    public resolve(val:any){
        if(val instanceof MyPromise) return val;
        return new MyPromise((resolve,reject)=>resolve(val))
    }

    public reject(val:any){
        return new MyPromise((resolve,reject)=>reject(val))
    }

    public all(item:Array<any>|string){
        let index:number = 0;
        let result:Array<any> = [];
        if(typeof item === "string"){
            return this.resolve(item)
        }else{
            return new MyPromise((res,rej)=>{
                const len:number = item.length;
                for(let i=0;i<len;i++){
                    this.resolve(item[i]).then((val:any)=>{
                        index++;
                        result.push(val);
                        if(index === len-1){
                            res(result)
                        }
                    },(err:any)=>{
                        rej(err)
                    })
                }
            })
        }

    }
}