function compose(fnArray:Function[]){
    let i = 0;
    let len = fnArray.length;
    if(len<0) return
    if(len<=1) return fnArray[0]
    return function(...args:any[]){
        let result = fnArray[i](...args);
        i++;
        while(i<len){
            result = fnArray[i](result);
            i++
        };
        return result
    }
}