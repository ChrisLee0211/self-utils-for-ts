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