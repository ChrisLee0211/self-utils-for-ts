function MyApply(this: any,context:any){
    if(typeof this !== "function"){
        throw new Error(`type error`)
    };
    context = context || window;
    context.fn = this;
    let args = arguments[1] || [];
    let result = context.fn(...args);
    delete context.fn;
    return result
}
(
Function.prototype as any).MyApply = MyApply