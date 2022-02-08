function throttleFn(fn:Function,delay=300){
    let isTrigger:boolean = false;
    return function(this:any,...args:any[]){
        if(isTrigger) return
        isTrigger = true;
        setTimeout(()=>{
            fn.call(this,...args);
            isTrigger = false
        },delay)
    }
}

type batchTaskFn<T> = (items:T[]) => void;

interface BatchTaskQueue<T = any> {
    push(item:T, cb:batchTaskFn<T>):void;
    destory():void
}

class BatchTaskQueueCtreator<T> implements BatchTaskQueue {
    private queue:T[] = [];
    private delay:number = 1500;
    private batchLimit:number = 0;
    private flushQueueFn:null | ((cb:batchTaskFn<T>) => void) = null

    constructor(delay:number, limit = 0) {
        this.delay = delay;
        this.batchLimit = limit;
        this.flushQueueFn = this.flushTaskCreator();
        this.push = this.push.bind(this);
        this.destory = this.destory.bind(this);
    }

    push(item:T, cb:batchTaskFn<T>) {
        this.queue.push(item);
        if (this.flushQueueFn) {
            this.flushQueueFn(cb);
        }
    }
    
    private timeSlice(gen:GeneratorFunction):Function|void{
        if(typeof gen!=="function") throw new Error(`TypeError: the param expect a generator function`)
        const g = gen();
        if(!g||typeof g.next !== "function") return;
        return function next(){
            const start = performance.now();
            let res = null;
            do{
                res = g.next()
            }while(res.done!==true&&performance.now()-start>25);
            if(res.done) return
            setTimeout(next)
        }
    }

    private gen(items:T[], limit:number,cbFn:batchTaskFn<T>){
        return function*() {
            const taskItems = items;
            while(taskItems.length) {
                const slice = [];
                const len = Math.min(limit,taskItems.length);
                for(let i =0;i< len; i++) {
                    const cur = taskItems.shift();
                    if (cur) {
                        slice.push(cur);
                    }
                };
                yield cbFn(slice)
            }
        }
    }

    private flushTaskCreator() {
        return throttleFn((cb:batchTaskFn<T>) => {
            const prsentQueue = this.queue.slice();
            const cbFn = cb.bind(cb);
            if (this.batchLimit === 0) {
                this.queue = [];
                cbFn(prsentQueue);
            } else {
                const timeSlicer = this.timeSlice(this.gen(prsentQueue,this.batchLimit,cbFn))
            }
        }, this.delay);
    }

    destory() {
        this.queue = [];
    }
}