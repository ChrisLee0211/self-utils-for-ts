function myCall(this: any,context:any){
    if(typeof this !== "function"){
        throw new Error(`type error`)
    }
    context = context || window;
    context.fn = this;
    const args = Array.from(arguments).slice(1);
    const result =  context.fn(...args);
    delete context.fn;
    return result
}

(Function.prototype as any).MyCall = myCall
