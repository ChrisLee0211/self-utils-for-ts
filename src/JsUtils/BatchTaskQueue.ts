function throttle(fn:Function,delay=300){
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
    private delay:number = 1500
    private flushQueueFn:null | ((cb:batchTaskFn<T>) => void) = null

    constructor(delay:number) {
        this.delay = delay;
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

    private flushTaskCreator() {
        return throttle((cb:batchTaskFn<T>) => {
            const prsentQueue = this.queue.slice();
            const cbFn = cb.bind(cb);
            this.queue = [];
            cbFn(prsentQueue);
        }, this.delay);
    }

    destory() {
        this.queue = [];
    }
}