const baseType = [
    "[object String]",
    "[object Number]",
    "[object Boolean]",
    "[object Null]",
    "[object Undefined]",
]
function deepClone(obj:any,cache = new WeakMap()){
    const type:string = Object.prototype.toString.call(obj);
    if(baseType.includes(type)) return obj;
    if(type === "[object Date]") return new Date(obj);
    if(type === "[object RegExp]") return new RegExp(obj);
    if(type === "[object Object]"){
        const cloneObject = Object.create(Object);
        if(cache.has(obj)){
            return cache.get(obj);
        }
        cache.set(obj,cloneObject)
        const keys:string[] = Object.keys(obj);
        const SymbolKeys:symbol[] = Object.getOwnPropertySymbols(obj);
        SymbolKeys.length>0&&SymbolKeys.forEach(symbol=>{
            cloneObject[symbol] = deepClone(obj[symbol],cache)
        });
        const keysNum = keys.length;
        for(let i=0;i<keysNum;i++){
            if(obj.hasOwnProperty(keys[i])){
                cloneObject[keys[i]] = deepClone(obj[keys[i]],cache)
            }
        }
        return cloneObject
    };
    if(type === "[object Array]"){
        const cloneArray:any[] = [];
        if(cache.has(obj)){
            return cache.get(obj);
        }
        cache.set(obj,cloneArray)
        let len:number = obj.length;
        if(len<=0) return cloneArray
        while(len>0){
            cloneArray.unshift(deepClone(obj[len-1],cache));
            len--
        };
        return cloneArray
    }
    return obj
}