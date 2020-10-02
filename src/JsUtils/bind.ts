function MyBind(this: any,context:any){
    if(typeof this !== "function"){
        throw new Error(`type error`)
    };
    context = context || window;
    const currentThis = this;
    const args:Array<any> = arguments[1] || []
    return function (){
       return currentThis.apply(context,args.concat(arguments))
    }
}

(Function.prototype as any).MyBind = MyBind