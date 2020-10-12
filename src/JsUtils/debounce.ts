
function debounce(fn:Function,delay=300){
    let timer:number|null = null;
    return function(this:any,...args:any[]){
            timer && clearTimeout(timer);
            timer = setTimeout(()=>{
                fn.call(this,...args)
            },delay)
    }
}