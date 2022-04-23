const INIT_DELAY=1500

type batchTaskFn<T> = (items:T[]) => void;

interface BatchTaskQueue<T = any> {
    push(item:T, cb:batchTaskFn<T>):void;
    destory():void
}

export class BatchTaskQueueCtreator<T> implements BatchTaskQueue {
    private queue:T[] = [];
    private delay:number = INIT_DELAY;
    private batchLimit:number = 0;
    private timer:NodeJS.Timeout|null = null;

    constructor(delay:number, limit = 0) {
        this.delay = delay;
        this.batchLimit = limit;
        this.push = this.push.bind(this);
        this.destory = this.destory.bind(this);
    }

    push(item:T, cb:batchTaskFn<T>) {
        this.queue.push(item);
        this.flushTask(cb);
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

    private flushTask(cb:batchTaskFn<T>){
        if(this.timer!==null) return;
        this.timer = setTimeout(() => {
            const prsentQueue = this.queue.slice();
            this.queue = [];
            const cbFn = cb.bind(cb);
            if (this.batchLimit === 0) {
                cbFn(prsentQueue);
            } else {
                const timeSlicer = this.timeSlice(this.gen(prsentQueue,this.batchLimit,cbFn) as GeneratorFunction)
                if(timeSlicer) {
                    timeSlicer();
                }else {
                    cbFn(prsentQueue); 
                }
            }
            this.timer&&clearTimeout(this.timer);
            this.timer = null
        },this.delay)
    }

    destory() {
        this.queue = [];
        this.timer&&clearTimeout(this.timer);
    }
}
